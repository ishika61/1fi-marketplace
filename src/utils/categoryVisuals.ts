import {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Gamepad2,
  Tv,
  type LucideIcon,
} from 'lucide-react';
import type { ProductCategory } from '../types';

interface CategoryVisual {
  icon: LucideIcon;
  gradient: string; // tailwind gradient classes
  label: string;
}

export const CATEGORY_VISUALS: Record<ProductCategory, CategoryVisual> = {
  mobiles: { icon: Smartphone, gradient: 'from-[#7C3AED] to-[#4C1D95]', label: 'Mobiles' },
  laptops: { icon: Laptop, gradient: 'from-[#6C2BD9] to-[#2E1065]', label: 'Laptops' },
  wearables: { icon: Watch, gradient: 'from-[#9333EA] to-[#581C87]', label: 'Wearables' },
  audio: { icon: Headphones, gradient: 'from-[#7E22CE] to-[#3B0764]', label: 'Audio' },
  gaming: { icon: Gamepad2, gradient: 'from-[#8B5CF6] to-[#4C1D95]', label: 'Gaming' },
  'tv-appliances': { icon: Tv, gradient: 'from-[#6D28D9] to-[#312E81]', label: 'TV & Appliances' },
};
