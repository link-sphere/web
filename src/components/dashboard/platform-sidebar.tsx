"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlatform } from "@/components/dashboard/dashboard-layout";
import { useTranslations } from "next-intl";

interface PlatformSidebarProps {
  onItemClick?: () => void;
}

const platforms = [
  { id: "all", icon: "📊", color: "text-foreground" },
  { id: "instagram", icon: "📷", color: "text-pink-500" },
  { id: "facebook", icon: "👥", color: "text-blue-600" },
  { id: "threads", icon: "🧵", color: "text-foreground" },
  { id: "linkedin", icon: "💼", color: "text-blue-700" },
  { id: "tiktok", icon: "🎵", color: "text-foreground" },
  { id: "youtube", icon: "▶️", color: "text-red-600" },
];

export function PlatformSidebar({ onItemClick }: PlatformSidebarProps) {
  const { selectedPlatform, setSelectedPlatform } = usePlatform();
  const t = useTranslations("dashboard.platformSidebar");

  const handlePlatformClick = (platformId: string) => {
    setSelectedPlatform(platformId);
    onItemClick?.();
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3">
          {t("title")}
        </h2>
      </div>

      <nav className="flex flex-col gap-1">
        {platforms.map((platform) => (
          <Button
            key={platform.id}
            variant={selectedPlatform === platform.id ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-3 font-medium",
              selectedPlatform === platform.id && "bg-secondary"
            )}
            onClick={() => handlePlatformClick(platform.id)}
          >
            <span className="text-lg">{platform.icon}</span>
            <span className={platform.color}>{t(platform.id)}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
}
