import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-gradient-to-br from-[#6C2BD9] to-[#2E1065] p-4 text-white">
        <span className="inline-block text-[10px] font-semibold bg-white/15 px-2 py-1 rounded-full mb-2">
          LIMIT AVAILABLE
        </span>
        <p className="text-2xl font-bold">₹1,56,091</p>
        <p className="text-xs text-white/70 mb-3">Remaining to spend</p>
        <Link
          to="/shop/marketplace"
          className="inline-block bg-white text-brand-purple text-sm font-semibold px-5 py-2 rounded-full"
        >
          Shop now
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-brand-ink">Don't miss a payment</p>
          <p className="text-xs text-brand-muted">Set autopay with UPI</p>
        </div>
        <button className="text-xs font-semibold text-brand-purple border border-brand-purple/30 px-3 py-1.5 rounded-full">
          Setup
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wide mb-2">
          Offers
        </p>
        <Link
          to="/shop/marketplace"
          className="block rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 text-white"
        >
          <p className="text-[10px] font-semibold text-white/60 uppercase mb-1">
            Everyday pro performance
          </p>
          <p className="text-base font-bold">Get your new MacBook for work</p>
          <p className="text-xs text-white/70 mt-1">Starts at ₹2,000/mo</p>
        </Link>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-muted uppercase tracking-wide mb-2">
          Explore the marketplace
        </p>
        <Link
          to="/shop/marketplace"
          className="block bg-white rounded-2xl p-4 text-sm font-medium text-brand-purple text-center border border-brand-purple/20"
        >
          Browse products →
        </Link>
      </div>
    </div>
  );
}
