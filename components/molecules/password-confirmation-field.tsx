"use client"

import { PasswordField } from "@/components/atoms/password-field"

interface PasswordConfirmationFieldProps {
  password: string
  onPasswordChange: (password: string) => void
  confirmPassword: string
  onConfirmPasswordChange: (confirmPassword: string) => void
  disabled?: boolean
}

export function PasswordConfirmationField({
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  disabled = false,
}: PasswordConfirmationFieldProps) {
  const passwordsMatch = password && confirmPassword && password === confirmPassword
  const showMismatch = confirmPassword && password !== confirmPassword

  return (
    <div className="space-y-4">
      <PasswordField
        id="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        disabled={disabled}
      />

      <PasswordField
        id="confirmPassword"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력하세요"
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        disabled={disabled}
        error={showMismatch ? "비밀번호가 일치하지 않습니다" : ""}
        helperText={passwordsMatch ? "비밀번호가 일치합니다" : ""}
      />
    </div>
  )
}
