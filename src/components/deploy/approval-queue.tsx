"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Clock, Eye } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface Post {
  id: string
  platform: string
  content: string
  image: string | null
  createdBy: string
  createdAt: string
  version: string
  tags: string[]
}

const mockPosts: Post[] = [
  {
    id: "1",
    platform: "instagram",
    content: "새로운 제품 라인업을 소개합니다! 🎉 이번 시즌 최고의 선택",
    image: "/placeholder.svg?height=400&width=400",
    createdBy: "김마케터",
    createdAt: "2025-01-23 14:30",
    version: "v2.0",
    tags: ["신제품", "마케팅"],
  },
  {
    id: "2",
    platform: "facebook",
    content: "특별 할인 이벤트! 지금 바로 확인하세요",
    image: "/placeholder.svg?height=400&width=400",
    createdBy: "이매니저",
    createdAt: "2025-01-23 13:15",
    version: "v2.0",
    tags: ["프로모션", "이벤트"],
  },
  {
    id: "3",
    platform: "linkedin",
    content: "우리 회사의 최신 성과와 비전을 공유합니다",
    image: null,
    createdBy: "박대리",
    createdAt: "2025-01-23 11:00",
    version: "v1.5",
    tags: ["공지"],
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

export function ApprovalQueue() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [scheduleDate, setScheduleDate] = useState<Date>()
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const handleApprove = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId))
    setSelectedPost(null)
  }

  const handleSchedule = () => {
    if (selectedPost && scheduleDate) {
      setPosts(posts.filter((p) => p.id !== selectedPost.id))
      setShowScheduleDialog(false)
      setSelectedPost(null)
    }
  }

  const handleReject = () => {
    if (selectedPost) {
      setPosts(posts.filter((p) => p.id !== selectedPost.id))
      setShowRejectDialog(false)
      setSelectedPost(null)
      setRejectReason("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">승인 대기 중인 게시물 {posts.length}개</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{platformIcons[post.platform]}</span>
                <Badge variant="secondary">{post.version}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedPost(post)}>
                <Eye className="h-4 w-4" />
              </Button>
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

              <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                <span>작성자: {post.createdBy}</span>
                <span>{post.createdAt}</span>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 border-t border-border pt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedPost(post)
                  setShowRejectDialog(true)
                }}
              >
                <X className="h-4 w-4 mr-1" />
                거부
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedPost(post)
                  setShowScheduleDialog(true)
                }}
              >
                <Clock className="h-4 w-4 mr-1" />
                예약
              </Button>
              <Button size="sm" className="flex-1" onClick={() => handleApprove(post.id)}>
                <Check className="h-4 w-4 mr-1" />
                즉시 승인
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 예약</DialogTitle>
            <DialogDescription>게시물을 배포할 날짜와 시간을 선택하세요</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>배포 날짜</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <Clock className="mr-2 h-4 w-4" />
                    {scheduleDate ? format(scheduleDate, "PPP", { locale: ko }) : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={scheduleDate} onSelect={setScheduleDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              취소
            </Button>
            <Button onClick={handleSchedule} disabled={!scheduleDate}>
              예약하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 거부</DialogTitle>
            <DialogDescription>거부 사유를 입력하세요</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="거부 사유를 입력하세요..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              거부하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
