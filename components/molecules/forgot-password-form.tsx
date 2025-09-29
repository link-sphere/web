"use client";

import type React from "react";
import { useEffect, useState } from "react";
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

export function ForgotPasswordForm() {
  const router = useRouter();
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
      const avail = await AuthService.checkEmailAvailability(email);

      if (!avail.available) {
        setError("해당 이메일로 가입된 계정이 없습니다. 회원가입을 진행해 주세요.");
        return;
      }

      const codeResult = await AuthService.requestVerificationCode(email);
      if (codeResult.success) {
        setStep("verification");
        setSuccess("인증번호가 이메일로 전송되었습니다.");
        reset();
        start();
      } else {
        setError(codeResult.message);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다");
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
        setSuccess("인증번호를 재전송했습니다.");
        reset();
        start();
      } else {
        setError(codeResult.message);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다");
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
        setError("인증번호가 만료되었습니다. 재전송 후 다시 시도하세요.");
        return;
      }
      const verifyResult = await AuthService.verifyCode(email, verificationCode);

      if (verifyResult.success) {
        const resetResult = await AuthService.requestPasswordReset(email);

        if (resetResult.success) {
          setTempPassword(resetResult.data?.tempPassword || "");
          setStep("success");
          setSuccess("임시 비밀번호가 발급되었습니다.");
          stop();

          setTimeout(() => {
            router.replace("/");
            router.refresh();
          }, 1000);
        } else {
          setError(resetResult.message);
        }
      } else {
        setError(verifyResult.message);
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-semibold">비밀번호 찾기</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            {step === "email" && "이메일 주소를 입력하세요"}
            {step === "verification" && "인증번호를 입력하세요"}
            {step === "success" && "임시 비밀번호가 발급되었습니다"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
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
                인증번호 전송
              </Button>
            </form>
          )}

          {step === "verification" && (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">인증번호</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="6자리 인증번호"
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
                  이전
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading || remaining === 0}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  확인
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={resendCode}
                disabled={isLoading || (isActive && remaining > 0)}
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> 재전송
              </Button>

              {remaining === 0 && (
                <Alert>
                  <AlertDescription>
                    인증번호가 만료되었습니다. 재전송을 눌러 새 코드를 받아주세요.
                  </AlertDescription>
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
                  <Label className="text-sm font-medium">임시 비밀번호</Label>
                  <p className="text-lg font-mono mt-1">{tempPassword}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    로그인 후 반드시 비밀번호를 변경하세요.
                  </p>
                </div>
              )}

              <Link href="/auth/login">
                <Button className="w-full">로그인하기</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
