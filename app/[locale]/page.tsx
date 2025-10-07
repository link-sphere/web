"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "@/components/layout/user-menu";
import Image from "next/image";

interface LocaleParams {
  params: {
    locale: "ko" | "en";
  };
}

export default function HomePage({ params }: LocaleParams) {
  const { locale } = params;
  const { isAuthenticated, isLoading } = useAuth();

  const t = {
    ko: {
      brand: "Postio",
      heroTitle: "한 곳에서 끝내는",
      heroSubtitle: "소셜 퍼블리싱 & 스케줄링",
      heroDesc:
        "인스타그램·X·페이스북 등 여러 채널을 안전하게 연결하고, 초안 작성→팀 승인→예약 발행→성과 리포트까지 간편하게 관리하세요.",
      start: "시작하기",
      login: "로그인",
      loggedInTitle: "환영합니다!",
      loggedInDesc: "성공적으로 로그인되었습니다. 오른쪽 위 사용자 메뉴에서 계정을 관리하세요.",
      features: [
        {
          icon: Shield,
          title: "안전한 계정 연결",
          desc: "OAuth로 소셜 채널을 안전하게 연동하고, 만료 토큰 자동 갱신과 최소 권한으로 브랜드 계정을 보호합니다.",
        },
        {
          icon: Users,
          title: "팀 협업 & 승인 워크플로",
          desc: "초안 작성 → 리뷰 → 승인까지 역할별 권한으로 협업하고, 댓글·멘션으로 피드백을 빠르게 모읍니다.",
        },
        {
          icon: Zap,
          title: "자동 스케줄링 & 큐",
          desc: "멀티채널 예약 발행, 최적 발행 시각 추천, 반복 큐로 콘텐츠를 꾸준히 게시해 도달률을 높입니다.",
        },
      ],
      footer: {
        copy: "© LeeLoad ALL RIGHTS RESERVED",
        info: "리로드(LeeLoad) | 대표자 : 이승렬 | 주소 : 서울특별시 동일로 225길 25 1109동 905호 | 호스팅사업자 : 리로드(LeeLoad) | 사업자등록번호 : 843-14-03075",
        policy: "개인정보처리방침",
        terms: "이용약관",
        dispute: "분쟁해결기준",
      },
    },
    en: {
      brand: "Postio",
      heroTitle: "All-in-one",
      heroSubtitle: "Social Publishing & Scheduling",
      heroDesc:
        "Connect Instagram, X, Facebook and more securely. Manage your entire workflow from draft → team approval → scheduled publishing → performance reports.",
      start: "Sign up",
      login: "Sign in",
      loggedInTitle: "Welcome!",
      loggedInDesc:
        "You’re successfully logged in. Manage your account from the user menu at the top right.",
      features: [
        {
          icon: Shield,
          title: "Secure Account Linking",
          desc: "Safely connect social channels via OAuth, auto-refresh expired tokens, and protect brand accounts with least privilege access.",
        },
        {
          icon: Users,
          title: "Team Collaboration & Approval",
          desc: "Collaborate by roles from draft to approval. Gather feedback quickly using comments and mentions.",
        },
        {
          icon: Zap,
          title: "Auto Scheduling & Queue",
          desc: "Schedule posts across channels, get smart timing suggestions, and keep your feed active with recurring queues.",
        },
      ],
      footer: {
        copy: "© LeeLoad ALL RIGHTS RESERVED",
        info: "LeeLoad | CEO: Seung-Ryul Lee | Address: #905, Building 1109, 25, Dongil-ro 227-gil, Seoul, Republic of Korea | Hosting: LeeLoad | Business Reg. No: 843-14-03075",
        policy: "Privacy Policy",
        terms: "Terms of Service",
        dispute: "Dispute Resolution",
      },
    },
  }[locale];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <Image src="/logo.png" alt={t.brand} width={40} height={40} />
            <span className="text-xl font-bold">{t.brand}</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <Link href={`/${locale}/auth/login`}>
                  <Button variant="ghost">{t.login}</Button>
                </Link>
                <Link href={`/${locale}/auth/signup`}>
                  <Button>{t.start}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            {isAuthenticated ? (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-balance">
                  {t.loggedInTitle}
                  <br />
                  <span className="text-muted-foreground">{t.login} 완료</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                  {t.loggedInDesc}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-balance">
                  {t.heroTitle}
                  <br />
                  <span className="text-muted-foreground">{t.heroSubtitle}</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                  {t.heroDesc}
                </p>
              </>
            )}
          </div>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/auth/signup`}>
                <Button size="lg" className="w-full sm:w-auto">
                  {t.start}
                </Button>
              </Link>
              <Link href={`/${locale}/auth/login`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  {t.login}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {t.features.map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24 text-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <div>
            <p>{t.footer.copy}</p>
            <p>{t.footer.info}</p>
            <div className="flex gap-2 justify-center">
              <Link href={`/${locale}/agreement/privacy-policy`}>{t.footer.policy}</Link>
              <span>·</span>
              <Link href={`/${locale}/agreement/service`}>{t.footer.terms}</Link>
              <span>·</span>
              <Link href={`/${locale}/agreement/dispute-resolution`}>{t.footer.dispute}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
