"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function DisputeResolutionPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("agreement.dispute");

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2"></div>
        <h2 className="text-sm font-medium">{t("title")}</h2>
        <button
          onClick={() => router.push(`/${locale}`)}
          aria-label={t("home")}
          className="flex items-center gap-1 text-sm text-neutral-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M12.9997 13.8666V22.5332M12.9997 3.8999L4.33301 10.4604V22.5332H21.6663V10.672L12.9997 3.8999Z"
              stroke="black"
            />
          </svg>
        </button>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[780px] text-[13px] px-4 py-12 font-pretendard text-neutral-700">
        {locale === "ko" ? <KoreanDispute t={t} /> : <EnglishDispute t={t} />}
      </main>
    </div>
  );
}

function KoreanDispute({ t }: { t: any }) {
  return (
    <div>
      <h2 className="text-[15px] font-semibold mb-4">{t("chapter1.title")}</h2>
      <p className="mt-1 whitespace-pre-line">{t("chapter1.content")}</p>

      <h2 className="text-[15px] font-semibold mt-8">{t("chapter2.title")}</h2>
      <p className="mt-1 whitespace-pre-line">{t("chapter2.content")}</p>

      <h2 className="text-[15px] font-semibold mt-8">{t("chapter3.title")}</h2>
      <p className="mt-1 whitespace-pre-line">{t("chapter3.content")}</p>

      <h2 className="text-[15px] font-semibold mt-8">{t("addendum.title")}</h2>
      <p className="mt-1 whitespace-pre-line">{t("addendum.content")}</p>
    </div>
  );
}

function EnglishDispute({ t }: { t: any }) {
  return (
    <div>
      <h2 className="text-[15px] font-semibold mb-4">{t("chapter1.title")}</h2>
      <p className="mt-1 whitespace-pre-line">{t("chapter1.content")}</p>

      <h2 className="text-[15px] font-semibold mt-8">{t("chapter2.title")}</h2>
      <p className="mt-1 whitespace-pre-line">{t("chapter2.content")}</p>

      <h2 className="text-[15px] font-semibold mt-8">{t("chapter3.title")}</h2>
      <p className="mt-1 whitespace-pre-line">{t("chapter3.content")}</p>

      <h2 className="text-[15px] font-semibold mt-8">{t("addendum.title")}</h2>
      <p className="mt-1 whitespace-pre-line">{t("addendum.content")}</p>
    </div>
  );
}
