import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 지원하는 언어 목록
const SUPPORTED_LOCALES = ["ko", "en"];
const DEFAULT_LOCALE = "ko";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (SUPPORTED_LOCALES.some((loc) => pathname.startsWith(`/${loc}`))) {
    return NextResponse.next();
  }

  const cookieLocale = req.cookies.get("lang")?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${cookieLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const acceptLang = req.headers.get("accept-language");
  let detectedLocale = DEFAULT_LOCALE;

  if (acceptLang) {
    const lang = acceptLang.split(",")[0].split("-")[0];
    if (SUPPORTED_LOCALES.includes(lang)) {
      detectedLocale = lang;
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|logo.png|images|fonts|.*\\.svg$).*)"],
};