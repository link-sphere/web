"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "@/components/layout/user-menu";
import Image from "next/image";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Postio" width={40} height={40} />
            <span className="text-xl font-bold">Postio</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost">로그인</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>회원가입</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            {isAuthenticated ? (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-balance">
                  환영합니다!
                  <br />
                  <span className="text-muted-foreground">로그인 완료</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                  성공적으로 로그인되었습니다. 오른쪽 위 사용자 메뉴에서 계정을 관리하세요.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-balance">
                  한 곳에서 끝내는
                  <br />
                  <span className="text-muted-foreground">소셜 퍼블리싱 & 스케줄링</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                  인스타그램·X·페이스북 등 여러 채널을 안전하게 연결하고, 초안 작성→팀 승인→예약
                  발행→성과 리포트까지 간편하게 관리하세요.
                </p>
              </>
            )}
          </div>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  시작하기
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  로그인
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>안전한 계정 연결</CardTitle>
              <CardDescription>
                OAuth로 소셜 채널을 안전하게 연동하고, 만료 토큰 자동 갱신과 최소 권한으로 브랜드
                계정을 보호합니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>팀 협업 & 승인 워크플로</CardTitle>
              <CardDescription>
                초안 작성 → 리뷰 → 승인까지 역할별 권한으로 협업하고, 댓글·멘션으로 피드백을 빠르게
                모읍니다.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>자동 스케줄링 & 큐</CardTitle>
              <CardDescription>
                멀티채널 예약 발행, 최적 발행 시각 추천, 반복 큐로 콘텐츠를 꾸준히 게시해 도달률을
                높입니다.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 new. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
