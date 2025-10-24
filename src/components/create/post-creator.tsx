"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, Sparkles, FileSpreadsheet, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const platforms = [
  { id: "instagram", name: "Instagram", icon: "📷" },
  { id: "facebook", name: "Facebook", icon: "👥" },
  { id: "threads", name: "Threads", icon: "🧵" },
  { id: "linkedin", name: "LinkedIn", icon: "💼" },
  { id: "tiktok", name: "TikTok", icon: "🎵" },
  { id: "youtube", name: "YouTube", icon: "▶️" },
]

export function PostCreator() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Editor */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>게시물 작성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>플랫폼 선택</Label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <span className="mr-2">{platform.icon}</span>
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                placeholder="게시물 내용을 입력하세요..."
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{content.length} 자</span>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI 피드백
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>이미지/비디오</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">클릭하거나 파일을 드래그하여 업로드</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag-input">태그</Label>
              <div className="flex gap-2">
                <Input
                  id="tag-input"
                  placeholder="태그 입력..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag}>추가</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">초안 저장</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                미리보기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              엑셀 일괄 업로드
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">엑셀 파일을 업로드하여 여러 게시물을 한번에 생성하세요</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                템플릿 다운로드
              </Button>
              <Button className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                파일 업로드
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>버전 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="버전 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v1">버전 1.0</SelectItem>
                <SelectItem value="v2">버전 2.0</SelectItem>
                <SelectItem value="v3">버전 3.0</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full bg-transparent">
              새 버전 생성
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>빠른 태그</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                마케팅
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                프로모션
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                이벤트
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                공지
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                신제품
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 이미지</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-muted rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
