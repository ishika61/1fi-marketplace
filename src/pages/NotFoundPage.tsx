import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-20 px-6">
      <div className="w-14 h-14 rounded-full bg-brand-purple-light flex items-center justify-center">
        <CompassIcon className="text-brand-purple" size={26} />
      </div>
      <div>
        <p className="font-semibold text-brand-ink">Page not found</p>
        <p className="text-sm text-brand-muted mt-1">
          That page doesn't exist. Let's get you back on track.
        </p>
      </div>
      <Link
        to="/"
        className="mt-2 px-5 py-2.5 rounded-full bg-brand-purple text-white text-sm font-medium"
      >
        Go to Home
      </Link>
    </div>
  );
}
