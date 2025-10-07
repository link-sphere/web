import { ForgotPasswordForm } from "@/components/molecules/forgot-password-form";

interface LocaleParams {
  params: { locale: "ko" | "en" };
}

export default function ForgotPasswordPage({ params }: LocaleParams) {
  const { locale } = params;
  return <ForgotPasswordForm locale={locale} />;
}
