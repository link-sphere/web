"use client";

import { useRouter } from "next/navigation";

interface LocaleParams {
  params: { locale: "ko" | "en" };
}

export default function DisputeResolutionPage({ params }: LocaleParams) {
  const router = useRouter();
  const { locale } = params;

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2"></div>
        <h2 className="text-sm font-medium">
          {locale === "ko" ? "분쟁해결기준" : "Dispute Resolution Policy"}
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

      {/* Content */}
      <main className="mx-auto max-w-[780px] text-[13px] px-4 py-12 font-pretendard text-neutral-700">
        {locale === "ko" ? <KoreanDispute /> : <EnglishDispute />}
      </main>
    </div>
  );
}

function KoreanDispute() {
  return (
    <div>
      <h2 className="text-[15px] font-semibold mb-4">제1장 총칙</h2>

      <h3 className="text-[14px] font-semibold mt-6">제1조(목적)</h3>
      <p className="mt-1">
        본 기준은 주식회사 <strong>리로드(LeeLoad)</strong>(이하 “회사”)가 제공하는 소셜 미디어 통합
        관리형 구독 서비스(이하 “서비스”)의 이용과 관련하여, 회사와 이용자 간의 분쟁을 신속하고
        공정하게 해결하기 위한 절차와 기준을 정함을 목적으로 한다.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">제2조(정의)</h3>
      <ol className="list-decimal pl-5 space-y-1 mt-1">
        <li>
          “서비스”란 회사가 제공하는 소셜 미디어 계정 연동, 콘텐츠 예약 게시, 분석 및 통계, 메시지
          관리 등의 기능을 포함한 모든 온라인 구독형 서비스를 말한다.
        </li>
        <li>
          “이용자”란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 사용하는 개인 또는
          법인을 말한다.
        </li>
        <li>
          “구독”이란 이용자가 일정 금액을 결제하고 정해진 기간 동안 서비스를 이용할 수 있도록 하는
          계약을 말한다.
        </li>
        <li>“이용계약”이란 서비스 이용과 관련하여 회사와 이용자 간에 체결된 계약을 말한다.</li>
        <li>
          “분쟁”이란 서비스 이용과 관련하여 회사와 이용자 간에 발생하는 손해배상, 환불, 계약해지
          등에 관한 모든 이견을 말한다.
        </li>
      </ol>

      <h3 className="text-[14px] font-semibold mt-6">제3조(적용범위)</h3>
      <p className="mt-1">
        ① 본 기준은 회사와 이용자 간의 서비스 이용에 관한 분쟁에 적용한다.
        <br />② 본 기준에서 정하지 아니한 사항은 “서비스 이용약관” 및 관계 법령에 따른다.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">제4조(기준의 개정)</h3>
      <p className="mt-1">
        ① 회사는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「콘텐츠산업진흥법」,
        「소비자기본법」 등 관계 법령을 위배하지 않는 범위에서 본 기준을 개정할 수 있다.
        <br />② 개정된 기준은 시행 7일 전까지 서비스 내 공지사항 등을 통해 공지하며, 이용자는 개정
        내용에 동의하지 않을 경우 이용계약을 해지할 수 있다.
      </p>

      <h2 className="text-[15px] font-semibold mt-8">제2장 회사와 이용자 간 분쟁해결기준</h2>

      <h3 className="text-[14px] font-semibold mt-6">제5조(이용계약의 해지 및 환불)</h3>
      <p className="mt-1">
        ① 이용자는 언제든지 서비스 내 해지 절차를 통해 구독 계약을 해지할 수 있다.
        <br />② 환불은 다음 각 호의 기준에 따라 처리한다.
      </p>
      <ol className="list-decimal pl-5 space-y-1 mt-1">
        <li>이용 개시 전: 결제금액 전액 환불</li>
        <li>이용 개시 후 7일 이내: 이용일수 및 사용비용 공제 후 환불</li>
        <li>
          이용 개시 후 7일 경과: 환불 불가 (단, 서비스 장애 등 회사 귀책 사유가 있는 경우에는 예외로
          함)
        </li>
      </ol>
      <p className="mt-2">
        ③ 회사는 환불 사유가 발생한 날로부터 3영업일 이내에 환불 절차를 진행하며, 결제수단에 따라
        처리기간이 달라질 수 있다.
        <br />④ 환불 시, 회사는 「전자상거래 등에서의 소비자보호에 관한 법률 시행령」 제22조에 따른
        결제수단별 환불 절차를 이행한다.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">제6조(서비스 장애 및 회사의 책임)</h3>
      <p className="mt-1">
        ① 회사의 고의 또는 중대한 과실로 인해 서비스가 중단되거나 데이터가 손실된 경우, 회사는
        이용자에게 손해를 배상한다.
        <br />② 다만, 다음 각 호의 사유에 해당하는 경우 회사는 책임을 지지 않는다.
      </p>
      <ol className="list-decimal pl-5 space-y-1 mt-1">
        <li>천재지변, 정전, IDC 장애 등 불가항력적 사유</li>
        <li>이용자의 고의 또는 과실로 인한 장애</li>
        <li>외부 플랫폼(API 제공자 등)의 정책 변경, 접근 제한 등 회사가 통제할 수 없는 사유</li>
      </ol>
      <p className="mt-2">
        ③ 서비스 장애 또는 오류가 24시간 이상 지속되어 이용에 중대한 지장을 초래한 경우, 장애 시간에
        비례하여 이용기간을 연장하거나 환불을 진행한다.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">제7조(데이터 및 계정 관리 책임)</h3>
      <p className="mt-1">
        ① 이용자는 자신의 계정 및 연동된 SNS 계정의 관리 책임을 부담하며, 제3자에게 계정 정보를
        공유하거나 유출한 경우 발생하는 피해에 대해 회사는 책임을 지지 않는다.
        <br />② 회사는 이용자의 데이터 보호를 위해 기술적·관리적 보호조치를 취하며, 보안 침해가
        확인될 경우 즉시 통지하고 필요한 조치를 취한다.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">제8조(손해배상)</h3>
      <p className="mt-1">
        ① 회사 또는 이용자가 본 기준이나 이용약관을 위반하여 상대방에게 손해를 발생시킨 경우, 귀책
        당사자는 그 손해를 배상하여야 한다.
        <br />② 다만, 회사는 서비스의 특성상 데이터 전송지연, SNS API 정책 변경 등 예측이 어려운
        사유로 인한 손해에 대해서는 책임을 지지 않는다.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">제9조(서비스 중단 및 변경)</h3>
      <p className="mt-1">
        ① 회사는 정기 점검, 기능 개선, 서비스 안정화 등의 사유로 서비스 제공을 일시적으로 중단할 수
        있으며, 이 경우 사전 공지를 원칙으로 한다.
        <br />
        ② 불가피한 사유로 사전 공지가 어려운 경우, 사후 지체 없이 공지한다.
        <br />③ 서비스의 중단 또는 변경으로 인한 손해가 발생한 경우, 회사는 이용자에게 해당 기간에
        비례한 금액을 환불하거나 이용기간을 연장한다.
      </p>

      <h2 className="text-[15px] font-semibold mt-8">제3장 분쟁처리 절차</h2>

      <h3 className="text-[14px] font-semibold mt-6">제10조(분쟁의 접수 및 처리)</h3>
      <p className="mt-1">
        ① 이용자는 서비스 이용과 관련된 불만, 피해 또는 분쟁에 대해 고객센터를 통해 접수할 수 있다.
        <br />
        ② 회사는 접수일로부터 7영업일 이내에 처리 결과를 통지하며, 불가피한 사유로 지연되는 경우 그
        사유와 처리 일정을 안내한다.
        <br />③ 이용자는 회사의 내부 처리 결과에 불복할 경우, 「콘텐츠산업진흥법」에 따른
        콘텐츠분쟁조정위원회 또는 「소비자기본법」에 따른 한국소비자원에 분쟁조정을 신청할 수 있다.
      </p>

      <h2 className="text-[15px] font-semibold mt-8">부칙</h2>
      <p className="mt-1">제1조(시행일) 본 분쟁해결기준은 2025년 9월 29일부터 시행한다.</p>
    </div>
  );
}

