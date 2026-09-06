import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Share2, Pencil, Check, X } from 'lucide-react';
import { getProductById, getEmiPlans, submitPurchaseRequest } from '../../api/marketplaceApi';
import { useAsync } from '../../hooks/useAsync';
import { usePurchaseStore } from '../../store/purchaseStore';
import { ProductTile } from '../../components/marketplace/ProductTile';
import { VariantSelector } from '../../components/marketplace/VariantSelector';
import { EmiPlanOption } from '../../components/marketplace/EmiPlanOption';
import { ErrorState } from '../../components/ui/AsyncStates';
import { formatINR } from '../../utils/format';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const {
    data: product,
    status: productStatus,
    error: productError,
    retry: retryProduct,
  } = useAsync(() => getProductById(productId!), [productId]);

  const { selectedVariantId, selectedTenureMonths, customAmount, setVariant, setTenure, setCustomAmount, reset } =
    usePurchaseStore();

  // Initialise selection once the product loads.
  useEffect(() => {
    if (product && !selectedVariantId) {
      setVariant(product.variants[0].id);
    }
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const variant = product?.variants.find((v) => v.id === selectedVariantId) ?? product?.variants[0];

  // The amount EMI plans are calculated against: the custom amount the user
  // typed in (if any and valid), otherwise the selected variant's price.
  const principalAmount =
    customAmount != null && customAmount > 0 ? customAmount : (variant?.price ?? 0);

  const {
    data: emiPlans,
    status: emiStatus,
    error: emiError,
    retry: retryEmi,
  } = useAsync(() => getEmiPlans(principalAmount), [principalAmount]);

  const activeTenure = selectedTenureMonths ?? emiPlans?.[1]?.tenureMonths ?? emiPlans?.[0]?.tenureMonths;
  const activePlan = useMemo(
    () => emiPlans?.find((p) => p.tenureMonths === activeTenure) ?? emiPlans?.[0],
    [emiPlans, activeTenure],
  );

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error' | 'success'>(
    'idle',
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [amountDraft, setAmountDraft] = useState('');

  function startEditingAmount() {
    setAmountDraft(String(principalAmount));
    setIsEditingAmount(true);
  }

  function commitAmountDraft() {
    const parsed = Number(amountDraft);
    if (Number.isFinite(parsed) && parsed > 0) {
      // No point setting a "custom" amount that's identical to the suggested one.
      setCustomAmount(parsed === variant?.price ? null : parsed);
    }
    setIsEditingAmount(false);
  }

  function resetToSuggestedAmount() {
    setCustomAmount(null);
    setIsEditingAmount(false);
  }

  async function handleProceed() {
    if (!product || !variant || !activePlan) return;
    setSubmitStatus('loading');
    setSubmitError(null);
    try {
      const result = await submitPurchaseRequest({
        productId: product.id,
        variantId: variant.id,
        tenureMonths: activePlan.tenureMonths,
        amount: principalAmount,
      });
      setRequestId(result.requestId);
      setSubmitStatus('success');
    } catch (err) {
      setSubmitError((err as Error).message);
      setSubmitStatus('error');
    }
  }

  if (productStatus === 'loading' || productStatus === 'idle') {
    return (
      <div className="min-h-screen bg-brand-bg max-w-md mx-auto px-4 pt-4 animate-pulse">
        <div className="h-6 w-24 bg-black/10 rounded mb-6" />
        <div className="w-full aspect-square rounded-2xl bg-black/5 mb-4" />
        <div className="h-4 w-1/2 bg-black/10 rounded mb-2" />
        <div className="h-4 w-1/3 bg-black/10 rounded" />
      </div>
    );
  }

  if (productStatus === 'error') {
    return (
      <div className="min-h-screen bg-brand-bg max-w-md mx-auto px-4 pt-4">
        <BackHeader onBack={() => navigate(-1)} title="1Fi Marketplace" />
        <ErrorState message={productError ?? 'Please try again.'} onRetry={retryProduct} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-bg max-w-md mx-auto px-4 pt-4">
        <BackHeader onBack={() => navigate(-1)} title="1Fi Marketplace" />
        <ErrorState message="We couldn't find this product." onRetry={retryProduct} />
      </div>
    );
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-brand-bg max-w-md mx-auto px-4 pt-4 flex flex-col">
        <BackHeader onBack={() => navigate('/shop/marketplace')} title="Pay using 1Fi" />
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 pb-20">
          <div className="w-16 h-16 rounded-full bg-brand-purple-light flex items-center justify-center">
            <Star className="text-brand-purple" size={28} fill="currentColor" />
          </div>
          <p className="text-lg font-bold text-brand-ink">Request submitted</p>
          <p className="text-sm text-brand-muted max-w-xs">
            Your plan for {product.name} ({activePlan?.tenureMonths} months) is being processed.
            We'll notify you once it's approved.
          </p>
          <p className="text-xs text-brand-muted">Reference ID: {requestId}</p>
          <button
            onClick={() => navigate('/shop/marketplace')}
            className="mt-4 px-6 py-3 rounded-full bg-brand-purple text-white text-sm font-medium"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg max-w-md mx-auto px-4 pt-4 pb-32">
      <BackHeader onBack={() => navigate(-1)} title="Pay using 1Fi" />

      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-black/10 text-brand-ink/70">
          {product.brand}
        </span>
        <button className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center">
          <Share2 size={14} className="text-brand-ink/70" />
        </button>
      </div>

      <div className="mb-4">
        <ProductTile category={product.category} image={product.image} alt={product.name} size="lg" />
      </div>

      <h2 className="text-lg font-bold text-brand-ink">{product.name}</h2>
      <p className="text-sm text-brand-muted mb-1">{product.tagline}</p>
      <div className="flex items-center gap-1 mb-4">
        <Star size={14} className="text-amber-500" fill="currentColor" />
        <span className="text-xs font-medium text-brand-ink">{product.rating}</span>
      </div>

      <ul className="grid grid-cols-1 gap-1.5 mb-6">
        {product.highlights.map((h) => (
          <li key={h} className="text-xs text-brand-ink/70 flex gap-2">
            <span className="text-brand-purple">•</span>
            {h}
          </li>
        ))}
      </ul>

      <SectionLabel>Select your variant</SectionLabel>
      <div className="mb-6">
        <VariantSelector
          variants={product.variants}
          selectedId={variant?.id ?? ''}
          onSelect={setVariant}
        />
      </div>

      <div className="bg-white rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] uppercase tracking-wide text-brand-muted font-medium">
            {customAmount != null ? 'Amount to pay' : 'Suggested amount'}
          </p>
          {!isEditingAmount && (
            <button
              onClick={startEditingAmount}
              className="flex items-center gap-1 text-[11px] font-medium text-brand-purple"
            >
              <Pencil size={11} />
              Edit if paying different amount
            </button>
          )}
        </div>

        {isEditingAmount ? (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-brand-ink">₹</span>
            <input
              autoFocus
              type="number"
              min={1}
              value={amountDraft}
              onChange={(e) => setAmountDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && commitAmountDraft()}
              className="flex-1 text-2xl font-bold text-brand-ink outline-none border-b-2 border-brand-purple/40 focus:border-brand-purple bg-transparent"
            />
            <button
              onClick={commitAmountDraft}
              aria-label="Save amount"
              className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center shrink-0"
            >
              <Check size={16} className="text-white" />
            </button>
            <button
              onClick={() => setIsEditingAmount(false)}
              aria-label="Cancel"
              className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0"
            >
              <X size={16} className="text-brand-ink/60" />
            </button>
          </div>
        ) : (
          <div className="flex items-baseline gap-2 mb-3">
            <p className="text-2xl font-bold text-brand-ink">{formatINR(principalAmount)}</p>
            {customAmount != null && (
              <button
                onClick={resetToSuggestedAmount}
                className="text-[11px] text-brand-muted underline underline-offset-2"
              >
                Reset to {variant ? formatINR(variant.price) : 'suggested'}
              </button>
            )}
          </div>
        )}

        <SectionLabel>Choose an EMI plan</SectionLabel>

        {emiStatus === 'loading' && (
          <div className="grid grid-cols-1 gap-2 mt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-black/5 animate-pulse" />
            ))}
          </div>
        )}

        {emiStatus === 'error' && emiError && (
          <ErrorState message={emiError} onRetry={retryEmi} />
        )}

        {emiStatus === 'success' && emiPlans && (
          <div className="flex flex-col gap-2 mt-2">
            {emiPlans.map((plan) => (
              <EmiPlanOption
                key={plan.tenureMonths}
                plan={plan}
                isSelected={plan.tenureMonths === activeTenure}
                onSelect={() => setTenure(plan.tenureMonths)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-brand-muted">Paying to</span>
        <span className="font-medium text-brand-ink">{product.merchant}</span>
      </div>

      {submitStatus === 'error' && submitError && (
        <p className="text-xs text-red-500 mb-2">{submitError}</p>
      )}

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="mx-auto max-w-md bg-white border-t border-black/5 p-4">
          <button
            onClick={handleProceed}
            disabled={submitStatus === 'loading' || emiStatus !== 'success'}
            className="w-full py-3.5 rounded-full bg-brand-purple text-white font-semibold text-sm disabled:opacity-50 active:opacity-90"
          >
            {submitStatus === 'loading'
              ? 'Submitting...'
              : activePlan
                ? `Proceed · ${formatINR(activePlan.monthlyAmount)}/mo`
                : 'Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
}

function BackHeader({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={onBack}
        className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center"
      >
        <ArrowLeft size={16} className="text-brand-ink" />
      </button>
      <h1 className="text-base font-semibold text-brand-ink">{title}</h1>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-wide text-brand-muted font-medium mb-2">
      {children}
    </p>
  );
}
