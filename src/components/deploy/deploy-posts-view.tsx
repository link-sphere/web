"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/dashboard/post-card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePlatform } from "@/components/dashboard/dashboard-layout";
import { CreateIdeaDialog } from "@/components/create/create-idea-dialog";
import { useTranslations } from "next-intl";

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    platform: "instagram",
    status: "deployed" as const,
    content: "새로운 제품 출시! 지금 바로 확인하세요 🎉",
    image: "/product-launch-excitement.png",
    scheduledDate: "2024-04-15 14:00",
    likes: 1250,
    comments: 89,
    shares: 45,
  },
  {
    id: "2",
    platform: "facebook",
    status: "scheduled" as const,
    content: "이번 주말 특별 세일 이벤트! 최대 50% 할인",
    image: "/sale-event.jpg",
    scheduledDate: "2024-04-20 10:00",
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: "3",
    platform: "linkedin",
    status: "approved" as const,
    content: "우리 팀의 성공 스토리를 공유합니다. 함께 성장하는 문화를 만들어가고 있습니다.",
    image: "/team-success.jpg",
    scheduledDate: null,
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: "4",
    platform: "instagram",
    status: "draft" as const,
    content: "곧 공개될 새로운 컬렉션을 준비 중입니다...",
    image: null,
    scheduledDate: null,
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: "5",
    platform: "tiktok",
    status: "deployed" as const,
    content: "트렌디한 챌린지에 참여했어요! #challenge #trending",
    image: "/product-launch-excitement.png",
    scheduledDate: "2024-04-10 18:00",
    likes: 3420,
    comments: 234,
    shares: 156,
  },
  {
    id: "6",
    platform: "youtube",
    status: "scheduled" as const,
    content: "신제품 언박싱 영상이 곧 공개됩니다!",
    image: "/sale-event.jpg",
    scheduledDate: "2024-04-22 16:00",
    likes: 0,
    comments: 0,
    shares: 0,
  },
];

export function DeployPostsView() {
  const t = useTranslations("dashboard.deployPostsView");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { selectedPlatform } = usePlatform();

  const filteredPosts =
    selectedPlatform === "all"
      ? mockPosts
      : mockPosts.filter((post) => post.platform === selectedPlatform);

  const platformNames: Record<string, string> = {
    all: t("platforms.all"),
    instagram: t("platforms.instagram"),
    facebook: t("platforms.facebook"),
    linkedin: t("platforms.linkedin"),
    tiktok: t("platforms.tiktok"),
    youtube: t("platforms.youtube"),
  };

  const pageTitle = platformNames[selectedPlatform] || t("platforms.all");

  const handleCreatePost = (post: { title: string; content: string; image: string | null }) => {
    console.log("새 게시물 생성:", post);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 상단 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">{t("subtitle")}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setIsCreateDialogOpen(true)} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t("createPost")}</span>
          </Button>
        </div>
      </div>

      {/* 탭 */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all" className="whitespace-nowrap">
            {t("tabs.all")}
          </TabsTrigger>
          <TabsTrigger value="draft" className="whitespace-nowrap">
            {t("tabs.draft")}
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="whitespace-nowrap">
            {t("tabs.scheduled")}
          </TabsTrigger>
          <TabsTrigger value="approved" className="whitespace-nowrap">
            {t("tabs.approved")}
          </TabsTrigger>
          <TabsTrigger value="deployed" className="whitespace-nowrap">
            {t("tabs.deployed")}
          </TabsTrigger>
        </TabsList>

        {/* 탭 콘텐츠 */}
        {["all", "draft", "scheduled", "approved", "deployed"].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPosts
                .filter((post) => status === "all" || post.status === status)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* 게시물 생성 다이얼로그 */}
      <CreateIdeaDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}
