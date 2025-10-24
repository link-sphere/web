"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VersionManagement } from "@/components/create/version-management"
import { TagManagement } from "@/components/create/tag-management"
import { ImageManagement } from "@/components/create/image-management"
import { PostCreator } from "@/components/create/post-creator"

export function CreateTabs() {
  return (
    <Tabs defaultValue="post" className="w-full">
      <TabsList>
        <TabsTrigger value="post">게시물 생성</TabsTrigger>
        <TabsTrigger value="version">버전 관리</TabsTrigger>
        <TabsTrigger value="tag">태그 관리</TabsTrigger>
        <TabsTrigger value="image">이미지/템플릿</TabsTrigger>
      </TabsList>

      <TabsContent value="post" className="mt-6">
        <PostCreator />
      </TabsContent>

      <TabsContent value="version" className="mt-6">
        <VersionManagement />
      </TabsContent>

      <TabsContent value="tag" className="mt-6">
        <TagManagement />
      </TabsContent>

      <TabsContent value="image" className="mt-6">
        <ImageManagement />
      </TabsContent>
    </Tabs>
  )
}
