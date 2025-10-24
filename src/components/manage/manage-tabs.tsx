"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostManagement } from "@/components/manage/post-management";
import { DMManagement } from "@/components/manage/dm-management";
import { useTranslations } from "next-intl";

export function ManageTabs() {
  const t = useTranslations("dashboard.manageTabs");

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList>
        <TabsTrigger value="posts">{t("tabs.posts")}</TabsTrigger>
        <TabsTrigger value="dm">{t("tabs.dm")}</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-6">
        <PostManagement />
      </TabsContent>

      <TabsContent value="dm" className="mt-6">
        <DMManagement />
      </TabsContent>
    </Tabs>
  );
}
