import { AlertTriangle, PackageSearch } from 'lucide-react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-3 animate-pulse">
      <div className="w-full aspect-square rounded-xl bg-black/5 mb-3" />
      <div className="h-3 w-2/3 bg-black/10 rounded mb-2" />
      <div className="h-3 w-1/3 bg-black/10 rounded" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-16 px-6">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
        <AlertTriangle className="text-red-500" size={26} />
      </div>
      <div>
        <p className="font-semibold text-brand-ink">Couldn't load this</p>
        <p className="text-sm text-brand-muted mt-1">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="mt-2 px-5 py-2.5 rounded-full bg-brand-purple text-white text-sm font-medium active:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-16 px-6">
      <div className="w-14 h-14 rounded-full bg-brand-purple-light flex items-center justify-center">
        <PackageSearch className="text-brand-purple" size={26} />
      </div>
      <div>
        <p className="font-semibold text-brand-ink">{title}</p>
        {description && <p className="text-sm text-brand-muted mt-1">{description}</p>}
      </div>
    </div>
  );
}
