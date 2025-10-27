"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, RotateCcw } from "lucide-react";
import { useCountdown } from "@/hooks/use-countdown";
import { useTranslations } from "next-intl";
import {
  useCheckEmail,
  useRequestVerificationCode,
  useVerifyCode,
} from "@/features/auth/hooks/useVerification";
import { InputField } from "../atoms/input-field";

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
  const t = useTranslations("auth.emailVerification");
  const { remaining, isActive, start, stop, reset, mm, ss } = useCountdown(180);
  const checkEmail = useCheckEmail();
  const requestCode = useRequestVerificationCode();
  const verifyCode = useVerifyCode();

  useEffect(() => {
    if (isVerified) stop();
  }, [isVerified, stop]);

  const handleRequestVerification = async () => {
    checkEmail.mutate(email, {
      onSuccess: (res) => {
        if (res.success) {
          requestCode.mutate(
            { email },
            {
              onSuccess: (r2) => {
                if (r2.success) {
                  onShowVerificationInput(true);
                  reset();
                  start();
                }
              },
            }
          );
        }
      },
    });
  };

  const handleVerifyCode = () => {
    verifyCode.mutate(
      { email, code: verificationCode },
      { onSuccess: (res) => res.success && (onVerificationComplete(true), stop()) }
    );
  };

  const isLoading = checkEmail.isPending || requestCode.isPending || verifyCode.isPending;
  const errorMsg =
    checkEmail.error?.message || requestCode.error?.message || verifyCode.error?.message;

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <InputField
          id="email"
          type="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={disabled || showVerificationInput}
          error={errorMsg}
        />
        {!showVerificationInput && (
          <Button onClick={handleRequestVerification} disabled={!email || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t("request")}
          </Button>
        )}
      </div>

      {showVerificationInput && (
        <>
          <div className="flex items-end gap-2">
            <InputField
              id="verificationCode"
              label={t("verifyLabel")}
              value={verificationCode}
              onChange={(e) => onVerificationCodeChange(e.target.value)}
              disabled={disabled || isVerified}
            />
            {!isVerified && (
              <Button onClick={handleVerifyCode} disabled={!verificationCode || isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t("verifyButton")}
              </Button>
            )}
          </div>

          {!isVerified && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>
                {mm}:{ss}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRequestVerification}
                disabled={isLoading || isActive}
              >
                <RotateCcw className="mr-1 h-4 w-4" /> {t("resend")}
              </Button>
            </div>
          )}

          {errorMsg && (
            <Alert variant="destructive">
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
