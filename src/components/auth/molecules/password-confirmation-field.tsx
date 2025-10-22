// src/components/molecules/password-confirmation-field.tsx
"use client";

import { PasswordField } from "@/components/auth/atoms/password-field";
import { useTranslations } from "next-intl";

interface PasswordConfirmationFieldProps {
  password: string;
  onPasswordChange: (password: string) => void;
  confirmPassword: string;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  disabled?: boolean;
}

export function PasswordConfirmationField({
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  disabled = false,
}: PasswordConfirmationFieldProps) {
  const t = useTranslations("auth.passwordConfirmation");

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const showMismatch = confirmPassword && password !== confirmPassword;

  return (
    <div className="space-y-4">
      <PasswordField
        id="password"
        label={t("passwordLabel")}
        placeholder={t("passwordPlaceholder")}
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        disabled={disabled}
      />

      <PasswordField
        id="confirmPassword"
        label={t("confirmLabel")}
        placeholder={t("confirmPlaceholder")}
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        disabled={disabled}
        error={showMismatch ? t("mismatch") : ""}
        helperText={passwordsMatch ? t("match") : ""}
      />
    </div>
  );
}
