"use client";

import { DashboardLayout, usePlatform } from "@/components/dashboard/dashboard-layout";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { useTranslations } from "next-intl";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <AnalyticsPageContent />
    </DashboardLayout>
  );
}

function AnalyticsPageContent() {
  const t = useTranslations("dashboard.analyticsPage");
  const { selectedPlatform } = usePlatform();

  const platformNames: Record<string, string> = {
    all: t("platform.all"),
    instagram: "Instagram",
    facebook: "Facebook",
    threads: "Threads",
    linkedin: "LinkedIn",
    tiktok: "TikTok",
    youtube: "YouTube",
  };

  const pageTitle = platformNames[selectedPlatform] || t("platform.all");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