function EnglishDispute() {
  return (
    <div>
      <h1 className="text-[15px] font-semibold mb-4">Chapter 1. General Provisions</h1>

      <h3 className="text-[14px] font-semibold mt-6">Article 1 (Purpose)</h3>
      <p className="mt-1">
        This Policy aims to establish procedures and standards for the prompt and fair resolution of
        disputes between <strong>LeeLoad Inc.</strong> (hereinafter referred to as the “Company”)
        and users (hereinafter referred to as the “Users”) arising from the use of the Company’s
        subscription-based <strong>social media management platform</strong> (hereinafter referred
        to as the “Service”).
      </p>

      <h3 className="text-[14px] font-semibold mt-6">Article 2 (Definitions)</h3>
      <ol className="list-decimal pl-5 space-y-1 mt-1">
        <li>
          “Service” refers to all online subscription-based services provided by the Company,
          including but not limited to social media account integration, scheduled posting,
          analytics and statistics, and message management.
        </li>
        <li>
          “User” means any individual or legal entity that has entered into a service agreement with
          the Company and uses the Service provided by the Company.
        </li>
        <li>
          “Subscription” means a contract under which the User pays a certain fee to use the Service
          for a specified period.
        </li>
        <li>
          “Service Agreement” refers to the contractual relationship established between the Company
          and the User for the use of the Service.
        </li>
        <li>
          “Dispute” means any disagreement, claim for damages, refund, or termination arising from
          the use of the Service between the Company and the User.
        </li>
      </ol>

      <h3 className="text-[14px] font-semibold mt-6">Article 3 (Scope of Application)</h3>
      <p className="mt-1">
        1. This Policy applies to all disputes between the Company and the User regarding the use of
        the Service.
        <br />
        2. Any matters not specified in this Policy shall be governed by the{" "}
        <strong>Service Terms of Use</strong> and applicable laws and regulations.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">Article 4 (Amendment of the Policy)</h3>
      <p className="mt-1">
        1. The Company may amend this Policy to the extent that such amendment does not violate
        relevant laws, including the{" "}
        <strong>Act on the Consumer Protection in Electronic Commerce</strong>, the{" "}
        <strong>Content Industry Promotion Act</strong>, and the{" "}
        <strong>Framework Act on Consumers</strong>.
        <br />
        2. Any amendment to this Policy shall be announced through the Service at least seven (7)
        days prior to its effective date. Users who do not agree to the amended terms may terminate
        their Service Agreement.
      </p>

      <h2 className="text-[15px] font-semibold mt-8">
        Chapter 2. Standards for Dispute Resolution Between the Company and Users
      </h2>

      <h3 className="text-[14px] font-semibold mt-6">
        Article 5 (Termination of Agreement and Refund Policy)
      </h3>
      <p className="mt-1">
        1. Users may terminate their subscription at any time through the cancellation process
        provided within the Service.
        <br />
        2. Refunds shall be processed according to the following criteria:
      </p>
      <ol className="list-decimal pl-5 space-y-1 mt-1">
        <li>Before the start of use: Full refund of the payment.</li>
        <li>
          Within seven (7) days after the start of use: Refund after deducting the usage period and
          service cost.
        </li>
        <li>
          After seven (7) days of use: No refund (except in cases where service disruption is caused
          by the Company).
        </li>
      </ol>
      <p className="mt-2">
        3. The Company shall process the refund within three (3) business days from the date the
        refund obligation arises. The actual processing time may vary depending on the payment
        method used.
        <br />
        4. Refunds shall be processed in accordance with{" "}
        <strong>
          Article 22 of the Enforcement Decree of the Act on the Consumer Protection in Electronic
          Commerce
        </strong>
        , following the procedures applicable to each payment method.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">
        Article 6 (Service Interruptions and Company’s Liability)
      </h3>
      <p className="mt-1">
        1. In the event of service interruption or data loss caused by the Company’s willful
        misconduct or gross negligence, the Company shall compensate the User for damages.
        <br />
        2. However, the Company shall not be liable for any of the following:
      </p>
      <ol className="list-decimal pl-5 space-y-1 mt-1">
        <li>
          Force majeure events such as natural disasters, power outages, or data center failures;
        </li>
        <li>Disruptions caused by the User’s negligence or misconduct;</li>
        <li>
          Service restrictions or policy changes by external platforms (e.g., API providers) beyond
          the Company’s control.
        </li>
      </ol>
      <p className="mt-2">
        3. If a service outage or malfunction lasts for more than twenty-four (24) hours and causes
        material inconvenience to the User, the Company shall extend the subscription period
        proportionally or issue a partial refund corresponding to the duration of the disruption.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">
        Article 7 (Data and Account Management Responsibility)
      </h3>
      <p className="mt-1">
        1. Users are responsible for managing their accounts and connected social media accounts.
        The Company shall not be held liable for any damages resulting from account sharing, loss,
        or unauthorized access caused by the User’s negligence.
        <br />
        2. The Company shall take technical and administrative measures to protect User data. If a
        data breach or security incident occurs, the Company shall promptly notify affected Users
        and take necessary remedial actions.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">Article 8 (Compensation for Damages)</h3>
      <p className="mt-1">
        1. If either the Company or the User causes damage to the other party by violating this
        Policy or the Service Terms of Use, the party at fault shall compensate for the damages
        incurred.
        <br />
        2. However, the Company shall not be liable for damages arising from unforeseeable
        circumstances inherent to the Service, such as transmission delays or changes in social
        media API policies.
      </p>

      <h3 className="text-[14px] font-semibold mt-6">
        Article 9 (Service Suspension or Modification)
      </h3>
      <p className="mt-1">
        1. The Company may temporarily suspend the Service for system maintenance, feature updates,
        or service stabilization, and shall notify Users in advance whenever possible.
        <br />
        2. If prior notice is not feasible due to unavoidable reasons, the Company shall notify
        Users without delay after the fact.
        <br />
        3. If a suspension or modification of the Service causes material damage to the User, the
        Company shall extend the Service period or issue a refund proportional to the affected
        duration.
      </p>

      <h2 className="text-[15px] font-semibold mt-8">Chapter 3. Dispute Resolution Procedure</h2>

      <h3 className="text-[14px] font-semibold mt-6">
        Article 10 (Filing and Handling of Disputes)
      </h3>
      <p className="mt-1">
        1. Users may file complaints, claims, or disputes related to the Service through the
        Company’s customer support channels.
        <br />
        2. The Company shall respond to and process the dispute within seven (7) business days from
        the date of receipt. If the handling is delayed due to unavoidable circumstances, the
        Company shall inform the User of the reason for the delay and the expected processing date.
        <br />
        3. If the User disagrees with the Company’s resolution, the User may seek mediation through
        the <strong>Content Dispute Mediation Committee</strong> under the{" "}
        <strong>Content Industry Promotion Act</strong> or the{" "}
        <strong>Korea Consumer Agency</strong> under the <strong>Framework Act on Consumers</strong>
        .
      </p>

      <h2 className="text-[15px] font-semibold mt-8">Addendum</h2>
      <p className="mt-1">
        Article 1 (Effective Date) — This Dispute Resolution Policy shall take effect as of{" "}
        <strong>September 29, 2025</strong>.
      </p>
    </div>
  );
}
