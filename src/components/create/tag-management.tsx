"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, Download, Upload } from "lucide-react"

interface Tag {
  id: string
  name: string
  color: string
  count: number
}

const mockTags: Tag[] = [
  { id: "1", name: "마케팅", color: "bg-blue-500", count: 24 },
  { id: "2", name: "프로모션", color: "bg-green-500", count: 18 },
  { id: "3", name: "이벤트", color: "bg-purple-500", count: 15 },
  { id: "4", name: "공지", color: "bg-yellow-500", count: 12 },
  { id: "5", name: "신제품", color: "bg-red-500", count: 9 },
  { id: "6", name: "할인", color: "bg-pink-500", count: 7 },
]

export function TagManagement() {
  const [tags, setTags] = useState<Tag[]>(mockTags)
  const [newTagName, setNewTagName] = useState("")

  const addTag = () => {
    if (newTagName.trim()) {
      const newTag: Tag = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        color: "bg-gray-500",
        count: 0,
      }
      setTags([...tags, newTag])
      setNewTagName("")
    }
  }

  const removeTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">태그 관리</h2>
          <p className="text-muted-foreground mt-1">게시물을 분류하고 관리하기 위한 태그를 생성하세요</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            가져오기
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>새 태그 추가</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="tag-name">태그 이름</Label>
              <Input
                id="tag-name"
                placeholder="태그 이름 입력..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addTag}>
                <Plus className="h-4 w-4 mr-2" />
                추가
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>태그 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                  <div>
                    <p className="font-medium">{tag.name}</p>
                    <p className="text-xs text-muted-foreground">{tag.count}개 게시물</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeTag(tag.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
