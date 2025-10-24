"use client";

import { DashboardLayout, usePlatform } from "@/components/dashboard/dashboard-layout";
import { ManageTabs } from "@/components/manage/manage-tabs";
import { useTranslations } from "next-intl";

export default function ManagePage() {
  return (
    <DashboardLayout>
      <ManagePageContent />
    </DashboardLayout>
  );
}

function ManagePageContent() {
  const t = useTranslations("dashboard.managePage");
  const { selectedPlatform } = usePlatform();

  const platformNames: Record<string, string> = {
    all: t("platforms.all"),
    instagram: t("platforms.instagram"),
    facebook: t("platforms.facebook"),
    threads: t("platforms.threads"),
    linkedin: t("platforms.linkedin"),
    tiktok: t("platforms.tiktok"),
    youtube: t("platforms.youtube"),
  };

  const pageTitle = platformNames[selectedPlatform] || t("platforms.all");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
      </div>

      <ManageTabs />
    </div>
  );
}
