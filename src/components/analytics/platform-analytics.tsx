"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, Users, Heart, MessageCircle, Eye } from "lucide-react";
import {
  Line,
  LineChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Image from "next/image";
import { useTranslations } from "next-intl";

// 플랫폼별 더미 데이터
const platformData: Record<string, any> = {
  instagram: {
    name: "Instagram",
    followers: "12.5K",
    posts: 45,
    avgEngagement: 8.5,
    growthData: [
      { date: "01/15", followers: 11200, engagement: 850 },
      { date: "01/16", followers: 11450, engagement: 920 },
      { date: "01/17", followers: 11680, engagement: 880 },
      { date: "01/18", followers: 11920, engagement: 1050 },
      { date: "01/19", followers: 12150, engagement: 980 },
      { date: "01/20", followers: 12380, engagement: 1120 },
      { date: "01/21", followers: 12500, engagement: 1080 },
    ],
    topPosts: [
      {
        id: "1",
        content: "신제품 출시 🎉",
        image: "/team-success.jpg",
        likes: 2450,
        comments: 189,
        engagement: 12.5,
      },
      {
        id: "2",
        content: "주말 이벤트",
        image: "/team-success.jpg",
        likes: 1890,
        comments: 156,
        engagement: 10.8,
      },
    ],
  },
  facebook: {
    name: "Facebook",
    followers: "8.2K",
    posts: 38,
    avgEngagement: 6.2,
    growthData: [
      { date: "01/15", followers: 7800, engagement: 620 },
      { date: "01/16", followers: 7920, engagement: 680 },
      { date: "01/17", followers: 7980, engagement: 650 },
      { date: "01/18", followers: 8050, engagement: 720 },
      { date: "01/19", followers: 8120, engagement: 690 },
      { date: "01/20", followers: 8180, engagement: 750 },
      { date: "01/21", followers: 8200, engagement: 710 },
    ],
    topPosts: [
      {
        id: "1",
        content: "고객 감사 이벤트",
        image: "/team-success.jpg",
        likes: 1560,
        comments: 124,
        engagement: 9.7,
      },
    ],
  },
  youtube: {
    name: "YouTube",
    followers: "15.3K",
    posts: 32,
    avgEngagement: 7.8,
    growthData: [
      { date: "01/15", followers: 14500, engagement: 1120 },
      { date: "01/16", followers: 14680, engagement: 1180 },
      { date: "01/17", followers: 14820, engagement: 1150 },
      { date: "01/18", followers: 14980, engagement: 1250 },
      { date: "01/19", followers: 15120, engagement: 1200 },
      { date: "01/20", followers: 15250, engagement: 1320 },
      { date: "01/21", followers: 15300, engagement: 1280 },
    ],
    topPosts: [
      {
        id: "1",
        content: "제품 리뷰 영상",
        image: "/team-success.jpg",
        likes: 3200,
        comments: 245,
        engagement: 14.2,
      },
    ],
  },
};

interface PlatformAnalyticsProps {
  platform: string;
}

export function PlatformAnalytics({ platform }: PlatformAnalyticsProps) {
  const t = useTranslations("dashboard.platformAnalytics");
  const platformKey = platform.toLowerCase();
  const data = platformData[platformKey];

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">{t("noData")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* 기간 선택 */}
      <div className="flex justify-end items-center">
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("period.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">{t("period.7days")}</SelectItem>
            <SelectItem value="30days">{t("period.30days")}</SelectItem>
            <SelectItem value="90days">{t("period.90days")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t("metrics.followers")}
          value={data.followers}
          trend="+8.2%"
          compare={t("compare.lastWeek")}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title={t("metrics.posts")}
          value={data.posts}
          compare={t("compare.thisMonth")}
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title={t("metrics.avgEngagement")}
          value={`${data.avgEngagement}%`}
          trend="+2.1%"
          compare={t("compare.lastWeek")}
          icon={<Heart className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title={t("metrics.reach")}
          value="24.5K"
          trend="+15.3%"
          compare={t("compare.lastWeek")}
        />
      </div>

      {/* 성장 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title={t("charts.followersGrowth")}
          data={data.growthData}
          dataKey="followers"
          color="hsl(var(--chart-1))"
          label={t("metrics.followers")}
        />
        <ChartCard
          title={t("charts.engagementTrend")}
          data={data.growthData}
          dataKey="engagement"
          color="hsl(var(--chart-2))"
          label={t("metrics.engagement")}
          line
        />
      </div>

      {/* 인기 게시물 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("charts.topPosts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topPosts.map((post: any, index: number) => (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Post"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.content}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" /> {post.comments}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{post.engagement}%</div>
                  <div className="text-xs text-muted-foreground">{t("metrics.engagementRate")}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 하위 카드 컴포넌트 (반복 제거)
function MetricCard({ title, value, trend, compare, icon }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend ? (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">{trend}</span> {compare}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground mt-1">{compare}</p>
        )}
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, data, dataKey, color, label, line = false }: any) {
  const Chart = line ? LineChart : AreaChart;
  const DataElement = line ? (
    <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
  ) : (
    <Area
      type="monotone"
      dataKey={dataKey}
      stroke={color}
      fill={color}
      fillOpacity={0.2}
      strokeWidth={2}
    />
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ [dataKey]: { label, color } }} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Chart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {DataElement}
            </Chart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
