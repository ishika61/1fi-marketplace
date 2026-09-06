import { formatINR } from '../../utils/format';
import type { EmiPlan } from '../../types';

interface EmiPlanOptionProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export function EmiPlanOption({ plan, isSelected, onSelect }: EmiPlanOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-colors ${
        isSelected ? 'border-brand-purple bg-brand-purple-light' : 'border-black/10 bg-white'
      }`}
    >
      <div className="text-left">
        <p className="text-sm font-medium text-brand-ink">{plan.tenureMonths} months</p>
        <p className="text-xs text-brand-muted">{plan.interestRatePA}% p.a.</p>
      </div>
      <p
        className={`text-sm font-semibold ${isSelected ? 'text-brand-purple' : 'text-brand-ink'}`}
      >
        {formatINR(plan.monthlyAmount)}/mo
      </p>
    </button>
  );
}
