"use client"

import { useEffect } from "react"
import { OverviewAnalytics } from "@/components/analytics/overview-analytics"
import { PlatformAnalytics } from "@/components/analytics/platform-analytics"
import { usePlatform } from "@/components/dashboard/dashboard-layout";

export function AnalyticsDashboard() {
  const { selectedPlatform } = usePlatform()

  useEffect(() => {
    // Handle platform change if needed
  }, [selectedPlatform])

  return (
    <div className="w-full">
      {selectedPlatform === "all" ? <OverviewAnalytics /> : <PlatformAnalytics platform={selectedPlatform} />}
    </div>
  )
}
