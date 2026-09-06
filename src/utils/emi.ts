import type { EmiPlan } from '../types';

// Single source of truth for EMI math. The mock API (marketplaceApi.ts) and
// any UI component that needs a quick estimate (e.g. ProductCard's
// "Starts at ₹X/mo") both call into this instead of re-deriving the formula,
// so the rate/tenure options are never hardcoded in more than one place.

export const EMI_TENURES_MONTHS = [3, 6, 9, 12] as const;
export const DEFAULT_INTEREST_RATE_PA = 10; // annual %, matches the 1Fi "0% interest, backed by your investments" flat-rate plans

/**
 * Simple-interest EMI calculation:
 * totalPayable = principal + principal * (rate/100) * (tenureMonths/12)
 * monthlyAmount = totalPayable / tenureMonths
 */
export function calculateEmiPlan(
  principal: number,
  tenureMonths: number,
  interestRatePA: number = DEFAULT_INTEREST_RATE_PA,
): EmiPlan {
  const totalPayable = principal * (1 + (interestRatePA / 100) * (tenureMonths / 12));
  return {
    tenureMonths,
    interestRatePA,
    monthlyAmount: Math.round(totalPayable / tenureMonths),
    totalPayable: Math.round(totalPayable),
  };
}

export function calculateEmiPlans(
  principal: number,
  tenures: readonly number[] = EMI_TENURES_MONTHS,
  interestRatePA: number = DEFAULT_INTEREST_RATE_PA,
): EmiPlan[] {
  return tenures.map((tenureMonths) => calculateEmiPlan(principal, tenureMonths, interestRatePA));
}

/** The lowest monthly commitment for a principal - i.e. the plan at the longest tenure. Used for "Starts at ₹X/mo" previews. */
export function getLowestMonthly(principal: number): number {
  const longestTenure = EMI_TENURES_MONTHS[EMI_TENURES_MONTHS.length - 1];
  return calculateEmiPlan(principal, longestTenure).monthlyAmount;
}
