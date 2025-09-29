"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface AuthTemplateProps {
  title: string
  description: string
  children: React.ReactNode
  mode: "login" | "signup"
}

export function AuthTemplate({ title, description, children, mode }: AuthTemplateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">{title}</CardTitle>
          <CardDescription className="text-center text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}

          <div className="mt-6 space-y-4">
            {mode === "login" && (
              <div className="text-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  계정이 없으신가요?{" "}
                  <Link href="/auth/signup" className="text-foreground hover:underline font-medium">
                    회원가입
                  </Link>
                </>
              ) : (
                <>
                  이미 계정이 있으신가요?{" "}
                  <Link href="/auth/login" className="text-foreground hover:underline font-medium">
                    로그인
                  </Link>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
