export function LimitPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-gradient-to-br from-[#6C2BD9] to-[#2E1065] p-4 text-white">
        <p className="text-[11px] text-white/70 uppercase">Remaining limit</p>
        <p className="text-2xl font-bold mb-2">₹1,56,091</p>
        <div className="h-2 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-[46%] bg-white rounded-full" />
        </div>
        <p className="text-[11px] text-white/70 mt-1">46% utilized</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-3">
          <p className="text-[11px] text-brand-muted uppercase">Sanctioned limit</p>
          <p className="text-base font-bold text-brand-ink">₹2,91,091</p>
        </div>
        <div className="bg-white rounded-2xl p-3">
          <p className="text-[11px] text-brand-muted uppercase">Pledged value</p>
          <p className="text-base font-bold text-brand-ink">₹3,88,122</p>
        </div>
      </div>
    </div>
  );
}
