import { Check } from 'lucide-react';
import { formatINR } from '../../utils/format';
import type { ProductVariant } from '../../types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function VariantSelector({ variants, selectedId, onSelect }: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedId;
        return (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
              isSelected
                ? 'border-brand-purple bg-brand-purple-light'
                : 'border-black/10 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-brand-purple border-brand-purple' : 'border-black/20'
                }`}
              >
                {isSelected && <Check size={13} className="text-white" strokeWidth={3} />}
              </span>
              <span className="text-sm text-brand-ink">{variant.label}</span>
            </div>
            <span className="text-sm font-semibold text-brand-ink">
              {formatINR(variant.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
