// src/components/molecules/change-password-form.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { AuthService } from "@/lib/auth";

interface ChangePasswordFormProps {
  locale: "ko" | "en";
}

export function ChangePasswordForm({ locale }: ChangePasswordFormProps) {
  const router = useRouter();

  const t =
    locale === "ko"
      ? {
          title: "비밀번호 변경",
          desc: "보안을 위해 정기적으로 비밀번호를 변경하세요",
          old: "현재 비밀번호",
          new: "새 비밀번호",
          confirm: "새 비밀번호 확인",
          placeholderOld: "현재 비밀번호",
          placeholderNew: "새 비밀번호 (6자리 이상)",
          placeholderConfirm: "새 비밀번호 확인",
          mismatch: "새 비밀번호가 일치하지 않습니다",
          tooShort: "새 비밀번호는 6자리 이상이어야 합니다",
          networkError: "네트워크 오류가 발생했습니다",
          success: "비밀번호가 성공적으로 변경되었습니다",
          button: "비밀번호 변경",
        }
      : {
          title: "Change Password",
          desc: "For security reasons, it’s recommended to update your password regularly.",
          old: "Current Password",
          new: "New Password",
          confirm: "Confirm New Password",
          placeholderOld: "Enter your current password",
          placeholderNew: "Enter a new password (min. 6 characters)",
          placeholderConfirm: "Re-enter your new password",
          mismatch: "New passwords do not match",
          tooShort: "New password must be at least 6 characters long",
          networkError: "A network error occurred. Please try again.",
          success: "Your password has been successfully changed.",
          button: "Change Password",
        };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError(t.mismatch);
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError(t.tooShort);
      setIsLoading(false);
      return;
    }

    try {
      const result = await AuthService.changePassword(oldPassword, newPassword);

      if (result.success) {
        setSuccess(result.message || t.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          router.replace(`/${locale}`);
          router.refresh();
        }, 1000);
      } else {
        setError(result.message || "Error");
      }
    } catch (err) {
      setError(t.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">{t.title}</CardTitle>
          <CardDescription className="text-muted-foreground">{t.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 현재 비밀번호 */}
            <div className="space-y-2">
              <Label htmlFor="oldPassword">{t.old}</Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  placeholder={t.placeholderOld}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* 새 비밀번호 */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t.new}</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder={t.placeholderNew}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* 새 비밀번호 확인 */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirm}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t.placeholderConfirm}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* 에러/성공 메시지 */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.button}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
