"use client"

import { useState } from "react"
import { InputField } from "@/components/atoms/input-field"
import { Button } from "@/components/ui/button"
import { Mail, Shield, Loader2 } from "lucide-react"
import { AuthService } from "@/lib/auth"

interface EmailVerificationFieldProps {
  email: string
  onEmailChange: (email: string) => void
  verificationCode: string
  onVerificationCodeChange: (code: string) => void
  isVerified: boolean
  onVerificationComplete: (verified: boolean) => void
  showVerificationInput: boolean
  onShowVerificationInput: (show: boolean) => void
  disabled?: boolean
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRequestVerification = async () => {
    if (!email) {
      setError("이메일을 입력해주세요")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Check email availability first
      const availabilityResult = await AuthService.checkEmailAvailability(email)
      if (!availabilityResult.success) {
        setError(availabilityResult.message)
        setIsLoading(false)
        return
      }

      // Request verification code
      const result = await AuthService.requestVerificationCode(email)
      if (result.success) {
        setSuccess("인증코드가 이메일로 전송되었습니다")
        onShowVerificationInput(true)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError("인증코드를 입력해주세요")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await AuthService.verifyCode(email, verificationCode)
      if (result.success) {
        setSuccess("이메일 인증이 완료되었습니다")
        onVerificationComplete(true)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <InputField
          id="email"
          type="email"
          label="이메일"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={disabled || showVerificationInput}
          error={error && !showVerificationInput ? error : ""}
          icon={
            <>
              <Mail className="h-4 w-4" />
              {isVerified && <Shield className="h-4 w-4 text-green-600" />}
            </>
          }
          className="flex-1"
        />
        {!showVerificationInput && (
          <Button
            type="button"
            onClick={handleRequestVerification}
            disabled={isLoading || !email || disabled}
            className="mt-8"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            인증요청
          </Button>
        )}
      </div>

      {showVerificationInput && (
        <div className="flex gap-2">
          <InputField
            id="verificationCode"
            type="text"
            label="인증코드"
            placeholder="6자리 인증코드를 입력하세요"
            value={verificationCode}
            onChange={(e) => onVerificationCodeChange(e.target.value)}
            disabled={disabled || isVerified}
            maxLength={6}
            error={error && showVerificationInput ? error : ""}
            helperText={success}
            className="flex-1"
          />
          {!isVerified && (
            <Button
              type="button"
              onClick={handleVerifyCode}
              disabled={isLoading || !verificationCode || disabled}
              className="mt-8"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              인증확인
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
