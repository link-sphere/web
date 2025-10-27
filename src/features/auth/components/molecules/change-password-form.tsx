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
import { useChangePassword } from "@/features/auth/hooks/useChangePassword";

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
  const [error, setError] = useState("");

  const { mutate, isPending, isSuccess } = useChangePassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError(t("mismatch"));
      return;
    }
    if (newPassword.length < 6) {
      setError(t("tooShort"));
      return;
    }

    mutate(
      { oldPassword, newPassword },
      {
        onSuccess: (res) => {
          if (res.success) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => {
              router.replace(`/${locale}`);
              router.refresh();
            }, 1000);
          } else setError(res.message);
        },
        onError: () => setError(t("networkError")),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                id: "oldPassword",
                label: t("old"),
                val: oldPassword,
                set: setOldPassword,
                show: showOldPassword,
                toggle: setShowOldPassword,
              },
              {
                id: "newPassword",
                label: t("new"),
                val: newPassword,
                set: setNewPassword,
                show: showNewPassword,
                toggle: setShowNewPassword,
              },
              {
                id: "confirmPassword",
                label: t("confirm"),
                val: confirmPassword,
                set: setConfirmPassword,
                show: showConfirmPassword,
                toggle: setShowConfirmPassword,
              },
            ].map((f) => (
              <div key={f.id} className="space-y-2">
                <Label htmlFor={f.id}>{f.label}</Label>
                <div className="relative">
                  <Input
                    id={f.id}
                    type={f.show ? "text" : "password"}
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => f.toggle(!f.show)}
                  >
                    {f.show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ))}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{t("success")}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t("button")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
