// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 영어/한국어 지원
const SUPPORTED_LOCALES = ["ko", "en"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ 1. 정적 리소스나 API 요청은 제외
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(png|jpg|jpeg|svg|ico|gif|webp|woff2?|txt|xml|json)$/)
  ) {
    return NextResponse.next();
  }

  // ✅ 2. 이미 /ko 또는 /en 경로면 그대로 통과
  if (SUPPORTED_LOCALES.some((loc) => pathname.startsWith(`/${loc}`))) {
    return NextResponse.next();
  }

  // ✅ 3. 한국 IP면 /ko로 redirect
  const country = req.geo?.country?.toLowerCase();
  if (country === "kr") {
    const url = req.nextUrl.clone();
    url.pathname = `/ko${pathname}`;
    return NextResponse.redirect(url);
  }

  // ✅ 4. 그 외 국가는 영어 페이지 (/en)로 redirect
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|fonts|.*\\.svg$).*)"],
};
