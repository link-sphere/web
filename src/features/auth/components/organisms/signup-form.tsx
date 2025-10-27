"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useSignup } from "@/features/auth/hooks/useSignup";
import { PasswordConfirmationField } from "../molecules/password-confirmation-field";
import { EmailVerificationField } from "../molecules/email-verification-field";

export function SignupForm() {
  const t = useTranslations("auth.signup");
  const locale = useLocale();
  const router = useRouter();
  const { mutate: signup, isPending } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return setError(t("emailVerify"));
    if (password !== confirmPassword) return setError(t("pwMismatch"));
    signup(
      { identifier: email, password },
      {
        onSuccess: (res) => {
          if (res.success) router.push(`/${locale}`);
          else setError(res.message);
        },
        onError: () => setError(t("networkError")),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EmailVerificationField
        email={email}
        onEmailChange={setEmail}
        verificationCode={verificationCode}
        onVerificationCodeChange={setVerificationCode}
        isVerified={isVerified}
        onVerificationComplete={setIsVerified}
        showVerificationInput={showVerification}
        onShowVerificationInput={setShowVerification}
      />
      <PasswordConfirmationField
        password={password}
        onPasswordChange={setPassword}
        confirmPassword={confirmPassword}
        onConfirmPasswordChange={setConfirmPassword}
      />
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        <Loader2 className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : "hidden"}`} />
        {t("button")}
      </Button>
    </form>
  );
}
