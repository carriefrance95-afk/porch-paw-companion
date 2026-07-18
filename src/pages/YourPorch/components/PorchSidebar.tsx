import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AlertTriangle,
  Bell,
  BookHeart,
  ChefHat,
  HeartPulse,
  Home,
  MapPinned,
  PawPrint,
  Plane,
  ShoppingBag,
} from 'lucide-react';

type NavigationItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  end?: boolean;
};

const primaryNavigation: NavigationItem[] = [
  {
    label: 'Your Porch',
    path: '/',
    icon: Home,
    end: true,
  },
  {
    label: 'My Dogs',
    path: '/profiles',
    icon: PawPrint,
  },
  {
    label: 'Health Center',
    path: '/health',
    icon: HeartPulse,
  },
  {
    label: 'Reminders',
    path: '/reminders',
    icon: Bell,
  },
  {
    label: 'Journal & Memories',
    path: '/journal',
    icon: BookHeart,
  },
];

const exploreNavigation: NavigationItem[] = [
  {
    label: 'Porch & Paw Kitchen',
    path: '/content',
    icon: ChefHat,
  },
  {
    label: 'Travel',
    path: '/travel',
    icon: Plane,
  },
  {
    label: 'Directory',
    path: '/directory',
    icon: MapPinned,
  },
  {
    label: 'Boutique',
    path: '/store',
    icon: ShoppingBag,
  },
];

const PorchSidebar: React.FC = () => {
  const getNavigationClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group flex min-h-[62px] w-full items-center gap-4 rounded-[20px]',
      'px-5 py-3 text-left text-[16px] font-semibold',
      'transition-all duration-200',
      isActive
        ? 'bg-[#DCE4D6] text-[#2D2A27] shadow-[0_8px_22px_rgba(45,42,39,0.08)]'
        : 'text-[#5F5852] hover:bg-white hover:text-[#2D2A27] hover:shadow-[0_6px_18px_rgba(45,42,39,0.06)]',
    ].join(' ');

  const renderNavigationItem = (item: NavigationItem) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.end}
        className={getNavigationClass}
      >
        {({ isActive }) => (
          <>
            <span
              className={[
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                'transition-all duration-200',
                isActive
                  ? 'bg-white text-[#BF6A43] shadow-sm'
                  : 'bg-[#F3EEE7] text-[#7A7147] group-hover:bg-[#FAF7F2] group-hover:text-[#BF6A43]',
              ].join(' ')}
            >
              <Icon size={23} strokeWidth={1.8} />
            </span>

            <span className="leading-tight">{item.label}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      className="
        hidden
        h-full
        w-[280px]
        min-w-[280px]
        flex-col
        border-r
        border-[#E8E1D8]
        bg-[#FAF7F2]
        px-5
        py-7
        lg:flex
      "
    >
      <div className="mb-8 px-3">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-[#D8CFC4]
              bg-white
              text-[#BF6A43]
              shadow-[0_6px_18px_rgba(45,42,39,0.08)]
            "
          >
            <PawPrint size={25} strokeWidth={1.7} />
          </div>

          <div>
            <p className="font-serif text-[21px] font-semibold leading-none text-[#2D2A27]">
              Porchside
            </p>

            <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.18em] text-[#7A7147]">
              Pet Life
            </p>
          </div>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className="flex min-h-0 flex-1 flex-col overflow-y-auto pr-1"
      >
        <div className="space-y-2">
          {primaryNavigation.map(renderNavigationItem)}
        </div>

        <div className="my-7 h-px bg-[#E8E1D8]" />

        <div>
          <p className="mb-3 px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A9086]">
            More Rooms
          </p>

          <div className="space-y-2">
            {exploreNavigation.map(renderNavigationItem)}
          </div>
        </div>

        <div className="mt-auto pt-7">
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              [
                'group flex min-h-[64px] w-full items-center gap-4 rounded-[20px]',
                'border px-5 py-3 text-[16px] font-semibold',
                'transition-all duration-200',
                isActive
                  ? 'border-[#BF6A43] bg-[#BF6A43] text-white shadow-[0_10px_24px_rgba(191,106,67,0.22)]'
                  : 'border-[#E2C7B8] bg-[#FFF8F4] text-[#9B4F31] hover:border-[#BF6A43] hover:bg-[#FFF3EC]',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'bg-white text-[#BF6A43] shadow-sm',
                  ].join(' ')}
                >
                  <AlertTriangle size={23} strokeWidth={1.8} />
                </span>

                <span>Emergency</span>
              </>
            )}
          </NavLink>

          <p className="mt-5 px-4 text-center text-[11px] leading-relaxed text-[#9A9086]">
            A warm home for every part of life with your dogs.
          </p>
        </div>
      </nav>
    </aside>
  );
};

export default PorchSidebar;