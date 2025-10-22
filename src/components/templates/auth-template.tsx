"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations, useLocale } from "next-intl";

interface AuthTemplateProps {
  title: string;
  description: string;
  mode: "login" | "signup";
  children: React.ReactNode;
}

export function AuthTemplate({ title, description, mode, children }: AuthTemplateProps) {
  const t = useTranslations("auth.template");
  const locale = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">{title}</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
          <div className="mt-6 space-y-4">
            {mode === "login" && (
              <div className="text-center">
                <Link href={`/${locale}/auth/forgot-password`} className="text-sm hover:underline">
                  {t("forgot")}
                </Link>
              </div>
            )}
            <div className="text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  {t("noAccount")}{" "}
                  <Link href={`/${locale}/auth/signup`} className="hover:underline font-medium">
                    {t("signup")}
                  </Link>
                </>
              ) : (
                <>
                  {t("hasAccount")}{" "}
                  <Link href={`/${locale}/auth/login`} className="hover:underline font-medium">
                    {t("login")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
