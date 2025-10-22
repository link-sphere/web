// src/components/molecules/email-verification-field.tsx
"use client";

import { useState, useEffect } from "react";
import { InputField } from "@/components/auth/atoms/input-field";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RotateCcw } from "lucide-react";
import { AuthService } from "@/lib/auth";
import { useCountdown } from "@/hooks/use-countdown";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("emailVerification");

  useEffect(() => {
    if (isVerified) stop();
  }, [isVerified, stop]);

  const handleRequestVerification = async () => {
    if (!email) {
      setError(t("errorEmptyEmail"));
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
        setSuccess(t("successSend"));
        onShowVerificationInput(true);
        reset();
        start();
      } else {
        setError(result.message);
      }
    } catch {
      setError(t("errorNetwork"));
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
        setSuccess(t("successResend"));
        reset();
        start();
      } else {
        setError(result.message);
      }
    } catch {
      setError(t("errorNetwork"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError(t("errorEmptyCode"));
      return;
    }

    if (remaining === 0) {
      setError(t("errorExpired"));
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await AuthService.verifyCode(email, verificationCode);
      if (result.success) {
        setSuccess(t("successVerify"));
        onVerificationComplete(true);
        stop();
      } else {
        setError(result.message);
      }
    } catch {
      setError(t("errorNetwork"));
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
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
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
            {t("request")}
          </Button>
        )}
      </div>

      {showVerificationInput && (
        <div className="space-y-2">
          <div className="flex items-end gap-2">
            <InputField
              id="verificationCode"
              type="text"
              label={t("verifyLabel")}
              placeholder={t("verifyPlaceholder")}
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
                {t("verifyButton")}
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
                  <RotateCcw className="mr-1 h-4 w-4" /> {t("resend")}
                </Button>
              </div>
            </div>
          )}

          {!isVerified && remaining === 0 && (
            <Alert className="mt-1">
              <AlertDescription>{t("expiredAlert")}</AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
