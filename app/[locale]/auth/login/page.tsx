// app/[locale]/auth/login/page.tsx
import { AuthTemplate } from "@/components/templates/auth-template";
import { LoginForm } from "@/components/organisms/login-form";

interface LocaleParams {
  params: { locale: "ko" | "en" };
}

export default function LoginPage({ params }: LocaleParams) {
  const { locale } = params;

  const t =
    locale === "ko"
      ? {
          title: "로그인",
          description: "이메일과 비밀번호를 입력하세요",
          mode: "login" as const,
        }
      : {
          title: "Sign In",
          description: "Enter your email and password",
          mode: "login" as const,
        };

  return (
    <AuthTemplate title={t.title} description={t.description} mode={t.mode} locale={locale}>
      <LoginForm locale={locale} />
    </AuthTemplate>
  );
}
