import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationItem {
  label: string;
  path: string;
  iconPath: string;
  end?: boolean;
}

const primaryNavigation: NavigationItem[] = [
  {
    label: 'Your Porch',
    path: '/',
    iconPath: '/assets/icons/PEACE OF MIND.png',
    end: true,
  },
  {
    label: 'My Dogs',
    path: '/profiles',
    iconPath: '/assets/icons/meetyourdog.png',
  },
  {
    label: 'Health Center',
    path: '/health',
    iconPath: '/assets/icons/MAIN - HEALTH CENTER.png',
  },
  {
    label: 'Reminders',
    path: '/reminders',
    iconPath: '/assets/icons/WELLNESS.png',
  },
  {
    label: 'Journal & Memories',
    path: '/journal',
    iconPath: '/assets/icons/MEMORIES.png',
  },
];

const exploreNavigation: NavigationItem[] = [
  {
    label: 'Porch & Paw Kitchen',
    path: '/content',
    iconPath: '/assets/icons/NUTRITION.png',
  },
  {
    label: 'Travel',
    path: '/travel',
    iconPath: '/assets/icons/activity.png',
  },
  {
    label: 'Directory',
    path: '/directory',
    iconPath: '/assets/icons/VET VISITS.png',
  },
  {
    label: 'Boutique',
    path: '/store',
    iconPath: '/assets/icons/allset.png',
  },
];

const PorchSidebar: React.FC = () => {
  const navigationClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group flex min-h-[64px] w-full items-center gap-4 rounded-[20px]',
      'px-4 py-3 text-left text-[16px] font-semibold',
      'transition-all duration-200',
      isActive
        ? 'bg-[#DCE4D6] text-[#2D2A27] shadow-[0_8px_22px_rgba(45,42,39,0.08)]'
        : 'text-[#5F5852] hover:bg-white hover:text-[#2D2A27] hover:shadow-[0_6px_18px_rgba(45,42,39,0.06)]',
    ].join(' ');

  const renderNavigationItem = (item: NavigationItem) => {
    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.end}
        className={navigationClass}
      >
        {({ isActive }) => (
          <>
            <span
              className={[
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                'border transition-all duration-200',
                isActive
                  ? 'border-white/80 bg-white shadow-[0_5px_14px_rgba(45,42,39,0.08)]'
                  : 'border-[#E8E1D8] bg-[#F8F4EE] group-hover:bg-white',
              ].join(' ')}
            >
              <img
                src={item.iconPath}
                alt=""
                aria-hidden="true"
                className="h-9 w-9 object-contain"
              />
            </span>

            <span className="leading-tight">{item.label}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside className="hidden h-full w-[280px] min-w-[280px] flex-col border-r border-[#E8E1D8] bg-[#FAF7F2] px-5 py-7 lg:flex">
      <div className="mb-8 px-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D8CFC4] bg-white shadow-[0_6px_18px_rgba(45,42,39,0.08)]">
            <img
              src="/assets/icons/stitch-porch.svg"
              alt=""
              aria-hidden="true"
              className="h-9 w-9 object-contain"
            />
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
                'group flex min-h-[66px] w-full items-center gap-4 rounded-[20px]',
                'border px-4 py-3 text-[16px] font-semibold',
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
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border',
                    isActive
                      ? 'border-white/20 bg-white'
                      : 'border-[#F0D5C7] bg-white shadow-sm',
                  ].join(' ')}
                >
                  <img
                    src="/assets/icons/EMERGENCY.png"
                    alt=""
                    aria-hidden="true"
                    className="h-9 w-9 object-contain"
                  />
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