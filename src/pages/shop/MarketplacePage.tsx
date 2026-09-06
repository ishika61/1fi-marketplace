import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { getProducts } from '../../api/marketplaceApi';
import { useAsync } from '../../hooks/useAsync';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { ProductGridSkeleton, ErrorState, EmptyState } from '../../components/ui/AsyncStates';
import { CATEGORY_VISUALS } from '../../utils/categoryVisuals';
import type { ProductCategory } from '../../types';

const CATEGORY_FILTERS: Array<{ id: ProductCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  ...(Object.keys(CATEGORY_VISUALS) as ProductCategory[]).map((id) => ({
    id,
    label: CATEGORY_VISUALS[id].label,
  })),
];

export function MarketplacePage() {
  const { data: products, status, error, retry } = useAsync(getProducts, []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  return (
    <div className="flex flex-col gap-4">
      {/* Hero banner, consistent with the existing Shop hero treatment */}
      <div className="rounded-2xl bg-gradient-to-br from-[#6C2BD9] to-[#2E1065] px-4 py-4 text-white">
        <p className="text-[11px] font-semibold tracking-wide text-white/70 uppercase">
          0% interest EMIs
        </p>
        <p className="text-lg font-bold mt-1 leading-snug">
          Shop the 1Fi Marketplace,
          <br />
          pay later with mutual funds
        </p>
        <p className="text-xs text-white/70 mt-1">
          No credit score required · Backed by your investments
        </p>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-white rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none border border-black/5 focus:border-brand-purple/40"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {CATEGORY_FILTERS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${
              category === c.id
                ? 'bg-brand-purple text-white border-brand-purple'
                : 'bg-white text-brand-ink/70 border-black/10'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {status === 'loading' && <ProductGridSkeleton />}

      {status === 'error' && error && <ErrorState message={error} onRetry={retry} />}

      {status === 'success' && filtered.length === 0 && (
        <EmptyState
          title="No products found"
          description="Try a different search term or category."
        />
      )}

      {status === 'success' && filtered.length > 0 && (
        <div className="grid grid-cols-2 gap-3 pb-2">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
