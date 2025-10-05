"use client";

import { useRouter } from "next/navigation";

export default function DisputeResolutionPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2"></div>
        <h2 className="text-sm font-medium">분쟁해결기준</h2>
        <button
          onClick={() => router.push("/")}
          aria-label="홈으로 이동"
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
      <main className="mx-auto max-w-[780px] text-[13px] px-4 py-12 font-pretendard text-neutral-700">
        <section className="mb-10">
          <h2 className="text-[15px] font-medium mb-2">제1조 (목적)</h2>
          <p>
            본 기준은 「전자상거래 등에서의 소비자보호에 관한 법률」 제20조 제3항에 따라,{" "}
            <strong>리로드(LeeLoad)</strong> (이하 “회사”)의 서비스 이용과 관련하여 회원과 회사 간
            발생할 수 있는 분쟁을 신속하고 공정하게 해결하기 위한 절차와 기준을 정함을 목적으로
            합니다.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-[15px] font-medium mb-2">제2조 (적용 범위)</h2>
          <p>
            본 기준은 회사와 회원 간의 서비스 이용계약에 따른 거래 및 콘텐츠 제공 과정에서 발생한
            분쟁에 적용됩니다.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-[15px] font-medium mb-2">제3조 (분쟁의 해결 원칙)</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>분쟁은 회사의 고객센터를 통한 상담 및 조정 절차를 우선으로 합니다.</li>
            <li>
              법령이나 본 기준에서 정하지 않은 사항은 「전자상거래법」, 「소비자기본법」 및
              공정거래위원회의 「소비자분쟁해결기준」을 준용합니다.
            </li>
            <li>
              회원은 회사의 분쟁처리 결과에 불복할 경우 한국소비자원 또는 관련 분쟁조정위원회에
              조정을 신청할 수 있습니다.
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-[15px] font-medium mb-2">제4조 (청약철회 및 환불)</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              회원이 결제한 유료 서비스에 대해 청약철회를 요청하는 경우, 결제일로부터 7일 이내에
              가능하며 미사용분에 한해 환불합니다.
            </li>
            <li>디지털 콘텐츠 성격상 즉시 이용 가능한 서비스는 청약철회가 제한될 수 있습니다.</li>
            <li>환불은 결제 취소 또는 계좌이체 등의 방법으로 3영업일 이내 처리됩니다.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-[15px] font-medium mb-2">제5조 (손해배상)</h2>
          <p>
            회사는 서비스의 하자 또는 장애로 인해 회원에게 손해가 발생한 경우, 회사의 고의 또는
            중대한 과실이 없는 한 책임을 지지 않습니다. 다만, 회원의 결제 금액을 한도로 배상할 수
            있습니다.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-[15px] font-medium mb-2">제6조 (면책 및 책임 제한)</h2>
          <p>
            회사는 제휴 플랫폼(API 제공자)의 정책 변경, 서비스 중단, 장애 등 불가피한 사유로 인한
            손해에 대해서는 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-[15px] font-medium mb-2">[부칙]</h2>
          <p>본 분쟁해결기준은 2025년 10월 5일부터 시행합니다.</p>
        </section>
      </main>
    </div>
  );
}
