"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EmailVerificationField } from "@/components/molecules/email-verification-field"
import { PasswordConfirmationField } from "@/components/molecules/password-confirmation-field"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [showVerificationInput, setShowVerificationInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      setError("모든 필드를 입력해주세요")
      return
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다")
      return
    }

    if (!isEmailVerified) {
      setError("이메일 인증을 완료해주세요")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await signup(email, password)
      if (result.success) {
        setSuccess(result.message)
        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = isEmailVerified && password && confirmPassword && password === confirmPassword

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
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        회원가입
      </Button>
    </form>
  )
}
