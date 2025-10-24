"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Copy, Trash2, Edit } from "lucide-react"

interface Version {
  id: string
  name: string
  description: string
  createdAt: string
  postCount: number
  status: "active" | "archived"
}

const mockVersions: Version[] = [
  {
    id: "1",
    name: "버전 1.0",
    description: "초기 버전",
    createdAt: "2025-01-15",
    postCount: 12,
    status: "active",
  },
  {
    id: "2",
    name: "버전 2.0",
    description: "봄 시즌 캠페인",
    createdAt: "2025-01-20",
    postCount: 8,
    status: "active",
  },
  {
    id: "3",
    name: "버전 1.5",
    description: "테스트 버전",
    createdAt: "2025-01-10",
    postCount: 5,
    status: "archived",
  },
]

export function VersionManagement() {
  const [versions, setVersions] = useState<Version[]>(mockVersions)
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">버전 관리</h2>
          <p className="text-muted-foreground mt-1">게시물 버전을 생성하고 관리하세요</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />새 버전 생성
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>새 버전 생성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="version-name">버전 이름</Label>
              <Input id="version-name" placeholder="예: 버전 3.0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version-desc">설명</Label>
              <Input id="version-desc" placeholder="버전 설명을 입력하세요" />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">생성</Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsCreating(false)}>
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {versions.map((version) => (
          <Card key={version.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{version.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{version.description}</p>
                </div>
                <Badge variant={version.status === "active" ? "default" : "secondary"}>
                  {version.status === "active" ? "활성" : "보관됨"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">게시물 수</span>
                <span className="font-medium">{version.postCount}개</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">생성일</span>
                <span className="font-medium">{version.createdAt}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="h-3 w-3 mr-1" />
                  수정
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Copy className="h-3 w-3 mr-1" />
                  복제
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
