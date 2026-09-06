import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/shop/ShopPage';
import { ProductDetailPage } from './pages/shop/ProductDetailPage';
import { EmiDuesPage } from './pages/EmiDuesPage';
import { LimitPage } from './pages/LimitPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route
        path="/shop/marketplace/:productId"
        element={<ProductDetailPage />}
      />
      <Route
        path="/*"
        element={
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop/*" element={<ShopPage />} />
              <Route path="/emi-dues" element={<EmiDuesPage />} />
              <Route path="/limit" element={<LimitPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  );
}

export default App;
