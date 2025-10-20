// src/components/layout/user-menu.tsx
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, KeyRound } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const locale = pathname.split("/")[1] === "en" ? "en" : "ko";

  const t =
    locale === "ko"
      ? {
          logoutTitle: "로그아웃 완료",
          logoutDesc: "성공적으로 로그아웃되었습니다.",
          logoutFail: "로그아웃 실패",
          logoutFailDesc: "로그아웃 중 오류가 발생했습니다.",
          changePw: "비밀번호 재설정",
          loggingOut: "로그아웃 중...",
          logout: "로그아웃",
        }
      : {
          logoutTitle: "Signed Out",
          logoutDesc: "You have been successfully logged out.",
          logoutFail: "Logout Failed",
          logoutFailDesc: "An error occurred while logging out.",
          changePw: "Change Password",
          loggingOut: "Logging out...",
          logout: "Sign Out",
        };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast({
        title: t.logoutTitle,
        description: t.logoutDesc,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: t.logoutFail,
        description: t.logoutFailDesc,
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handlePasswordReset = () => {
    router.push(`/${locale}/auth/change-password`);
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handlePasswordReset}>
          <KeyRound className="mr-2 h-4 w-4" />
          {t.changePw}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? t.loggingOut : t.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
