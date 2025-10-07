import { AuthTemplate } from "@/components/templates/auth-template";
import { SignupForm } from "@/components/organisms/signup-form";

interface LocaleParams {
  params: { locale: "ko" | "en" };
}

export default function SignupPage({ params }: LocaleParams) {
  const { locale } = params;

  const t =
    locale === "ko"
      ? {
          title: "회원가입",
          description: "이메일 인증 후 비밀번호를 설정하세요",
          mode: "signup" as const,
        }
      : {
          title: "Sign Up",
          description: "Verify your email and set your password",
          mode: "signup" as const,
        };

  return (
    <AuthTemplate title={t.title} description={t.description} mode={t.mode} locale={locale}>
      <SignupForm locale={locale} />
    </AuthTemplate>
  );
}
