"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, Clock } from "lucide-react"

interface DeployRecord {
  id: string
  platform: string
  content: string
  deployedAt: string
  deployedBy: string
  status: "success" | "failed" | "pending"
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

const mockHistory: DeployRecord[] = [
  {
    id: "1",
    platform: "instagram",
    content: "고객님들의 사랑에 감사드립니다 ❤️",
    deployedAt: "2025-01-23 14:00",
    deployedBy: "김마케터",
    status: "success",
    engagement: { likes: 245, comments: 18, shares: 12 },
  },
  {
    id: "2",
    platform: "facebook",
    content: "주말 특별 할인 이벤트",
    deployedAt: "2025-01-23 10:00",
    deployedBy: "이매니저",
    status: "success",
    engagement: { likes: 189, comments: 24, shares: 8 },
  },
  {
    id: "3",
    platform: "linkedin",
    content: "회사 소식 업데이트",
    deployedAt: "2025-01-22 16:00",
    deployedBy: "박대리",
    status: "failed",
  },
  {
    id: "4",
    platform: "threads",
    content: "오늘의 팁 공유",
    deployedAt: "2025-01-22 12:00",
    deployedBy: "김마케터",
    status: "success",
    engagement: { likes: 89, comments: 7, shares: 5 },
  },
  {
    id: "5",
    platform: "youtube",
    content: "새로운 튜토리얼 영상",
    deployedAt: "2025-01-21 18:00",
    deployedBy: "최PD",
    status: "pending",
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

const statusConfig = {
  success: { label: "성공", icon: CheckCircle, color: "text-green-500" },
  failed: { label: "실패", icon: XCircle, color: "text-red-500" },
  pending: { label: "처리 중", icon: Clock, color: "text-yellow-500" },
}

export function DeployHistory() {
  const [history, setHistory] = useState<DeployRecord[]>(mockHistory)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHistory = history.filter(
    (record) =>
      record.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.platform.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">총 {history.length}개의 배포 기록</p>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="검색..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredHistory.map((record) => {
          const StatusIcon = statusConfig[record.status].icon
          return (
            <Card key={record.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl">{platformIcons[record.platform]}</span>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${statusConfig[record.status].color}`} />
                        <Badge variant={record.status === "success" ? "default" : "secondary"}>
                          {statusConfig[record.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm leading-relaxed">{record.content}</p>
                      {record.engagement && (
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>좋아요 {record.engagement.likes}</span>
                          <span>댓글 {record.engagement.comments}</span>
                          <span>공유 {record.engagement.shares}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground space-y-1">
                    <p>{record.deployedAt}</p>
                    <p>{record.deployedBy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
