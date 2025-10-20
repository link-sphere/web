"use client";

import { PasswordField } from "@/components/atoms/password-field";

interface PasswordConfirmationFieldProps {
  password: string;
  onPasswordChange: (password: string) => void;
  confirmPassword: string;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  disabled?: boolean;
  locale?: "ko" | "en";
}

export function PasswordConfirmationField({
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  disabled = false,
  locale = "ko",
}: PasswordConfirmationFieldProps) {
  const t =
    locale === "ko"
      ? {
          passwordLabel: "비밀번호",
          passwordPlaceholder: "비밀번호를 입력하세요",
          confirmLabel: "비밀번호 확인",
          confirmPlaceholder: "비밀번호를 다시 입력하세요",
          mismatch: "비밀번호가 일치하지 않습니다",
          match: "비밀번호가 일치합니다",
        }
      : {
          passwordLabel: "Password",
          passwordPlaceholder: "Enter your password",
          confirmLabel: "Confirm Password",
          confirmPlaceholder: "Re-enter your password",
          mismatch: "Passwords do not match",
          match: "Passwords match",
        };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const showMismatch = confirmPassword && password !== confirmPassword;

  return (
    <div className="space-y-4">
      <PasswordField
        id="password"
        label={t.passwordLabel}
        placeholder={t.passwordPlaceholder}
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        disabled={disabled}
      />

      <PasswordField
        id="confirmPassword"
        label={t.confirmLabel}
        placeholder={t.confirmPlaceholder}
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        disabled={disabled}
        error={showMismatch ? t.mismatch : ""}
        helperText={passwordsMatch ? t.match : ""}
      />
    </div>
  );
}
