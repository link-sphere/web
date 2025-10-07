"use client";

import { useRouter } from "next/navigation";

interface LocaleParams {
  params: { locale: "ko" | "en" };
}

export default function ServicePage({ params }: LocaleParams) {
  const router = useRouter();
  const { locale } = params;

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2"></div>
        <h2 className="text-sm font-medium">
          {locale === "ko" ? "서비스 이용약관" : "Terms of Service"}
        </h2>
        <button
          onClick={() => router.push(`/${locale}`)}
          aria-label={locale === "ko" ? "홈으로 이동" : "Go to Home"}
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

      {/* Main */}
      <main className="flex justify-center px-4 py-10">
        <article className="w-full max-w-[780px] text-[13px] leading-relaxed text-neutral-800">
          {locale === "ko" ? <KoreanTerms /> : <EnglishTerms />}
        </article>
      </main>
    </div>
  );
}

function KoreanTerms() {
  return (
    <>
      {/* 제1장 총칙 */}
      <h2 className="text-[15px] font-semibold">제1장 총칙</h2>

      <h3 className="mt-4 font-semibold">제1조 (목적)</h3>
      <p className="mt-1">
        본 약관은 <strong>리로드(LeeLoad)</strong> (이하 “회사”)가 운영하는 소셜 미디어 통합 관리
        플랫폼 (이하 “서비스”)의 이용 조건 및 절차, 회사와 회원 간의 권리·의무 및 책임사항, 기타
        필요한 사항을 규정함을 목적으로 합니다.
      </p>

      <h3 className="mt-4 font-semibold">제2조 (정의)</h3>
      <ol className="list-decimal pl-5 space-y-1 mt-1">
        <li>
          “서비스”라 함은 회사가 제공하는 소셜 미디어 계정 연동, 게시물 작성·예약·배포, 분석·통계,
          댓글 및 메시지 관리 등 일체의 기능을 말합니다.
        </li>
        <li>
          “회원”이라 함은 본 약관에 동의하고 회사와 이용계약을 체결하여 서비스를 이용하는 자를
          말합니다.
        </li>
        <li>
          “비회원”이라 함은 회원가입을 하지 않고 회사가 제공하는 일부 서비스를 이용하는 자를
          말합니다.
        </li>
        <li>
          “연동 계정”이라 함은 회원이 서비스와 연결한 제3자 소셜 미디어 플랫폼의 계정을 의미합니다.
        </li>
        <li>
          “콘텐츠”라 함은 회원이 서비스에 등록하거나, 서비스와 연동된 플랫폼을 통해 등록·전송하는
          텍스트, 이미지, 영상, 데이터 등을 말합니다.
        </li>
      </ol>

      {/* 제2장 */}
      <h2 className="mt-8 text-[15px] font-semibold">제2장 서비스 이용계약</h2>

      <h3 className="mt-4 font-semibold">제3조 (이용계약의 성립)</h3>
      <p className="mt-1">
        ① 서비스 이용계약은 회원이 본 약관에 동의하고, 회사가 정한 절차에 따라 가입을 완료한 시점에
        성립합니다.
        <br />
        ② 회원은 반드시 본인의 정보를 제공해야 하며, 타인의 명의나 허위 정보를 기재할 수 없습니다.
        <br />③ 만 14세 미만의 이용자는 회원가입이 제한됩니다.
      </p>

      <h3 className="mt-4 font-semibold">제4조 (서비스의 제공 및 변경)</h3>
      <p className="mt-1">① 회사는 회원에게 다음 각 호의 서비스를 제공합니다.</p>
      <ol className="list-decimal pl-5 mt-1 space-y-1">
        <li>소셜 미디어 계정 연동 및 통합 관리</li>
        <li>게시물 예약 등록 및 배포</li>
        <li>소셜 미디어 분석·통계 제공</li>
        <li>댓글, 메시지 등의 관리 기능</li>
        <li>기타 회사가 정하는 부가 서비스</li>
      </ol>
      <p className="mt-2">
        ② 회사는 서비스 개선을 위해 서비스의 내용을 변경할 수 있으며, 중대한 변경이 있는 경우 사전에
        공지합니다.
      </p>

      <h3 className="mt-4 font-semibold">제5조 (서비스의 중단)</h3>
      <p className="mt-1">
        ① 회사는 천재지변, 시스템 장애, 제휴 플랫폼(API 제공자)의 정책 변경 등 불가피한 사유가
        발생할 경우 서비스 제공을 일시적으로 중단할 수 있습니다.
        <br />② 회사는 제1항의 사유로 인한 회원의 손해에 대하여 회사의 고의 또는 중대한 과실이 없는
        한 책임을 부담하지 않습니다.
      </p>

      {/* 제3장 */}
      <h2 className="mt-8 text-[15px] font-semibold">제3장 회원의 권리와 의무</h2>

      <h3 className="mt-4 font-semibold">제6조 (회원의 의무)</h3>
      <p className="mt-1">회원은 다음 행위를 해서는 안 됩니다.</p>
      <ul className="list-disc pl-5 mt-1 space-y-1">
        <li>타인의 계정정보를 도용하거나 허위 정보를 기재하는 행위</li>
        <li>저작권, 상표권 등 제3자의 지식재산권을 침해하는 행위</li>
        <li>불법적이거나 음란·폭력적·차별적인 콘텐츠를 게시 또는 전송하는 행위</li>
        <li>서비스의 보호 조치를 무력화하거나 자동화된 수단으로 비정상 이용하는 행위</li>
        <li>회사 사전 동의 없이 서비스 데이터를 무단 복제·배포·판매하는 행위</li>
      </ul>

      <h3 className="mt-4 font-semibold">제7조 (회원의 계정 관리)</h3>
      <p className="mt-1">
        ① 회원은 자신의 계정(ID 및 비밀번호)을 직접 관리할 책임이 있으며, 이를 제3자에게
        양도·대여하거나 공유할 수 없습니다.
        <br />② 회원의 과실로 인한 계정 유출, 무단 사용에 대해서는 회원 본인이 책임을 집니다.
      </p>

      {/* 제4장 */}
      <h2 className="mt-8 text-[15px] font-semibold">제4장 데이터 및 지식재산권</h2>

      <h3 className="mt-4 font-semibold">제8조 (콘텐츠의 권리)</h3>
      <p className="mt-1">
        ① 회원이 서비스에 업로드하거나 연동 계정을 통해 제공하는 콘텐츠의 저작권은 원칙적으로 회원
        본인에게 귀속됩니다.
        <br />
        ② 다만, 회사는 서비스 제공, 개선, 홍보를 위하여 필요한 범위 내에서 해당 콘텐츠를
        복제·편집·전송·저장·배포할 수 있습니다.
        <br />③ 회원은 자신이 제공하는 콘텐츠가 제3자의 권리를 침해하지 않음을 보장해야 하며, 침해로
        인한 분쟁의 책임은 회원 본인에게 있습니다.
      </p>

      <h3 className="mt-4 font-semibold">제9조 (서비스 데이터 이용)</h3>
      <p className="mt-1">
        ① 회사는 회원의 서비스 이용 과정에서 생성되는 데이터(이용 로그, 통계 자료 등)를 서비스 개선
        및 신규 서비스 개발 목적으로 활용할 수 있습니다.
        <br />② 회사는 회원의 동의 없이는 개인을 특정할 수 없는 범위를 넘어 개인정보를 활용하지
        않습니다.
      </p>

      {/* 제5장 */}
      <h2 className="mt-8 text-[15px] font-semibold">제5장 계약 해지 및 이용 제한</h2>

      <h3 className="mt-4 font-semibold">제10조 (회원 탈퇴)</h3>
      <p className="mt-1">
        ① 회원은 언제든지 서비스 내 탈퇴 절차를 통해 이용계약을 해지할 수 있습니다.
        <br />② 회원 탈퇴 시 서비스에 저장된 데이터 및 콘텐츠는 즉시 삭제되며, 복구되지 않습니다.
      </p>

      <h3 className="mt-4 font-semibold">제11조 (이용 제한 및 자격 상실)</h3>
      <p className="mt-1">
        ① 회사는 회원이 본 약관을 위반한 경우 서비스 이용을 제한하거나 회원 자격을 상실시킬 수
        있습니다.
        <br />② 회사는 제휴 플랫폼(API 제공자)의 정책 위반, 불법 행위, 타인의 권리 침해가 확인된
        경우 즉시 계정을 정지할 수 있습니다.
      </p>

      {/* 제6장 */}
      <h2 className="mt-8 text-[15px] font-semibold">제6장 기타</h2>

      <h3 className="mt-4 font-semibold">제12조 (면책 조항)</h3>
      <p className="mt-1">
        ① 회사는 회원이 연동한 제3자 플랫폼(Facebook, Instagram, TikTok 등)의 API 정책 변경, 장애,
        제한으로 인한 문제에 대해 책임을 지지 않습니다.
        <br />② 회사는 회원 간 또는 회원과 제3자 간 분쟁에 개입하지 않으며, 해당 분쟁으로 발생한
        손해에 대해 책임을 지지 않습니다.
      </p>

      <h3 className="mt-4 font-semibold">제13조 (광고 및 정보 제공)</h3>
      <p className="mt-1">
        회사는 서비스 운영과 관련하여 이메일, SMS, 푸시 알림 등을 통해 서비스 관련 공지 및 광고를
        제공할 수 있습니다. 다만, 회원은 수신을 거부할 수 있습니다.
      </p>

      <h3 className="mt-4 font-semibold">제14조 (준거법 및 관할법원)</h3>
      <p className="mt-1">
        본 약관은 대한민국 법령에 따르며, 서비스와 관련하여 발생한 분쟁에 대하여는 민사소송법에 따른
        법원을 관할법원으로 합니다.
      </p>

      {/* 부칙 */}
      <h2 className="mt-8 text-[15px] font-semibold">[부칙]</h2>
      <p className="mt-1">본 약관은 2025년 9월 29일부터 시행합니다.</p>
    </>
  );
}

