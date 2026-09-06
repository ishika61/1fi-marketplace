import productsSeed from '../data/products.json';
import type { EmiPlan, Product } from '../types';
import { calculateEmiPlans } from '../utils/emi';

// This file stands in for a real backend integration.
// Every function returns a Promise and goes through the same
// delay/error simulation a real fetch() call would, so components
// consuming this API don't need to change when it's swapped for
// a live endpoint later.

const NETWORK_DELAY_MS = 650;

// Simulated failure rate. Set to 0 to disable for demos.
const FAILURE_RATE = 0.08;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail(context: string) {
  if (Math.random() < FAILURE_RATE) {
    throw new Error(`Couldn't reach the server while ${context}. Please try again.`);
  }
}

export async function getProducts(): Promise<Product[]> {
  await wait(NETWORK_DELAY_MS);
  maybeFail('loading the marketplace');
  return productsSeed as Product[];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await wait(NETWORK_DELAY_MS - 150);
  maybeFail('loading this product');
  return (productsSeed as Product[]).find((p) => p.id === id);
}

/**
 * Returns the EMI plans (3/6/9/12 months) for a given principal, using the
 * shared calculateEmiPlans() formula in utils/emi.ts. This mirrors the flat
 * "X months · Y% p.a. · ₹Z/mo" plans shown on the existing 1Fi "Pay using 1Fi"
 * screen, so a real backend can replace this function body with an
 * authoritative calculation without changing the UI contract.
 */
export async function getEmiPlans(principal: number): Promise<EmiPlan[]> {
  await wait(NETWORK_DELAY_MS - 200);
  maybeFail('fetching EMI plans');
  return calculateEmiPlans(principal);
}

export interface CreatePlanRequestPayload {
  productId: string;
  variantId: string;
  tenureMonths: number;
  amount: number;
}

export interface CreatePlanRequestResult {
  requestId: string;
  status: 'submitted';
}

export async function submitPurchaseRequest(
  payload: CreatePlanRequestPayload,
): Promise<CreatePlanRequestResult> {
  await wait(NETWORK_DELAY_MS + 250);
  maybeFail('submitting your request');
  return {
    requestId: `1FI-${payload.productId.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-6)}`,
    status: 'submitted',
  };
}
