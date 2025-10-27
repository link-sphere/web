"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, RotateCcw } from "lucide-react";
import { AuthService } from "@/lib/auth";
import Link from "next/link";
import { useCountdown } from "@/hooks/use-countdown";

export function ForgotPasswordForm() {
  const router = useRouter();
  const locale = useLocale();

  const t = useTranslations("auth.forgot");

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState<"email" | "verification" | "success">("email");
  const [tempPassword, setTempPassword] = useState("");
  const { remaining, isActive, start, reset, stop, mm, ss } = useCountdown(180);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const codeResult = await AuthService.requestVerificationCode(email);
      if (codeResult.success) {
        setStep("verification");
        setSuccess(t("successSend"));
        reset();
        start();
      } else {
        setError(codeResult.message);
      }
    } catch {
      setError(t("errorNetwork"));
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    if (!email) return;
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const codeResult = await AuthService.requestVerificationCode(email);
      if (codeResult.success) {
        setSuccess(t("successResend"));
        reset();
        start();
      } else {
        setError(codeResult.message);
      }
    } catch {
      setError(t("errorNetwork"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (remaining === 0) {
        setError(t("errorExpired"));
        return;
      }

      const verifyResult = await AuthService.verifyCode(email, verificationCode);
      if (verifyResult.success) {
        const resetResult = await AuthService.requestPasswordReset(email);

        if (resetResult && resetResult.success) {
          setTempPassword(tempPassword || "");
          setStep("success");
          setSuccess(t("successReset"));
          stop();

          setTimeout(() => {
            router.replace(`/${locale}`);
            router.refresh();
          }, 1000);
        } else {
          setError(resetResult?.message || "errorNetwork");
        }
      } else {
        setError(verifyResult.message);
      }
    } catch {
      setError(t("errorNetwork"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Link href={`/${locale}/auth/login`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-semibold">{t("title")}</CardTitle>
          </div>
          <CardDescription>{t("desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* 이메일 입력 */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <Input
                id="email"
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("sendCode")}
              </Button>
            </form>
          )}

          {/* 인증 코드 */}
          {step === "verification" && (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <Label htmlFor="code">{t("codeLabel")}</Label>
              <Input
                id="code"
                type="text"
                placeholder={t("codePlaceholder")}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <p>{email}</p>
                <p>
                  {mm}:{ss}
                </p>
              </div>

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

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setStep("email");
                    stop();
                  }}
                  className="flex-1"
                >
                  {t("back")}
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading || remaining === 0}>
                  {t("confirm")}
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={resendCode}
                disabled={isLoading || (isActive && remaining > 0)}
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> {t("resend")}
              </Button>
            </form>
          )}

          {/* 성공 */}
          {step === "success" && (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
              {tempPassword && (
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">{t("tempPassword")}</Label>
                  <p className="text-lg font-mono mt-1">{tempPassword}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t("tempNote")}</p>
                </div>
              )}
              <Link href={`/${locale}/auth/login`}>
                <Button className="w-full">{t("goLogin")}</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
