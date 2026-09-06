import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { SegmentedTabs } from '../../components/ui/SegmentedTabs';
import { TopBrandsPage } from './TopBrandsPage';
import { NearbyStoresPage } from './NearbyStoresPage';
import { MarketplacePage } from './MarketplacePage';

const TABS = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
];

export function ShopPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = TABS.find((t) => location.pathname.endsWith(t.id))?.id ?? 'marketplace';

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-brand-ink">Shop</h1>
        <p className="text-sm text-brand-muted">Buy now, pay later with your mutual funds</p>
      </div>

      <SegmentedTabs
        tabs={TABS}
        activeId={activeTab}
        onChange={(id) => navigate(`/shop/${id}`, { replace: true })}
      />

      <Routes>
        <Route index element={<Navigate to="marketplace" replace />} />
        <Route path="top-brands" element={<TopBrandsPage />} />
        <Route path="nearby-stores" element={<NearbyStoresPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="*" element={<Navigate to="marketplace" replace />} />
      </Routes>
    </div>
  );
}
