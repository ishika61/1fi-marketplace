import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Receipt, TrendingUp, User } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/shop', label: 'Shop', icon: ShoppingBag },
  { to: '/emi-dues', label: 'EMI Dues', icon: Receipt },
  { to: '/limit', label: 'Limit', icon: TrendingUp },
  { to: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-md bg-white border-t border-black/5 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex justify-between">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-1 text-[11px] font-medium ${
                isActive ? 'text-brand-purple' : 'text-brand-muted'
              }`
            }
          >
            <Icon size={20} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
