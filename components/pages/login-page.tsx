import { AuthTemplate } from "@/components/templates/auth-template"
import { LoginForm } from "@/components/organisms/login-form"

export function LoginPage() {
  return (
    <AuthTemplate title="로그인" description="이메일과 비밀번호를 입력하세요" mode="login">
      <LoginForm />
    </AuthTemplate>
  )
}
