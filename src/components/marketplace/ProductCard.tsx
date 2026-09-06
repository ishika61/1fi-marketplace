import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { ProductTile } from './ProductTile';
import { formatCompactINR } from '../../utils/format';
import { getLowestMonthly } from '../../utils/emi';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const startingPrice = Math.min(...product.variants.map((v) => v.price));
  const startingMonthly = getLowestMonthly(startingPrice);

  return (
    <Card
      className="p-2.5 flex flex-col gap-2"
      onClick={() => navigate(`/shop/marketplace/${product.id}`)}
    >
      <ProductTile category={product.category} image={product.image} alt={product.name} />
      <div>
        <p className="text-[11px] uppercase tracking-wide text-brand-muted font-medium">
          {product.brand}
        </p>
        <p className="text-sm font-semibold text-brand-ink leading-tight line-clamp-2">
          {product.name}
        </p>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-bold text-brand-ink">{formatCompactINR(startingPrice)}</p>
      </div>
      <p className="text-[11px] text-brand-green font-medium">
        Starts at {formatCompactINR(startingMonthly)}/mo
      </p>
    </Card>
  );
}
