import { useTranslations } from "next-intl";
import { AuthTemplate } from "@/components/auth/templates/auth-template";
import { SignupForm } from "@/components/auth/organisms/signup-form";

export default function SignupPage() {
  const t = useTranslations("auth.signup");
  return (
    <AuthTemplate title={t("title")} description={t("desc")} mode="signup">
      <SignupForm />
    </AuthTemplate>
  );
}
