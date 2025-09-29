import { AuthTemplate } from "@/components/templates/auth-template"
import { SignupForm } from "@/components/organisms/signup-form"

export function SignupPage() {
  return (
    <AuthTemplate title="회원가입" description="이메일 인증 후 비밀번호를 설정하세요" mode="signup">
      <SignupForm />
    </AuthTemplate>
  )
}
