"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, Play } from "lucide-react"
import Image from "next/image"

interface ScheduledPost {
  id: string
  platform: string
  content: string
  image: string | null
  scheduledDate: string
  scheduledTime: string
  status: "pending" | "processing"
  tags: string[]
}

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    platform: "instagram",
    content: "주말 특별 이벤트 안내 🎉",
    image: "/placeholder.svg?height=400&width=400",
    scheduledDate: "2025-01-25",
    scheduledTime: "14:00",
    status: "pending",
    tags: ["이벤트"],
  },
  {
    id: "2",
    platform: "facebook",
    content: "신제품 출시 예고편",
    image: "/placeholder.svg?height=400&width=400",
    scheduledDate: "2025-01-26",
    scheduledTime: "10:00",
    status: "pending",
    tags: ["신제품", "마케팅"],
  },
  {
    id: "3",
    platform: "linkedin",
    content: "월간 업데이트 소식",
    image: null,
    scheduledDate: "2025-01-27",
    scheduledTime: "09:00",
    status: "pending",
    tags: ["공지"],
  },
  {
    id: "4",
    platform: "threads",
    content: "고객 감사 메시지",
    image: null,
    scheduledDate: "2025-01-24",
    scheduledTime: "16:00",
    status: "processing",
    tags: ["감사"],
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

export function ScheduledPosts() {
  const [posts, setPosts] = useState<ScheduledPost[]>(mockScheduledPosts)

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId))
  }

  const handlePublishNow = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">예약된 게시물 {posts.length}개</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{platformIcons[post.platform]}</span>
                <Badge variant={post.status === "processing" ? "default" : "secondary"}>
                  {post.status === "processing" ? "처리 중" : "대기 중"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {post.image && (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                  <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                </div>
              )}

              <p className="text-sm leading-relaxed line-clamp-3">{post.content}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-primary pt-2 border-t border-border">
                <Calendar className="h-4 w-4" />
                <span>
                  {post.scheduledDate} {post.scheduledTime}
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 border-t border-border pt-4">
              <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Edit className="h-4 w-4 mr-1" />
                수정
              </Button>
              <Button size="sm" className="flex-1" onClick={() => handlePublishNow(post.id)}>
                <Play className="h-4 w-4 mr-1" />
                즉시 배포
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
