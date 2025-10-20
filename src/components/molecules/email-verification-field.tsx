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
  locale?: "ko" | "en";
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
  locale = "ko",
}: EmailVerificationFieldProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { remaining, isActive, start, stop, reset, mm, ss } = useCountdown(180);

  const t =
    locale === "ko"
      ? {
          emailLabel: "이메일",
          emailPlaceholder: "name@example.com",
          request: "인증요청",
          verifyLabel: "인증코드",
          verifyPlaceholder: "6자리 인증코드를 입력하세요",
          verifyButton: "인증확인",
          resend: "재전송",
          expiredAlert: "인증코드가 만료되었습니다. 재전송을 눌러 새 코드를 받아주세요.",
          errorEmptyEmail: "이메일을 입력해주세요",
          errorEmptyCode: "인증코드를 입력해주세요",
          errorExpired: "인증코드가 만료되었습니다. 재전송 후 다시 시도해주세요.",
          errorNetwork: "네트워크 오류가 발생했습니다",
          successSend: "인증코드가 이메일로 전송되었습니다",
          successResend: "인증코드를 재전송했습니다",
          successVerify: "이메일 인증이 완료되었습니다",
        }
      : {
          emailLabel: "Email",
          emailPlaceholder: "name@example.com",
          request: "Send Code",
          verifyLabel: "Verification Code",
          verifyPlaceholder: "Enter 6-digit code",
          verifyButton: "Verify",
          resend: "Resend",
          expiredAlert: "Verification code expired. Please resend to get a new one.",
          errorEmptyEmail: "Please enter your email address",
          errorEmptyCode: "Please enter the verification code",
          errorExpired: "Verification code expired. Please resend and try again.",
          errorNetwork: "A network error occurred. Please try again.",
          successSend: "Verification code sent to your email",
          successResend: "Verification code resent successfully",
          successVerify: "Email verified successfully",
        };

  // Stop timer once verified
  useEffect(() => {
    if (isVerified) stop();
  }, [isVerified, stop]);

  const handleRequestVerification = async () => {
    if (!email) {
      setError(t.errorEmptyEmail);
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
        setSuccess(t.successSend);
        onShowVerificationInput(true);
        reset();
        start();
      } else {
        setError(result.message);
      }
    } catch {
      setError(t.errorNetwork);
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
        setSuccess(t.successResend);
        reset();
        start();
      } else {
        setError(result.message);
      }
    } catch {
      setError(t.errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError(t.errorEmptyCode);
      return;
    }

    if (remaining === 0) {
      setError(t.errorExpired);
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await AuthService.verifyCode(email, verificationCode);
      if (result.success) {
        setSuccess(t.successVerify);
        onVerificationComplete(true);
        stop();
      } else {
        setError(result.message);
      }
    } catch {
      setError(t.errorNetwork);
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
          label={t.emailLabel}
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={disabled || showVerificationInput}
          error={error && !showVerificationInput ? error : ""}
          className="flex-1 min-w-0"
        />

        {!showVerificationInput && (
          <Button
            type="button"
            onClick={handleRequestVerification}
            disabled={isLoading || !email || disabled}
            className="shrink-0 self-end"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t.request}
          </Button>
        )}
      </div>

      {showVerificationInput && (
        <div className="space-y-2">
          <div className="flex items-end gap-2">
            <InputField
              id="verificationCode"
              type="text"
              label={t.verifyLabel}
              placeholder={t.verifyPlaceholder}
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
                {t.verifyButton}
              </Button>
            )}
          </div>

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
                  <RotateCcw className="mr-1 h-4 w-4" /> {t.resend}
                </Button>
              </div>
            </div>
          )}

          {!isVerified && remaining === 0 && (
            <Alert className="mt-1">
              <AlertDescription>{t.expiredAlert}</AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
