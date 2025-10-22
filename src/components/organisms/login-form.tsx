"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { InputField } from "@/components/atoms/input-field";
import { PasswordField } from "@/components/atoms/password-field";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function LoginForm() {
  const t = useTranslations("auth.login");
  const locale = useLocale();

  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t("errorEmpty"));
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await login(email, password);
      if (result.success) {
        setSuccess(result.message);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="email"
        type="email"
        label={t("email")}
        placeholder={t("placeholderEmail")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="h-4 w-4" />}
        required
      />

      <PasswordField
        id="password"
        label={t("password")}
        placeholder={t("placeholderPassword")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t("button")}
      </Button>
    </form>
  );
}
