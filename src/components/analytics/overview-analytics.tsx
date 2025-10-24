"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Instagram, Youtube, Music2, Linkedin } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function OverviewAnalytics() {
  const t = useTranslations("dashboard.overviewAnalytics");

  const platformStats = [
    {
      name: "Instagram",
      icon: Instagram,
      iconColor: "text-pink-500",
      subtitle: t("platform.instagram.subtitle"),
      metrics: [
        { label: t("metrics.likes"), value: "8250" },
        { label: t("metrics.comments"), value: "5660" },
      ],
    },
    {
      name: "YouTube",
      icon: Youtube,
      iconColor: "text-red-500",
      subtitle: t("platform.youtube.subtitle"),
      metrics: [
        { label: t("metrics.likes"), value: "1200" },
        { label: t("metrics.comments"), value: "1200" },
      ],
    },
    {
      name: "TikTok",
      icon: Music2,
      iconColor: "text-black",
      subtitle: t("platform.tiktok.subtitle"),
      metrics: [
        { label: t("metrics.views"), value: "15000" },
        { label: t("metrics.shares"), value: "300" },
      ],
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      iconColor: "text-blue-600",
      subtitle: t("platform.linkedin.subtitle"),
      metrics: [
        { label: t("metrics.impressions"), value: "20000" },
        { label: t("metrics.reactions"), value: "1500" },
      ],
    },
  ];

  const crossPlatformData = [
    { date: "Apr 1", line1: 5, line2: 5, line3: 5, line4: 5 },
    { date: "Apr 15", line1: 6, line2: 5.5, line3: 5, line4: 5 },
    { date: "Apr 30", line1: 5, line2: 6.5, line3: 5, line4: 5.5 },
    { date: "May 15", line1: 5, line2: 5, line3: 5, line4: 5 },
    { date: "May 30", line1: 5, line2: 5.5, line3: 4.5, line4: 6 },
  ];

  const postComparison = [
    {
      id: "1",
      thumbnail: "/team-success.jpg",
      title: "Summer Vacation Highlights",
      platform: "Instagram",
      platformIcon: Instagram,
      date: "April 12, 2024",
      endDate: "Apr 15, 2024",
      views: "23,500",
      likes: "7,100",
      comments: "420",
      engagement: "32.0%",
    },
    {
      id: "2",
      thumbnail: "/team-success.jpg",
      title: "New Outfit Try-On Haul",
      platform: "YouTube",
      platformIcon: Youtube,
      date: "Mar 28, 2024",
      endDate: "Mar 28, 2024",
      views: "16,200",
      likes: "5,800",
      comments: "250",
      engagement: "32.3%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <Select defaultValue="month">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder={t("period.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">{t("period.week")}</SelectItem>
            <SelectItem value="month">{t("period.month")}</SelectItem>
            <SelectItem value="quarter">{t("period.quarter")}</SelectItem>
            <SelectItem value="year">{t("period.year")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((platform) => (
          <Card key={platform.name}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-muted ${platform.iconColor}`}>
                  <platform.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.subtitle}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                {platform.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cross-Platform Trends */}
      <Card>
        <CardHeader>
          <CardTitle>{t("charts.trends")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              line1: { label: "Platform 1", color: "hsl(270, 70%, 50%)" },
              line2: { label: "Platform 2", color: "hsl(0, 70%, 60%)" },
              line3: { label: "Platform 3", color: "hsl(280, 60%, 50%)" },
              line4: { label: "Platform 4", color: "hsl(190, 70%, 50%)" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={crossPlatformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="line1" stroke="hsl(270, 70%, 50%)" strokeWidth={2} />
                <Line type="monotone" dataKey="line2" stroke="hsl(0, 70%, 60%)" strokeWidth={2} />
                <Line type="monotone" dataKey="line3" stroke="hsl(280, 60%, 50%)" strokeWidth={2} />
                <Line type="monotone" dataKey="line4" stroke="hsl(190, 70%, 50%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Post Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("charts.comparison")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["thumbnail", "title", "date", "views", "likes", "comments", "engagement"].map(
                    (key) => (
                      <th
                        key={key}
                        className="text-left py-3 px-4 font-medium text-sm text-muted-foreground"
                      >
                        {t(`table.${key}`)}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {postComparison.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-muted">
                          <post.platformIcon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{post.title}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{post.platform}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">{post.date}</td>
                    <td className="py-3 px-4 font-medium">{post.views}</td>
                    <td className="py-3 px-4 font-medium">{post.likes}</td>
                    <td className="py-3 px-4 font-medium">{post.comments}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                          Number.parseFloat(post.engagement) > 10
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {post.engagement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
