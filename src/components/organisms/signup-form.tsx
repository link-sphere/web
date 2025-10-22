"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { EmailVerificationField } from "@/components/molecules/email-verification-field";
import { PasswordConfirmationField } from "@/components/molecules/password-confirmation-field";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function SignupForm() {
  const t = useTranslations("auth.signup");
  const locale = useLocale();

  const { signup } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError(t("allFields"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("pwMismatch"));
      return;
    }

    if (!isEmailVerified) {
      setError(t("emailVerify"));
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signup(email, password);
      if (result.success) {
        setSuccess(t("success"));
        setTimeout(() => router.push(`/${locale}`), 1000);
      } else {
        setError(result.message);
      }
    } catch {
      setError(t("networkError"));
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
      />

      <PasswordConfirmationField
        password={password}
        onPasswordChange={setPassword}
        confirmPassword={confirmPassword}
        onConfirmPasswordChange={setConfirmPassword}
        disabled={isLoading}
      />

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

      <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t("button")}
      </Button>
    </form>
  );
}
