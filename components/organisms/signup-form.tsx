"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailVerificationField } from "@/components/molecules/email-verification-field";
import { PasswordConfirmationField } from "@/components/molecules/password-confirmation-field";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface SignupFormProps {
  locale: "ko" | "en";
}

export function SignupForm({ locale }: SignupFormProps) {
  const t =
    locale === "ko"
      ? {
          emailVerify: "이메일 인증을 완료해주세요",
          allFields: "모든 필드를 입력해주세요",
          pwMismatch: "비밀번호가 일치하지 않습니다",
          networkError: "네트워크 오류가 발생했습니다",
          success: "회원가입이 완료되었습니다",
          button: "회원가입",
        }
      : {
          emailVerify: "Please complete email verification",
          allFields: "Please fill in all fields",
          pwMismatch: "Passwords do not match",
          networkError: "A network error occurred. Please try again.",
          success: "Sign up successful",
          button: "Sign Up",
        };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError(t.allFields);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.pwMismatch);
      return;
    }

    if (!isEmailVerified) {
      setError(t.emailVerify);
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signup(email, password);
      if (result.success) {
        setSuccess(result.message || t.success);
        setTimeout(() => {
          router.push(`/${locale}`);
        }, 1000);
      } else {
        setError(result.message);
      }
    } catch {
      setError(t.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    isEmailVerified && password && confirmPassword && password === confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EmailVerificationField
        email={email}
        onEmailChange={setEmail}
        verificationCode={verificationCode}
        onVerificationCodeChange={setVerificationCode}
        isVerified={isEmailVerified}
        onVerificationComplete={setIsEmailVerified}
        showVerificationInput={showVerificationInput}
        onShowVerificationInput={setShowVerificationInput}
        disabled={isLoading}
        locale={locale}
      />

      <PasswordConfirmationField
        password={password}
        onPasswordChange={setPassword}
        confirmPassword={confirmPassword}
        onConfirmPasswordChange={setConfirmPassword}
        disabled={isLoading}
        locale={locale}
      />

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

      <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t.button}
      </Button>
    </form>
  );
}
