"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="" role="main">
      {/* Header */}
      <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2"></div>
        <h2 className="text-sm font-medium">개인정보처리방침 (전문)</h2>
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

      {/* Content */}
      <main className="flex justify-center px-4 py-10">
        <section className="w-full max-w-[780px] text-[13px] leading-relaxed text-neutral-800">
          <div className="clause__paragraph">
            <p className="mb-6">
              <strong>리로드(LeeLoad)</strong> (이하 “회사”)는 이용자의 개인정보를 중요시하며,
              「개인정보 보호법」 및 관련 법령을 준수합니다. 본 개인정보처리방침은 회사가 운영하는
              웹사이트 및 서비스(이하 “서비스”) 이용과 관련하여 개인정보의 수집, 이용, 보관, 파기에
              관한 내용을 명시합니다.
            </p>

            <p className="mb-4 text-[15px] font-semibold">1. 적용 범위</p>
            <p>
              본 개인정보 처리방침은 대한민국 법령(개인정보 보호법, 정보통신망법 등)을 우선적으로
              따릅니다.
            </p>
            <p>
              다만, 서비스 이용자가 유럽연합(EU), 미국 캘리포니아주 등 개인정보 보호 관련 법령이
              강화된 국가/지역에서 서비스를 이용하는 경우, 해당 지역 법령(GDPR, CCPA 등)에 따른
              추가적인 권리 보장 및 절차가 적용될 수 있습니다.
            </p>

            <p className="mt-6 mb-4 text-[15px] font-semibold">2. 수집하는 개인정보 항목</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>회원가입/로그인: 이메일 주소, 비밀번호</li>
              <li>
                SNS API 연동:
                <p>- 프로필 정보: 사용자 ID, 계정명, 프로필 이미지, 액세스 토큰</p>
                <p>- 콘텐츠/데이터: 게시글, 동영상, 이미지, 댓글</p>
                <p>- 통계 정보: 조회수, 좋아요, 댓글 수, 공유 수 등</p>
              </li>
              <li>
                서비스 이용 중 자동 수집: IP 주소, 브라우저/OS 정보, 쿠키·세션, 서비스 이용 로그
              </li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">3. 개인정보 이용 목적</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>회원 식별 및 계정 관리</li>
              <li>SNS 통합 관리 기능 제공</li>
              <li>분석 및 인사이트 제공</li>
              <li>서비스 운영 및 고객 지원</li>
              <li>법적 의무 준수</li>
              <li>마케팅 및 광고에 이용</li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">4. 보관 및 파기</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                회원 탈퇴 또는 목적 달성 시 지체 없이 파기합니다.
                <p>- 개인정보 열람요구</p>
                <p>- 오류 등이 있을 경우 정정 요구</p>
                <p>- 삭제요구</p>
                <p>- 처리정지 요구</p>
              </li>
              <li>
                법령에 따라 일정 기간 보관할 수 있습니다.
                <p>- 계약/청약철회 기록: 5년</p>
                <p>- 결제/재화 공급 기록: 5년</p>
                <p>- 소비자 불만/분쟁 기록: 3년</p>
                <p>- 접속 로그: 3개월</p>
              </li>
              <li>
                단, 회사는 서비스 개선 및 통계·분석 목적으로{" "}
                <b>개인 식별이 불가능하도록 가명처리·익명처리한 데이터</b>는 회원 탈퇴 이후에도
                보관·활용할 수 있습니다.
              </li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">5. 개인정보 처리 위탁</p>
            <p>회사는 서비스 운영을 위해 다음과 같이 개인정보 처리를 위탁할 수 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>클라우드 인프라 (AWS, Azure, GCP) → 데이터 보관/시스템 운영</li>
              <li>메시지 발송 서비스 → 이메일, 푸시 알림 발송</li>
              <li>데이터 분석 서비스 → 서비스 이용 패턴 분석</li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">6. 개인정보 국외 이전</p>
            <p>개인정보는 글로벌 클라우드 서버(미국, 일본, 싱가포르 등)에 이전될 수 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>이전 항목: 계정 정보, 서비스 로그, 연동된 SNS 데이터</li>
              <li>이전 국가: 미국, 일본, 싱가포르</li>
              <li>이전 방법: 암호화 통신(SSL/TLS)을 통한 전송</li>
              <li>이전 목적: 데이터 보관 및 운영</li>
              <li>수탁업체: AWS, Microsoft, Google 등</li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">7. 쿠키 및 추적 기술</p>
            <p>쿠키를 통해 로그인 세션 유지, 맞춤형 콘텐츠 제공, 광고 효율 측정 등을 수행합니다.</p>
            <p>
              브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있으며, 이 경우 일부 서비스
              이용에 제한이 있을 수 있습니다.
            </p>

            <p className="mt-6 mb-4 text-[15px] font-semibold">8. 개인정보 보호 조치</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>비밀번호 암호화 저장</li>
              <li>SSL/TLS 암호화 통신</li>
              <li>접근 권한 최소화</li>
              <li>정기 보안 점검 및 임직원 보안 교육</li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">9. 이용자의 권리</p>
            <p>
              이용자는 언제든 개인정보 열람, 정정, 삭제, 처리 정지, 회원 탈퇴를 요청할 수 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                EU 이용자(GDPR): 열람권, 삭제권, 이동권, 처리 제한권, 자동화된 의사결정 거부권 보장
              </li>
              <li>미국 캘리포니아 이용자(CCPA): 개인정보 판매 거부권, 열람·삭제 요청권 보장</li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">10. 제3자 제공</p>
            <p>회사는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다.</p>
            <p>
              다만 법령에 따라 수사기관이나 법원의 요청이 있는 경우 예외적으로 제공할 수 있습니다.
            </p>

            <p className="mt-6 mb-4 text-[15px] font-semibold">11. 준거법 및 관할권</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>본 방침은 대한민국 법률을 우선 적용합니다.</li>
              <li>
                다만 해외 이용자에게는 해당 지역의 법률(GDPR, CCPA 등)에 따른 추가 권리가
                보장됩니다.
              </li>
              <li>분쟁 발생 시 회사 본사 소재지를 관할하는 법원을 제1심 관할 법원으로 합니다.</li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">
              12. 개인정보 처리방침의 변경 및 고지
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                개인정보 처리방침은 정부의 정책 및 법령 또는 회사의 방침 변경에 따라 내용의 추가,
                삭제 및 수정이 있을 수 있습니다.
              </li>
              <li>
                개인정보 처리방침을 변경하는 경우 회사는 홈페이지를 통해 공지하고, 정보주체가
                언제든지 변경된 사항을 쉽게 알아볼 수 있도록 조치하겠습니다.
              </li>
            </ul>

            <p className="mt-6 mb-4 text-[15px] font-semibold">13. 개인정보 보호 책임자</p>
            <table className="w-full border border-neutral-300 text-[13px]">
              <tbody>
                <tr className="border-b border-neutral-300">
                  <td className="p-2 w-1/3 font-semibold">책임자</td>
                  <td className="p-2">이승렬</td>
                </tr>
                <tr className="border-b border-neutral-300">
                  <td className="p-2">이메일</td>
                  <td className="p-2">
                    <a href="mailto:admin@postio.site" className="text-blue-600 underline">
                      admin@postio.site
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">주소</td>
                  <td className="p-2">서울특별시 동일로 227길 25 1109동 905호</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
