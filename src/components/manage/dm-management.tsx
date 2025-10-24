"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Send, Archive, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlatform } from "@/components/dashboard/dashboard-layout";
import { useTranslations } from "next-intl";

interface DM {
  id: string;
  platform: string;
  sender: string;
  senderAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isStarred: boolean;
  messages: Message[];
}

interface Message {
  id: string;
  sender: "user" | "me";
  content: string;
  timestamp: string;
}

const mockDMs: DM[] = [
  {
    id: "1",
    platform: "instagram",
    sender: "김고객",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "제품 문의드립니다",
    timestamp: "10분 전",
    unread: true,
    isStarred: false,
    messages: [
      { id: "1", sender: "user", content: "안녕하세요, 제품 문의드립니다", timestamp: "10분 전" },
      { id: "2", sender: "user", content: "재고가 있나요?", timestamp: "9분 전" },
    ],
  },
  {
    id: "2",
    platform: "facebook",
    sender: "이유저",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "배송 관련 문의",
    timestamp: "1시간 전",
    unread: true,
    isStarred: true,
    messages: [
      { id: "1", sender: "user", content: "배송은 언제 되나요?", timestamp: "1시간 전" },
      { id: "2", sender: "me", content: "확인 후 답변드리겠습니다", timestamp: "50분 전" },
      { id: "3", sender: "user", content: "감사합니다", timestamp: "45분 전" },
    ],
  },
];

const platformIcons: Record<string, string> = {
  instagram: "📷",
  facebook: "👥",
  threads: "🧵",
  linkedin: "💼",
  tiktok: "🎵",
  youtube: "▶️",
};

export function DMManagement() {
  const t = useTranslations("dashboard.dmManagement");
  const [dms, setDMs] = useState<DM[]>(mockDMs);
  const [selectedDM, setSelectedDM] = useState<DM | null>(dms[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  const { selectedPlatform } = usePlatform();

  const filteredDMs = dms.filter((dm) => {
    const matchesSearch = dm.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === "all" || dm.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const handleSendReply = () => {
    if (selectedDM && replyText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "me",
        content: replyText,
        timestamp: t("timestamp.justNow"),
      };
      setDMs(
        dms.map((dm) =>
          dm.id === selectedDM.id
            ? {
                ...dm,
                messages: [...dm.messages, newMessage],
                lastMessage: replyText,
                unread: false,
              }
            : dm
        )
      );
      setReplyText("");
    }
  };

  const handleToggleStar = (dmId: string) => {
    setDMs(dms.map((dm) => (dm.id === dmId ? { ...dm, isStarred: !dm.isStarred } : dm)));
  };

  const handleArchive = (dmId: string) => {
    setDMs(dms.filter((dm) => dm.id !== dmId));
    if (selectedDM?.id === dmId) setSelectedDM(dms[0] || null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* DM List */}
      <Card className="lg:col-span-1">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Badge variant="destructive" className="flex-1 justify-center">
              {t("badges.unread", { count: dms.filter((dm) => dm.unread).length })}
            </Badge>
            <Badge variant="secondary" className="flex-1 justify-center">
              {t("badges.starred", { count: dms.filter((dm) => dm.isStarred).length })}
            </Badge>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {filteredDMs.map((dm) => (
                <div
                  key={dm.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedDM?.id === dm.id ? "bg-secondary" : "hover:bg-secondary/50"
                  } ${dm.unread ? "border-l-4 border-primary" : ""}`}
                  onClick={() => setSelectedDM(dm)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={dm.senderAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{dm.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">{dm.sender}</span>
                          <span className="text-base">{platformIcons[dm.platform]}</span>
                        </div>
                        {dm.isStarred && (
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{dm.lastMessage}</p>
                      <span className="text-xs text-muted-foreground">{dm.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Conversation */}
      <Card className="lg:col-span-2">
        {selectedDM ? (
          <CardContent className="p-0 flex flex-col h-[600px]">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedDM.senderAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedDM.sender[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedDM.sender}</span>
                    <span className="text-lg">{platformIcons[selectedDM.platform]}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{selectedDM.timestamp}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleToggleStar(selectedDM.id)}>
                  <Star
                    className={`h-4 w-4 ${
                      selectedDM.isStarred ? "fill-yellow-500 text-yellow-500" : ""
                    }`}
                  />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleArchive(selectedDM.id)}>
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedDM.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Reply Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Textarea
                  placeholder={t("inputPlaceholder")}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[60px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                />
                <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent className="p-8 flex items-center justify-center h-[600px]">
            <p className="text-muted-foreground">{t("emptyState")}</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
