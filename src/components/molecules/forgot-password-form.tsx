"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, RotateCcw } from "lucide-react";
import { AuthService } from "@/lib/auth";
import Link from "next/link";
import { useCountdown } from "@/hooks/use-countdown";

interface ForgotPasswordFormProps {
  locale: "ko" | "en";
}

export function ForgotPasswordForm({ locale }: ForgotPasswordFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState<"email" | "verification" | "success">("email");
  const [tempPassword, setTempPassword] = useState("");
  const { remaining, isActive, start, reset, stop, mm, ss } = useCountdown(180);

  // 다국어 텍스트 매핑
  const t =
    locale === "ko"
      ? {
          title: "비밀번호 찾기",
          emailLabel: "이메일",
          emailPlaceholder: "name@example.com",
          codeLabel: "인증번호",
          codePlaceholder: "6자리 인증번호",
          back: "이전",
          resend: "재전송",
          confirm: "확인",
          sendCode: "인증번호 전송",
          tempPassword: "임시 비밀번호",
          tempNote: "로그인 후 반드시 비밀번호를 변경하세요.",
          goLogin: "로그인하기",
          stepEmail: "이메일 주소를 입력하세요",
          stepVerification: "인증번호를 입력하세요",
          stepSuccess: "임시 비밀번호가 발급되었습니다",
          errorNoAccount: "해당 이메일로 가입된 계정이 없습니다. 회원가입을 진행해 주세요.",
          errorNetwork: "네트워크 오류가 발생했습니다",
          errorExpired: "인증번호가 만료되었습니다. 재전송 후 다시 시도하세요.",
          expiredNotice: "인증번호가 만료되었습니다. 재전송을 눌러 새 코드를 받아주세요.",
          successSend: "인증번호가 이메일로 전송되었습니다.",
          successResend: "인증번호를 재전송했습니다.",
          successReset: "임시 비밀번호가 발급되었습니다.",
        }
      : {
          title: "Forgot Password",
          emailLabel: "Email",
          emailPlaceholder: "name@example.com",
          codeLabel: "Verification Code",
          codePlaceholder: "6-digit code",
          back: "Back",
          resend: "Resend Code",
          confirm: "Verify",
          sendCode: "Send Code",
          tempPassword: "Temporary Password",
          tempNote: "Please change your password after logging in.",
          goLogin: "Go to Login",
          stepEmail: "Enter your email address",
          stepVerification: "Enter the verification code",
          stepSuccess: "A temporary password has been issued",
          errorNoAccount: "No account found with this email. Please sign up first.",
          errorNetwork: "A network error occurred. Please try again.",
          errorExpired: "Verification code expired. Please resend and try again.",
          expiredNotice: "The code has expired. Click resend to get a new one.",
          successSend: "Verification code has been sent to your email.",
          successResend: "Verification code resent successfully.",
          successReset: "A temporary password has been issued.",
        };

  // 1단계: 이메일 제출
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const avail = await AuthService.checkEmailAvailability(email);

      if (!avail.available) {
        setError(t.errorNoAccount);
        return;
      }

      const codeResult = await AuthService.requestVerificationCode(email);
      if (codeResult.success) {
        setStep("verification");
        setSuccess(t.successSend);
        reset();
        start();
      } else {
        setError(codeResult.message);
      }
    } catch {
      setError(t.errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  // 코드 재전송
  const resendCode = async () => {
    if (!email) return;
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const codeResult = await AuthService.requestVerificationCode(email);
      if (codeResult.success) {
        setSuccess(t.successResend);
        reset();
        start();
      } else {
        setError(codeResult.message);
      }
    } catch {
      setError(t.errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  // 2단계: 인증번호 확인 + 임시비밀번호 발급
  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (remaining === 0) {
        setError(t.errorExpired);
        return;
      }
      const verifyResult = await AuthService.verifyCode(email, verificationCode);

      if (verifyResult.success) {
        const resetResult = await AuthService.requestPasswordReset(email);

        if (resetResult.success) {
          setTempPassword(resetResult.data?.tempPassword || "");
          setStep("success");
          setSuccess(t.successReset);
          stop();

          setTimeout(() => {
            router.replace(`/${locale}`);
            router.refresh();
          }, 1000);
        } else {
          setError(resetResult.message);
        }
      } else {
        setError(verifyResult.message);
      }
    } catch {
      setError(t.errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link href={`/${locale}/auth/login`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-semibold">{t.title}</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            {step === "email" && t.stepEmail}
            {step === "verification" && t.stepVerification}
            {step === "success" && t.stepSuccess}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.sendCode}
              </Button>
            </form>
          )}

          {step === "verification" && (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">{t.codeLabel}</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder={t.codePlaceholder}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>{email}로 전송된 인증번호를 입력하세요</p>
                  <p>
                    남은 시간 {mm}:{ss}
                  </p>
                </div>
              </div>

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
                  {t.back}
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading || remaining === 0}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t.confirm}
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={resendCode}
                disabled={isLoading || (isActive && remaining > 0)}
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> {t.resend}
              </Button>

              {remaining === 0 && (
                <Alert>
                  <AlertDescription>{t.expiredNotice}</AlertDescription>
                </Alert>
              )}
            </form>
          )}

          {step === "success" && (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>

              {tempPassword && (
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium">{t.tempPassword}</Label>
                  <p className="text-lg font-mono mt-1">{tempPassword}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t.tempNote}</p>
                </div>
              )}

              <Link href={`/${locale}/auth/login`}>
                <Button className="w-full">{t.goLogin}</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
