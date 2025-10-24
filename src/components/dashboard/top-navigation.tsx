"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { UserMenu } from "@/components/layout/user-menu";

const navItems = [
  { key: "create", href: "/create" },
  { key: "deploy", href: "/deploy" },
  { key: "manage", href: "/manage" },
  { key: "analytics", href: "/analytics" },
];

export function TopNavigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("dashboard.topNavigation");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="flex h-16 items-center px-4 sm:px-6">
        {/* 로고 */}
        <Link href={`/${locale}/deploy`} className="flex items-center gap-2 mr-4 sm:mr-8">
          <Image src="/logo.png" alt="Postio" width={40} height={40} />
          <span className="font-bold text-lg sm:text-xl hidden sm:inline">Postio</span>
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className="flex items-center gap-1 flex-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(`/${locale}${item.href}`);
            return (
              <Link key={item.key} href={`/${locale}${item.href}`}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="font-medium whitespace-nowrap text-sm sm:text-base"
                >
                  {t(item.key)}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* 유저 메뉴 (아바타 드롭다운) */}
        <div className="flex-shrink-0">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
