"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Search, Folder, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageItem {
  id: string
  url: string
  name: string
  size: string
  uploadedAt: string
  folder: string
}

const mockImages: ImageItem[] = [
  {
    id: "1",
    url: "/placeholder.svg?height=200&width=200",
    name: "product-1.jpg",
    size: "2.4 MB",
    uploadedAt: "2025-01-23",
    folder: "products",
  },
  {
    id: "2",
    url: "/placeholder.svg?height=200&width=200",
    name: "banner-1.jpg",
    size: "1.8 MB",
    uploadedAt: "2025-01-22",
    folder: "banners",
  },
  {
    id: "3",
    url: "/placeholder.svg?height=200&width=200",
    name: "event-1.jpg",
    size: "3.1 MB",
    uploadedAt: "2025-01-21",
    folder: "events",
  },
  {
    id: "4",
    url: "/placeholder.svg?height=200&width=200",
    name: "promo-1.jpg",
    size: "2.7 MB",
    uploadedAt: "2025-01-20",
    folder: "promotions",
  },
]

const folders = ["전체", "products", "banners", "events", "promotions"]

export function ImageManagement() {
  const [images, setImages] = useState<ImageItem[]>(mockImages)
  const [selectedFolder, setSelectedFolder] = useState("전체")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredImages = images.filter((img) => {
    const matchesFolder = selectedFolder === "전체" || img.folder === selectedFolder
    const matchesSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">이미지 & 템플릿 관리</h2>
          <p className="text-muted-foreground mt-1">게시물에 사용할 이미지와 템플릿을 관리하세요</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          이미지 업로드
        </Button>
      </div>

      <Tabs defaultValue="images" className="w-full">
        <TabsList>
          <TabsTrigger value="images">이미지</TabsTrigger>
          <TabsTrigger value="templates">템플릿</TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="mt-6 space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="이미지 검색..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {folders.map((folder) => (
                <Button
                  key={folder}
                  variant={selectedFolder === folder ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFolder(folder)}
                >
                  <Folder className="h-3 w-3 mr-1" />
                  {folder}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative aspect-square bg-muted">
                  <Image src={image.url || "/placeholder.svg"} alt={image.name} fill className="object-cover" />
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{image.name}</p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{image.size}</span>
                    <span>{image.uploadedAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative aspect-video bg-muted flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">템플릿 {i}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Instagram 스토리 템플릿</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
