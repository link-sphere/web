import { ChangePasswordForm } from "@/components/molecules/change-password-form";

interface LocaleParams {
  params: { locale: "ko" | "en" };
}

export default function ChangePasswordPage({ params }: LocaleParams) {
  return <ChangePasswordForm locale={params.locale} />;
}
