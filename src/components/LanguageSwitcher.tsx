// src/components/LanguageSwitcher.tsx

"use client";

import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

const locales = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLang = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPath = segments.join("/") || "/";

    Cookies.set("lang", locale, { expires: 365 });

    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => changeLang(l.code)}
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
