// src/components/molecules/email-verification-field.tsx
"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/atoms/input-field";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RotateCcw } from "lucide-react";
import { AuthService } from "@/lib/auth";
import { useCountdown } from "@/hooks/use-countdown";

interface EmailVerificationFieldProps {
  email: string;
  onEmailChange: (email: string) => void;
  verificationCode: string;
  onVerificationCodeChange: (code: string) => void;
  isVerified: boolean;
  onVerificationComplete: (verified: boolean) => void;
  showVerificationInput: boolean;
  onShowVerificationInput: (show: boolean) => void;
  disabled?: boolean;
}

export function EmailVerificationField({
  email,
  onEmailChange,
  verificationCode,
  onVerificationCodeChange,
  isVerified,
  onVerificationComplete,
  showVerificationInput,
  onShowVerificationInput,
  disabled = false,
}: EmailVerificationFieldProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { remaining, isActive, start, stop, reset, mm, ss } = useCountdown(180);

  // Stop timer once verified
  useEffect(() => {
    if (isVerified) stop();
  }, [isVerified, stop]);

  const handleRequestVerification = async () => {
    if (!email) {
      setError("이메일을 입력해주세요");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const availabilityResult = await AuthService.checkEmailAvailability(email);
      if (!availabilityResult.success) {
        setError(availabilityResult.message);
        setIsLoading(false);
        return;
      }

      const result = await AuthService.requestVerificationCode(email);
      if (result.success) {
        setSuccess("인증코드가 이메일로 전송되었습니다");
        onShowVerificationInput(true);
        reset();
        start();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await AuthService.requestVerificationCode(email);
      if (result.success) {
        setSuccess("인증코드를 재전송했습니다");
        reset();
        start();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError("인증코드를 입력해주세요");
      return;
    }

    // Optional: disallow verifying after timer ends
    if (remaining === 0) {
      setError("인증코드가 만료되었습니다. 재전송 후 다시 시도해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await AuthService.verifyCode(email, verificationCode);
      if (result.success) {
        setSuccess("이메일 인증이 완료되었습니다");
        onVerificationComplete(true);
        stop();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const canResend = !isActive || remaining === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 w-full">
        <InputField
          id="email"
          type="email"
          label="이메일"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={disabled || showVerificationInput}
          error={error && !showVerificationInput ? error : ""}
          className="flex-1 min-w-0" // ← 가로 꽉 차게 + 오버플로 방지
        />

        {!showVerificationInput && (
          <Button
            type="button"
            onClick={handleRequestVerification}
            disabled={isLoading || !email || disabled}
            className="shrink-0 self-end" // ← 버튼은 내용만큼, 오른쪽 끝 정렬
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            인증요청
          </Button>
        )}
      </div>

      {showVerificationInput && (
        <div className="space-y-2">
          <div className="flex items-end gap-2">
            <InputField
              id="verificationCode"
              type="text"
              label="인증코드"
              placeholder="6자리 인증코드를 입력하세요"
              value={verificationCode}
              onChange={(e) => onVerificationCodeChange(e.target.value)}
              disabled={disabled || isVerified}
              maxLength={6}
              error={error && showVerificationInput ? error : ""}
              className="flex-1"
            />
            {!isVerified && (
              <Button
                type="button"
                onClick={handleVerifyCode}
                disabled={isLoading || !verificationCode || disabled || remaining === 0}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                인증확인
              </Button>
            )}
          </div>

          {/* Timer + Resend */}
          {!isVerified && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                {mm}:{ss}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResend}
                  disabled={!canResend || isLoading || disabled}
                >
                  <RotateCcw className="mr-1 h-4 w-4" /> 재전송
                </Button>
              </div>
            </div>
          )}

          {/* Expired helper */}
          {!isVerified && remaining === 0 && (
            <Alert className="mt-1">
              <AlertDescription>
                인증코드가 만료되었습니다. 재전송을 눌러 새 코드를 받아주세요.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
