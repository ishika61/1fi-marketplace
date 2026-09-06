import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: ReactNode;
  /** Set true for screens with their own full-bleed hero background */
  noPadding?: boolean;
}

export function AppShell({ children, noPadding }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#E9E4F5] flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-brand-bg relative pb-24 shadow-2xl">
        <div className={noPadding ? '' : 'px-4 pt-4'}>{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
