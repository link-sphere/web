import { LoginForm } from "@/features/auth/components/organisms/login-form";
import { AuthTemplate } from "@/features/auth/components/templates/auth-template";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  return (
    <AuthTemplate title={t("title")} description={t("desc")} mode="login">
      <LoginForm />
    </AuthTemplate>
  );
}
