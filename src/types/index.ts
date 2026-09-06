// Core domain types for the 1Fi Marketplace feature.
// Kept separate from components so API/mock layers and UI share one contract.

export type ProductCategory =
  | 'mobiles'
  | 'laptops'
  | 'wearables'
  | 'audio'
  | 'gaming'
  | 'tv-appliances';

export interface ProductVariant {
  id: string;
  label: string; // e.g. "256 GB · Deep Blue"
  price: number; // in INR
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  /** Product photo URL, sourced from data (never hardcoded in components). */
  image: string;
  merchant: string; // the store/brand the payment goes to, shown as "Paying to"
  rating: number; // 0-5
  tagline: string;
  variants: ProductVariant[];
  highlights: string[]; // bullet spec points shown on the detail page
}

export interface EmiPlan {
  tenureMonths: number;
  interestRatePA: number; // annual %, e.g. 10 for 10% p.a.
  monthlyAmount: number;
  totalPayable: number;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
}
