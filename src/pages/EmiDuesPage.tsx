export function EmiDuesPage() {
  const months = [
    { label: 'Sep 2026', total: '\u20B9407' },
    { label: 'Oct 2026', total: '\u20B9406' },
    { label: 'Nov 2026', total: '\u20B9406' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-gradient-to-br from-[#6C2BD9] to-[#2E1065] p-4 text-white flex items-center justify-between">
        <div>
          <p className="text-[11px] text-white/70 uppercase">Total outstanding</p>
          <p className="text-2xl font-bold">₹1,220</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-white/70 uppercase">Active loans</p>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4">
        <p className="text-sm font-semibold text-brand-ink mb-3">Monthly table</p>
        <div className="flex flex-col divide-y divide-black/5">
          {months.map((m) => (
            <div key={m.label} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-brand-ink">{m.label}</p>
                <p className="text-xs text-brand-muted">1 loan</p>
              </div>
              <p className="text-sm font-semibold text-brand-ink">{m.total}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
