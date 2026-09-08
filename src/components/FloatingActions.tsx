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
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t border-slate-700/60 bg-[#0F172A]/92 p-2 shadow-2xl backdrop-blur-2xl sm:hidden">
        {/* 1. 전화 */}
        <a
          href="tel:1588-5575"
          className="flex h-11 items-center justify-center space-x-1.5 rounded-xl border border-slate-700/70 bg-slate-850/90 text-xs font-bold text-slate-100 transition-transform active:scale-95 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-display font-black text-[12px] tracking-tight">1588-5575</span>
        </a>

        {/* 2. 인터넷접수 */}
        <button
          type="button"
          onClick={onOpenDispatchModal}
          className="flex h-11 items-center justify-center space-x-1.5 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-200 text-[11.5px] font-black shadow-xs transition-transform active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <svg aria-hidden="true" className="h-3.5 w-3.5 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>인터넷접수</span>
        </button>

        {/* 3. AI퀵톡접수 */}
        {onOpenQuickTalkModal && (
          <button
            type="button"
            onClick={onOpenQuickTalkModal}
            className="flex h-11 items-center justify-center space-x-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-200 text-[11.5px] font-black shadow-xs transition-transform active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <svg className="h-3.5 w-3.5 text-[#FEE500] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.708 4.8 4.27 6.054-.187.697-.68 2.528-.778 2.923-.122.493.18.487.38.354.157-.105 2.502-1.701 3.518-2.392.525.077 1.06.118 1.61.118 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
            </svg>
            <span>AI퀵톡접수</span>
          </button>
        )}
      </div>
    </>
  );
}
