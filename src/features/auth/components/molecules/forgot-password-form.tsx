"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCountdown } from "@/hooks/use-countdown";
import { useRequestVerificationCode, useVerifyCode } from "@/features/auth/hooks/useVerification";
import { usePasswordReset } from "@/features/auth/hooks/usePasswordReset";

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgot");
  const router = useRouter();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "verification" | "success">("email");
  const { remaining, isActive, start, reset, stop, mm, ss } = useCountdown(180);
  const requestCode = useRequestVerificationCode();
  const verifyCode = useVerifyCode();
  const resetPassword = usePasswordReset();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestCode.mutate(
      { email },
      {
        onSuccess: (res) => {
          if (res.success) {
            setStep("verification");
            start();
            setMessage(t("successSend"));
          } else setError(res.message);
        },
        onError: () => setError(t("errorNetwork")),
      }
    );
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode.mutate(
      { email, code },
      {
        onSuccess: (res) => {
          if (res.success) {
            resetPassword.mutate(
              { email },
              {
                onSuccess: (r2) => {
                  if (r2.success) {
                    stop();
                    setStep("success");
                    setMessage(t("successReset"));
                    setTimeout(() => router.replace(`/${locale}/auth/login`), 1200);
                  } else setError(r2.message);
                },
              }
            );
          } else setError(res.message);
        },
      }
    );
  };

  const isLoading = requestCode.isPending || verifyCode.isPending || resetPassword.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Link href={`/${locale}/auth/login`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle>{t("title")}</CardTitle>
          </div>
          <CardDescription>{t("desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {message && (
                <Alert>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" disabled={isLoading}>
                <Loader2 className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : "hidden"}`} />
                {t("sendCode")}
              </Button>
            </form>
          )}

          {step === "verification" && (
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <Input
                placeholder={t("codePlaceholder")}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="flex justify-between text-sm">
                <p>{email}</p>
                <p>
                  {mm}:{ss}
                </p>
              </div>
              <Button type="submit" disabled={isLoading || remaining === 0}>
                {t("confirm")}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => requestCode.mutate({ email })}
                disabled={isActive}
              >
                {<RotateCcw className="mr-1 h-4 w-4" />}
                {t("resend")}
              </Button>
            </form>
          )}

          {step === "success" && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
