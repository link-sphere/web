"use client"

import { AuthTemplate } from "@/components/templates/auth-template"
import { LoginForm } from "@/components/organisms/login-form"
import { SignupForm } from "@/components/organisms/signup-form"

interface AuthFormProps {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const title = mode === "login" ? "로그인" : "회원가입"
  const description = mode === "login" ? "이메일과 비밀번호를 입력하세요" : "이메일 인증 후 비밀번호를 설정하세요"

  return (
    <AuthTemplate title={title} description={description} mode={mode}>
      {mode === "login" ? <LoginForm /> : <SignupForm />}
    </AuthTemplate>
  )
}