function EnglishTerms() {
  return (
    <>
      <h1 className="text-[15px] font-semibold">Terms of Service</h1>

      <h2 className="mt-4 font-semibold">Chapter 1. General Provisions</h2>

      <h3 className="mt-4 font-semibold">Article 1 (Purpose)</h3>
      <p className="mt-1">
        These Terms of Service (“Terms”) set forth the conditions and procedures for the use of the
        social media integration and management platform operated by{" "}
        <strong>LeeLoad Co., Ltd.</strong> (the “Company”), as well as the rights, obligations, and
        responsibilities of the Company and Members, and any other necessary matters.
      </p>

      <h3 className="mt-4 font-semibold">Article 2 (Definitions)</h3>
      <ol className="list-decimal pl-5 space-y-1 mt-1">
        <li>
          “Service” means all functions provided by the Company, including social media account
          integration, content creation, scheduling and publishing, analytics and statistics, and
          comment and message management.
        </li>
        <li>
          “Member” means any individual who agrees to these Terms, enters into a service contract
          with the Company, and uses the Service.
        </li>
        <li>
          “Non-Member” means any individual who uses certain services provided by the Company
          without registering as a Member.
        </li>
        <li>
          “Linked Account” means a third-party social media account that a Member connects to the
          Service.
        </li>
        <li>
          “Content” means text, images, videos, data, or other material uploaded by a Member to the
          Service or transmitted through a Linked Account.
        </li>
      </ol>

      <h2 className="mt-8 text-[15px] font-semibold">Chapter 2. Service Agreement</h2>

      <h3 className="mt-4 font-semibold">Article 3 (Formation of Agreement)</h3>
      <p className="mt-1">
        1. A service agreement is deemed established when a prospective Member agrees to these Terms
        and completes the registration process as prescribed by the Company.
        <br />
        2. Members must provide accurate personal information; use of another person’s identity or
        false information is strictly prohibited.
        <br />
        3. Individuals under the age of 14 are not permitted to register.
      </p>

      <h3 className="mt-4 font-semibold">Article 4 (Provision and Modification of Services)</h3>
      <p className="mt-1">1. The Company provides Members with the following services:</p>
      <ol className="list-decimal pl-5 mt-1 space-y-1">
        <li>Integration and unified management of social media accounts</li>
        <li>Scheduling and publishing of posts</li>
        <li>Social media analytics and statistics</li>
        <li>Management of comments, messages, and related interactions</li>
        <li>Other ancillary services determined by the Company</li>
      </ol>
      <p className="mt-2">
        2. The Company may modify the content of the Service for improvement purposes, and in the
        event of significant changes, prior notice shall be provided.
      </p>

      <h3 className="mt-4 font-semibold">Article 5 (Suspension of Services)</h3>
      <p className="mt-1">
        1. The Company may temporarily suspend the Service in the event of force majeure, system
        failures, or changes in third-party platform policies (e.g., API providers).
        <br />
        2. The Company shall not be liable for damages resulting from such suspension unless caused
        by willful misconduct or gross negligence on the part of the Company.
      </p>

      <h2 className="mt-8 text-[15px] font-semibold">
        Chapter 3. Rights and Obligations of Members
      </h2>

      <h3 className="mt-4 font-semibold">Article 6 (Obligations of Members)</h3>
      <ul className="list-disc pl-5 mt-1 space-y-1">
        <li>Using another person’s account information or providing false information</li>
        <li>
          Infringing upon intellectual property rights of third parties, including copyrights and
          trademarks
        </li>
        <li>Uploading or transmitting illegal, obscene, violent, or discriminatory Content</li>
        <li>
          Circumventing technical protection measures of the Service or using automated tools (e.g.,
          crawlers, macros) to abuse the Service
        </li>
        <li>
          Copying, distributing, or selling Service data without prior authorization from the
          Company
        </li>
      </ul>

      <h3 className="mt-4 font-semibold">Article 7 (Account Management)</h3>
      <p className="mt-1">
        1. Members are solely responsible for managing their own account credentials (ID and
        password) and may not transfer, lend, or share them with third parties.
        <br />
        2. Members shall be liable for any damages arising from account leaks or unauthorized use
        due to their own negligence.
      </p>

      <h2 className="mt-8 text-[15px] font-semibold">Chapter 4. Data and Intellectual Property</h2>

      <h3 className="mt-4 font-semibold">Article 8 (Rights to Content)</h3>
      <p className="mt-1">
        1. Copyright in Content uploaded by Members to the Service or transmitted through Linked
        Accounts shall remain with the respective Member.
        <br />
        2. However, the Company may reproduce, edit, transmit, store, or distribute such Content
        within the scope necessary for providing, improving, or promoting the Service.
        <br />
        3. Members represent and warrant that their Content does not infringe upon third-party
        rights, and they shall be solely responsible for any disputes arising therefrom.
      </p>

      <h3 className="mt-4 font-semibold">Article 9 (Use of Service Data)</h3>
      <p className="mt-1">
        1. The Company may use data generated in the course of Service use (e.g., usage logs,
        statistical data) for the purposes of improving the Service or developing new services.
        <br />
        2. The Company shall not use personal data beyond the scope necessary to identify an
        individual without the Member’s prior consent.
      </p>

      <h2 className="mt-8 text-[15px] font-semibold">Chapter 5. Termination and Restrictions</h2>

      <h3 className="mt-4 font-semibold">Article 10 (Withdrawal by Members)</h3>
      <p className="mt-1">
        1. Members may terminate their service agreement at any time through the withdrawal
        procedure provided in the Service.
        <br />
        2. Upon withdrawal, all stored data and Content associated with the Member shall be
        immediately deleted and cannot be restored.
      </p>

      <h3 className="mt-4 font-semibold">
        Article 11 (Restrictions and Termination of Membership)
      </h3>
      <p className="mt-1">
        1. The Company may restrict Service use or terminate membership if a Member violates these
        Terms.
        <br />
        2. The Company may immediately suspend an account if violations of third-party platform
        policies (e.g., API providers), illegal activities, or infringement of others’ rights are
        confirmed.
      </p>

      <h2 className="mt-8 text-[15px] font-semibold">Chapter 6. Miscellaneous</h2>

      <h3 className="mt-4 font-semibold">Article 12 (Disclaimer)</h3>
      <p className="mt-1">
        1. The Company shall not be liable for issues arising from changes, outages, or restrictions
        in third-party platforms (e.g., Buffer, Facebook, Instagram, TikTok) connected via APIs.
        <br />
        2. The Company shall not intervene in disputes between Members or between Members and third
        parties, nor shall it be liable for damages arising from such disputes.
      </p>

      <h3 className="mt-4 font-semibold">Article 13 (Advertising and Notifications)</h3>
      <p className="mt-1">
        The Company may provide Members with service-related notices or advertisements via email,
        SMS, push notifications, or other means. Members may opt out of receiving such
        communications.
      </p>

      <h3 className="mt-4 font-semibold">Article 14 (Governing Law and Jurisdiction)</h3>
      <p className="mt-1">
        These Terms shall be governed by the laws of the Republic of Korea. Any disputes arising in
        connection with the Service shall be subject to the jurisdiction of the competent court
        under the Civil Procedure Act of Korea.
      </p>

      <h2 className="mt-8 text-[15px] font-semibold">[Supplementary Provisions]</h2>
      <p className="mt-1">These Terms of Service shall take effect as of September 29, 2025.</p>
    </>
  );
}
