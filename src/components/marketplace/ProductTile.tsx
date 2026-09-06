import { useState } from 'react';
import { CATEGORY_VISUALS } from '../../utils/categoryVisuals';
import type { ProductCategory } from '../../types';

interface ProductTileProps {
  category: ProductCategory;
  /** Real product photo URL, sourced from product data. Falls back to the
   *  category icon tile if missing or if the image fails to load. */
  image?: string;
  alt?: string;
  size?: 'sm' | 'lg';
}

export function ProductTile({ category, image, alt, size = 'sm' }: ProductTileProps) {
  const visual = CATEGORY_VISUALS[category];
  const Icon = visual.icon;
  const dims = size === 'lg' ? 'w-full aspect-[4/3]' : 'w-full aspect-square';

  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const showImage = Boolean(image) && !errored;

  return (
    <div
      className={`${dims} rounded-xl bg-gradient-to-br ${visual.gradient} flex items-center justify-center relative overflow-hidden`}
    >
      {showImage && (
        <img
          src={image}
          alt={alt ?? ''}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Category icon fallback: shown when there's no image, the image
          errored, or while the real photo is still loading in. */}
      {(!showImage || !loaded) && (
        <>
          <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-white/10" />
          <div className="absolute -left-6 -bottom-6 w-20 h-20 rounded-full bg-white/10" />
          <Icon
            className="text-white relative"
            size={size === 'lg' ? 64 : 36}
            strokeWidth={1.5}
          />
        </>
      )}
    </div>
  );
}
