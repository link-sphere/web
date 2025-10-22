"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "@/components/layout/user-menu";
import Image from "next/image";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations("home");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt={t("brand")} width={40} height={40} />
            <span className="text-xl font-bold">{t("brand")}</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost">{t("login")}</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>{t("start")}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {isAuthenticated ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">{t("loggedInTitle")}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                {t("loggedInDesc")}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                {t("heroTitle")}
                <br />
                <span className="text-muted-foreground">{t("heroSubtitle")}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                {t("heroDesc")}
              </p>
            </>
          )}

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  {t("start")}
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  {t("login")}
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: t("features.secure") },
            { icon: Users, title: t("features.collab") },
            { icon: Zap, title: t("features.schedule") },
          ].map(({ icon: Icon, title }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{title}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border mt-24 text-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>{t("footer.copy")}</p>
          <p>{t("footer.info")}</p>
          <div className="flex gap-2 justify-center">
            <Link href="/agreement/privacy-policy">{t("footer.policy")}</Link>
            <span>·</span>
            <Link href="/agreement/service">{t("footer.terms")}</Link>
            <span>·</span>
            <Link href="/agreement/dispute-resolution">{t("footer.dispute")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
