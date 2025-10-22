// app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Postio",
  description: "새로운 프로젝트",
  generator: "dayelee",
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      {children}
      <Analytics />
    </NextIntlClientProvider>
  );
}
