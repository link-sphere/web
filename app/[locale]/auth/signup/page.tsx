import { SignupForm } from "@/features/auth/components/organisms/signup-form";
import { AuthTemplate } from "@/features/auth/components/templates/auth-template";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const t = useTranslations("auth.signup");
  return (
    <AuthTemplate title={t("title")} description={t("desc")} mode="signup">
      <SignupForm />
    </AuthTemplate>
  );
}
