"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { AuthService } from "@/lib/auth";

export function ChangePasswordForm() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth.change");

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
      setError(t("mismatch", { default: "비밀번호 불일치" }));
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError(t("tooShort", { default: "6자리 이상 필요" }));
      setIsLoading(false);
      return;
    }

    try {
      const result = await AuthService.changePassword(oldPassword, newPassword);

      if (result.success) {
        setSuccess(t("success"));
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
    } catch {
      setError(t("networkError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{t("title")}</CardTitle>
          <CardDescription>{t("desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                id: "oldPassword",
                label: t("old"),
                value: oldPassword,
                setter: setOldPassword,
                show: showOldPassword,
                setShow: setShowOldPassword,
                placeholder: t("placeholderOld"),
              },
              {
                id: "newPassword",
                label: t("new"),
                value: newPassword,
                setter: setNewPassword,
                show: showNewPassword,
                setShow: setShowNewPassword,
                placeholder: t("placeholderNew"),
              },
              {
                id: "confirmPassword",
                label: t("confirm"),
                value: confirmPassword,
                setter: setConfirmPassword,
                show: showConfirmPassword,
                setShow: setShowConfirmPassword,
                placeholder: t("placeholderConfirm"),
              },
            ].map((field) => (
              <div className="space-y-2" key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <div className="relative">
                  <Input
                    id={field.id}
                    type={field.show ? "text" : "password"}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    required
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => field.setShow(!field.show)}
                  >
                    {field.show ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            ))}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("button")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
