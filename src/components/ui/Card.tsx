import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  const interactive = typeof onClick === 'function';
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-[0_2px_10px_rgba(20,10,50,0.06)] ${
        interactive ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
