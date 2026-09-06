import { create } from 'zustand';

interface PurchaseSelectionState {
  selectedVariantId: string | null;
  selectedTenureMonths: number | null;
  customAmount: number | null;
  setVariant: (variantId: string) => void;
  setTenure: (tenureMonths: number) => void;
  setCustomAmount: (amount: number | null) => void;
  reset: () => void;
}

export const usePurchaseStore = create<PurchaseSelectionState>((set) => ({
  selectedVariantId: null,
  selectedTenureMonths: null,
  customAmount: null,
  setVariant: (variantId) =>
    set({ selectedVariantId: variantId, customAmount: null }),
  setTenure: (tenureMonths) => set({ selectedTenureMonths: tenureMonths }),
  setCustomAmount: (amount) => set({ customAmount: amount }),
  reset: () =>
    set({ selectedVariantId: null, selectedTenureMonths: null, customAmount: null }),
}));
