"use client";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl max-h-[88vh] rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 bg-slate-900 text-white shrink-0 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-display font-black text-base sm:text-lg tracking-tight">
              (주)드림델 개인정보처리방침
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans divide-y divide-slate-100">
          {/* Preamble */}
          <div className="space-y-2">
            <p className="text-slate-950 font-bold text-sm sm:text-base leading-snug">
              (주)드림델(이하 &apos;회사&apos;)은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 엄격히 준수하여, 고객의 개인정보를 안전하게 관리하고 있습니다.
            </p>
            <p className="text-slate-500 text-xs">
              본 개인정보처리방침은 회사가 제공하는 퀵서비스, 차량 화물운송, 전국연계 운송, 견적 상담 및 기사 모집 등 제반 서비스 이용에 적용됩니다.
            </p>
          </div>

          {/* 제1조 */}
          <div className="pt-5 space-y-2">
            <h4 className="font-bold text-slate-950 text-sm sm:text-base flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>제1조 (개인정보의 처리 목적)</span>
            </h4>
            <p>회사는 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법률에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>운송 및 실시간 배차 서비스 제공</strong>: 퀵서비스, 다마스/라보/1톤 차량 화물, 전국연계 운송 접수, 전담 기사 배차, 물품 픽업 및 배송 완료 안내, 실시간 위치 조회.</li>
              <li><strong>견적 및 법인 계약 상담</strong>: 맞춤형 운송 단가 산출, 기업 전용 요율 상담, 법인 월정산 계약 체결 및 전자세금계산서 발행.</li>
              <li><strong>기사 파트너 모집 및 관리</strong>: 퀵기사 및 화물기사 지원 접수, 면허 및 자격 검증, 배차 시스템 등록 및 정산 관리.</li>
              <li><strong>고객 민원 및 보험 처리</strong>: 배송 문의 응대, 지연/파손/분실 사고 접수 및 적재물배상책임보험 보상 처리.</li>
            </ul>
          </div>

          {/* 제2조 */}
          <div className="pt-5 space-y-2">
            <h4 className="font-bold text-slate-950 text-sm sm:text-base flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>제2조 (처리하는 개인정보의 항목)</span>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-900">
                    <th className="p-2.5 border-r border-slate-200 w-[25%]">구분</th>
                    <th className="p-2.5 border-r border-slate-200 w-[45%]">수집 항목</th>
                    <th className="p-2.5 w-[30%]">수집 방법</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr>
                    <td className="p-2.5 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">운송 접수 / 견적 문의</td>
                    <td className="p-2.5 border-r border-slate-200">성명(담당자명), 연락처(휴대전화번호), 출발지 및 도착지 주소, 회사명(법인 시), 요청 품목 및 중량</td>
                    <td className="p-2.5">홈페이지 폼, 간편접수, 전화 접수</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">기사 지원</td>
                    <td className="p-2.5 border-r border-slate-200">성명, 연락처, 희망 활동 지역, 운전 및 배송 경력</td>
                    <td className="p-2.5">기사 지원 신청 폼</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">서비스 이용 시 자동 수집</td>
                    <td className="p-2.5 border-r border-slate-200">IP 주소, 쿠키, 서비스 이용 기록, 방문 일시, 기기 정보</td>
                    <td className="p-2.5">웹사이트 자동 생성</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 제3조 */}
          <div className="pt-5 space-y-2">
            <h4 className="font-bold text-slate-950 text-sm sm:text-base flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>제3조 (개인정보의 처리 및 보유 기간)</span>
            </h4>
            <p>회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 기간 내에서 개인정보를 처리·보유하며, 목적 달성 시 지체 없이 파기합니다.</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>단순 운송 의뢰 및 상담 기록</strong>: 배송 및 상담 완료일로부터 1년</li>
              <li><strong>계약 또는 청약철회 등에 관한 기록</strong>: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li><strong>대금결제 및 재화 등의 공급에 관한 기록</strong>: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li><strong>소비자의 불만 또는 분쟁처리에 관한 기록</strong>: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li><strong>웹사이트 접속 로그 기록</strong>: 3개월 (통신비밀보호법)</li>
            </ul>
          </div>

          {/* 제4조 */}
          <div className="pt-5 space-y-2">
            <h4 className="font-bold text-slate-950 text-sm sm:text-base flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>제4조 (개인정보의 제3자 제공 및 배송 위탁)</span>
            </h4>
            <p>회사는 정보주체의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우 최소한의 범위 내에서 제공됩니다.</p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div>• <strong>제공받는 자</strong>: 배차된 담당 퀵기사 및 화물운송 기사</div>
              <div>• <strong>제공 목적</strong>: 물품 픽업 및 배송지 전달, 수취인 확인 및 유선 연락</div>
              <div>• <strong>제공 항목</strong>: 출발지/도착지 주소, 의뢰인 및 수취인 성명, 연락처</div>
              <div>• <strong>보유 및 이용 기간</strong>: 배송 완료 후 즉시 파기</div>
            </div>
          </div>

          {/* 제5조 */}
          <div className="pt-5 space-y-2">
            <h4 className="font-bold text-slate-950 text-sm sm:text-base flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>제5조 (정보주체의 권리와 행사 방법)</span>
            </h4>
            <p>정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있으며, 회사는 지체 없이 조치합니다.</p>
            <p className="text-slate-500 text-xs">
              권리 행사는 서면, 전자우편, 고객센터 유선 전화(1588-5575)를 통하여 가능하며 대리인을 통해서도 요청하실 수 있습니다.
            </p>
          </div>

          {/* 제6조 */}
          <div className="pt-5 space-y-2">
            <h4 className="font-bold text-slate-950 text-sm sm:text-base flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>제6조 (개인정보 보호책임자 및 상담 창구)</span>
            </h4>
            <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-950 w-24">개인정보 보호책임자</span>
                <span className="text-slate-800">박상희 대표이사</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-950 w-24">담당 부서</span>
                <span className="text-slate-800">(주)드림델 고객만족운영팀</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-950 w-24">대표 전화</span>
                <span className="text-slate-800 font-mono font-bold">1588-5575 / 02-3446-7668</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-950 w-24">사업장 주소</span>
                <span className="text-slate-800">서울특별시 강남구 논현동 114-14 금산빌딩 4층</span>
              </div>
            </div>
          </div>

          {/* 제7조 */}
          <div className="pt-5 space-y-2">
            <h4 className="font-bold text-slate-950 text-sm sm:text-base flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              <span>제7조 (권익침해 구제 기관 안내)</span>
            </h4>
            <p className="text-slate-600">개인정보 침해에 대한 피해구제, 상담 등이 필요하신 경우 아래 기관에 문의하실 수 있습니다.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>개인정보분쟁조정위원회</strong>: (국번없이) 1833-6972
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>개인정보침해신고센터</strong>: (국번없이) 118
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>대검찰청 사이버수사과</strong>: (국번없이) 1301
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>경찰청 사이버수사국</strong>: (국번없이) 182
              </div>
            </div>
          </div>

          {/* 부칙 */}
          <div className="pt-4 text-xs text-slate-500">
            <p><strong>공고일자</strong>: 2026년 1월 1일 / <strong>시행일자</strong>: 2026년 1월 1일</p>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="p-4 px-6 sm:px-8 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-mono">
            (주)드림델 개인정보보호 준수
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
