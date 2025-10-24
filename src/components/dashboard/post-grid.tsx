"use client";

import { PostCard } from "@/components/dashboard/post-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

const mockPosts = [
  {
    id: "1",
    platform: "instagram",
    status: "draft" as const,
    content: "새로운 제품 출시 예정! 곧 만나요 🎉",
    image: "/product-launch-excitement.png",
    scheduledDate: null,
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: "2",
    platform: "facebook",
    status: "scheduled" as const,
    content: "이번 주 특별 할인 이벤트를 놓치지 마세요!",
    image: "/sale-event.jpg",
    scheduledDate: "2025-01-25 14:00",
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: "3",
    platform: "linkedin",
    status: "approved" as const,
    content: "우리 팀의 최신 성과를 공유합니다.",
    image: "/team-success.jpg",
    scheduledDate: "2025-01-24 10:00",
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: "4",
    platform: "instagram",
    status: "deployed" as const,
    content: "고객님들의 사랑에 감사드립니다 ❤️",
    image: "/thank-you-customers.jpg",
    scheduledDate: null,
    likes: 245,
    comments: 18,
    shares: 12,
  },
  {
    id: "5",
    platform: "threads",
    status: "deployed" as const,
    content: "오늘의 팁: 소셜 미디어 관리를 더 효율적으로!",
    image: null,
    scheduledDate: null,
    likes: 89,
    comments: 7,
    shares: 5,
  },
  {
    id: "6",
    platform: "youtube",
    status: "draft" as const,
    content: "새로운 튜토리얼 영상 준비 중입니다",
    image: "/video-tutorial-concept.png",
    scheduledDate: null,
    likes: 0,
    comments: 0,
    shares: 0,
  },
];

export function PostGrid() {
  const t = useTranslations("dashboard.postGrid");

  const statuses = ["all", "draft", "scheduled", "approved", "deployed"] as const;

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="overflow-x-auto">
        {statuses.map((status) => (
          <TabsTrigger key={status} value={status} className="whitespace-nowrap">
            {t(`tabs.${status}`)}
          </TabsTrigger>
        ))}
      </TabsList>

      {statuses.map((status) => (
        <TabsContent key={status} value={status} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts
              .filter((post) => status === "all" || post.status === status)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
