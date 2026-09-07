"use client";

interface FloatingActionsProps {
  onOpenDispatchModal: () => void;
  onOpenQuickTalkModal?: () => void;
}

export default function FloatingActions({
  onOpenDispatchModal,
  onOpenQuickTalkModal,
}: FloatingActionsProps) {
  return (
    <>
      {/* Mobile Safe Bottom Navigation Dock (전화 / 인터넷접수 / AI퀵톡접수 3열 균등) */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-1.5 border-t border-slate-200/90 bg-white/95 p-2 shadow-2xl backdrop-blur-2xl sm:hidden">
        {/* 1. 전화 */}
        <a
          href="tel:1588-5575"
          className="flex h-11 items-center justify-center space-x-1 rounded-xl border border-slate-300/80 bg-slate-100 text-xs font-bold text-slate-900 transition-transform active:scale-95"
        >
          <svg aria-hidden="true" className="h-3.5 w-3.5 text-orange-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="font-display font-black text-[11px] tracking-tight">1588-5575</span>
        </a>

        {/* 2. 인터넷접수 */}
        <button
          type="button"
          onClick={onOpenDispatchModal}
          className="flex h-11 items-center justify-center space-x-1 rounded-xl bg-blue-600 text-[11px] font-black text-white shadow-md transition-transform active:scale-95"
        >
          <svg aria-hidden="true" className="h-3.5 w-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>인터넷접수</span>
        </button>

        {/* 3. AI퀵톡접수 */}
        {onOpenQuickTalkModal && (
          <button
            type="button"
            onClick={onOpenQuickTalkModal}
            className="flex h-11 items-center justify-center space-x-1 rounded-xl bg-[#FEE500] text-[11px] font-black text-[#191919] shadow-md border border-[#E5CE00] transition-transform active:scale-95"
          >
            <svg className="h-3.5 w-3.5 text-[#191919] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.708 4.8 4.27 6.054-.187.697-.68 2.528-.778 2.923-.122.493.18.487.38.354.157-.105 2.502-1.701 3.518-2.392.525.077 1.06.118 1.61.118 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
            </svg>
            <span>AI퀵톡접수</span>
          </button>
        )}
      </div>
    </>
  );
}
