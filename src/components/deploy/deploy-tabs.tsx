"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApprovalQueue } from "@/components/deploy/approval-queue"
import { ScheduledPosts } from "@/components/deploy/scheduled-posts"
import { DeployHistory } from "@/components/deploy/deploy-history"

export function DeployTabs() {
  return (
    <Tabs defaultValue="approval" className="w-full">
      <TabsList>
        <TabsTrigger value="approval">승인 대기</TabsTrigger>
        <TabsTrigger value="scheduled">예약됨</TabsTrigger>
        <TabsTrigger value="history">배포 내역</TabsTrigger>
      </TabsList>

      <TabsContent value="approval" className="mt-6">
        <ApprovalQueue />
      </TabsContent>

      <TabsContent value="scheduled" className="mt-6">
        <ScheduledPosts />
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <DeployHistory />
      </TabsContent>
    </Tabs>
  )
}
