"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { usePathname } from "next/navigation"
import { PlatformSidebar } from "@/components/dashboard/platform-sidebar"
import { CreateSidebar } from "@/components/create/create-sidebar"
import { TopNavigation } from "@/components/dashboard/top-navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLocale } from "next-intl"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface PlatformContextType {
  selectedPlatform: string
  setSelectedPlatform: (platform: string) => void
}

const PlatformContext = createContext<PlatformContextType>({
  selectedPlatform: "all",
  setSelectedPlatform: () => {},
})

export const usePlatform = () => useContext(PlatformContext)

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const pathname = usePathname()
    const locale = useLocale();

  const isCreatePage = pathname === "/create" || pathname === `/${locale}/create`;
  const SidebarComponent = isCreatePage ? CreateSidebar : PlatformSidebar

  return (
    <PlatformContext.Provider value={{ selectedPlatform, setSelectedPlatform }}>
      <div className="h-screen flex flex-col overflow-hidden bg-background">
        <TopNavigation />

        <div className="flex flex-1 overflow-hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed left-4 top-20 z-40 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarComponent onItemClick={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>

          <aside className="hidden lg:block w-64 border-r border-border bg-card overflow-y-auto flex-shrink-0">
            <SidebarComponent />
          </aside>

          <main className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="container mx-auto p-4 sm:p-6 lg:p-8 h-full">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </PlatformContext.Provider>
  )
}
