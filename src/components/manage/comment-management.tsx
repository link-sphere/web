"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Reply, Trash2, Flag, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePlatform } from "@/components/dashboard/dashboard-layout";

interface Comment {
  id: string
  postId: string
  platform: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
  likes: number
  isReplied: boolean
  needsAttention: boolean
}

const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    platform: "instagram",
    author: "김고객",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "정말 좋은 제품이네요! 언제 구매할 수 있나요?",
    timestamp: "2시간 전",
    likes: 5,
    isReplied: false,
    needsAttention: true,
  },
  {
    id: "2",
    postId: "1",
    platform: "instagram",
    author: "이유저",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "가격 정보 알려주세요",
    timestamp: "3시간 전",
    likes: 2,
    isReplied: true,
    needsAttention: false,
  },
  {
    id: "3",
    postId: "2",
    platform: "facebook",
    author: "박회원",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "할인 코드가 작동하지 않아요",
    timestamp: "5시간 전",
    likes: 8,
    isReplied: false,
    needsAttention: true,
  },
  {
    id: "4",
    postId: "3",
    platform: "threads",
    author: "최팔로워",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "유용한 정보 감사합니다!",
    timestamp: "1일 전",
    likes: 12,
    isReplied: true,
    needsAttention: false,
  },
]

const platformIcons: Record<string, string> = {
  instagram: "📷",
  facebook: "👥",
  threads: "🧵",
  linkedin: "💼",
  tiktok: "🎵",
  youtube: "▶️",
}

export function CommentManagement() {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [searchQuery, setSearchQuery] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const { selectedPlatform } = usePlatform()

  const filteredComments = comments.filter((comment) => {
    const matchesSearch = comment.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = selectedPlatform === "all" || comment.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  const handleReply = (commentId: string) => {
    setComments(comments.map((c) => (c.id === commentId ? { ...c, isReplied: true, needsAttention: false } : c)))
    setReplyingTo(null)
    setReplyText("")
  }

  const handleDelete = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="댓글 검색..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="h-9 px-4 flex items-center">
            주의 필요 {comments.filter((c) => c.needsAttention).length}
          </Badge>
          <Badge variant="secondary" className="h-9 px-4 flex items-center">
            답변 완료 {comments.filter((c) => c.isReplied).length}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <Card key={comment.id} className={comment.needsAttention ? "border-red-500" : ""}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-xl">{platformIcons[comment.platform]}</span>
                      {comment.needsAttention && <Badge variant="destructive">주의 필요</Badge>}
                      {comment.isReplied && <Badge variant="secondary">답변 완료</Badge>}
                    </div>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>

                  <p className="text-sm leading-relaxed">{comment.content}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{comment.likes}</span>
                    </div>
                  </div>

                  {replyingTo === comment.id ? (
                    <div className="space-y-2 pt-2">
                      <Textarea
                        placeholder="답글 작성..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleReply(comment.id)}>
                          답글 보내기
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                          취소
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setReplyingTo(comment.id)}
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        답글
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Flag className="h-3 w-3 mr-1" />
                        신고
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(comment.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
