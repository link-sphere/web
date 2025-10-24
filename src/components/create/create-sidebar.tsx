"use client";

import { Button } from "@/components/ui/button";
import { FolderKanban } from "lucide-react";
import { useTranslations } from "next-intl";

interface CreateSidebarProps {
  onItemClick?: () => void;
}

export function CreateSidebar({ onItemClick }: CreateSidebarProps) {
  const t = useTranslations("dashboard.createSidebar");

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3">
          {t("title")}
        </h2>
      </div>

      <nav className="flex flex-col gap-1">
        <Button
          variant="secondary"
          className="justify-start gap-3 font-medium bg-secondary"
          onClick={onItemClick}
        >
          <FolderKanban className="h-5 w-5" />
          <span>{t("versionManagement")}</span>
        </Button>
      </nav>
    </div>
  );
}
