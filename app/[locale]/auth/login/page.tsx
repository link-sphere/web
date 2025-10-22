import { useTranslations } from "next-intl";
import { AuthTemplate } from "@/components/templates/auth-template";
import { LoginForm } from "@/components/organisms/login-form";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  return (
    <AuthTemplate title={t("title")} description={t("desc")} mode="login">
      <LoginForm />
    </AuthTemplate>
  );
}
