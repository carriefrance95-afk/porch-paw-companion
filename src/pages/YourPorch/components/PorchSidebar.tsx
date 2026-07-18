import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationItem {
  label: string;
  path: string;
  iconPath: string;
  end?: boolean;
  iconScale?: string;
}

const primaryNavigation: NavigationItem[] = [
  {
    label: 'Your Porch',
    path: '/',
    iconPath: '/assets/icons/PEACE OF MIND.png',
    end: true,
    iconScale: 'scale-[1.7]',
  },
  {
    label: 'My Dogs',
    path: '/profiles',
    iconPath: '/assets/icons/meetyourdog.png',
    iconScale: 'scale-[1.7]',
  },
  {
    label: 'Health Center',
    path: '/health',
    iconPath: '/assets/icons/MAIN - HEALTH CENTER.png',
    iconScale: 'scale-[1.7]',
  },
  {
    label: 'Reminders',
    path: '/reminders',
    iconPath: '/assets/icons/WELLNESS.png',
    iconScale: 'scale-[1.7]',
  },
  {
    label: 'Journal & Memories',
    path: '/journal',
    iconPath: '/assets/icons/MEMORIES.png',
    iconScale: 'scale-[1.7]',
  },
];

const exploreNavigation: NavigationItem[] = [
  {
    label: 'Porch & Paw Kitchen',
    path: '/content',
    iconPath: '/assets/icons/NUTRITION.png',
    iconScale: 'scale-[1.7]',
  },
  {
    label: 'Travel',
    path: '/travel',
    iconPath: '/assets/icons/activity.png',
    iconScale: 'scale-[1.7]',
  },
  {
    label: 'Directory',
    path: '/directory',
    iconPath: '/assets/icons/VET VISITS.png',
    iconScale: 'scale-[1.7]',
  },
  {
    label: 'Boutique',
    path: '/store',
    iconPath: '/assets/icons/allset.png',
    iconScale: 'scale-[1.7]',
  },
];

const EmergencyIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className="h-[50px] w-[50px]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 5L55 13.5V30C55 44.5 45.6 56.8 32 61C18.4 56.8 9 44.5 9 30V13.5L32 5Z"
      fill={isActive ? '#FFFFFF' : '#FFF3EC'}
      stroke="#BF6A43"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />

    <path
      d="M32 17V45"
      stroke="#BF6A43"
      strokeWidth="6.5"
      strokeLinecap="round"
    />

    <path
      d="M18 31H46"
      stroke="#BF6A43"
      strokeWidth="6.5"
      strokeLinecap="round"
    />
  </svg>
);

const PorchSidebar: React.FC = () => {
  const navigationClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group flex min-h-[78px] w-full items-center gap-5',
      'rounded-[22px] px-4 py-2.5 text-left',
      'text-[18px] font-semibold leading-[1.2]',
      'transition-all duration-200',
      isActive
        ? 'bg-[#DCE4D6] text-[#2D2A27] shadow-[0_10px_28px_rgba(45,42,39,0.09)]'
        : 'text-[#5F5852] hover:bg-white hover:text-[#2D2A27] hover:shadow-[0_8px_24px_rgba(45,42,39,0.07)]',
    ].join(' ');

  const renderNavigationItem = (item: NavigationItem) => (
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
              'flex h-[60px] w-[60px] shrink-0 items-center justify-center',
              'overflow-hidden rounded-[18px] border',
              'transition-all duration-200',
              isActive
                ? 'border-white/90 bg-white shadow-[0_7px_18px_rgba(45,42,39,0.10)]'
                : 'border-[#E8E1D8] bg-[#F8F4EE] group-hover:border-[#DED5CA] group-hover:bg-white',
            ].join(' ')}
          >
            <img
              src={item.iconPath}
              alt=""
              aria-hidden="true"
              className={[
                'h-full w-full object-contain',
                'transition-transform duration-200',
                item.iconScale ?? 'scale-[1.65]',
              ].join(' ')}
            />
          </span>

          <span className="min-w-0 pr-2">
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    <aside
      className={[
        'hidden h-full w-[340px] min-w-[340px] flex-col',
        'border-r border-[#E8E1D8] bg-[#FAF7F2]',
        'px-5 pb-5 pt-6 lg:flex',
      ].join(' ')}
    >
      <div className="mb-7 px-1">
        <div className="flex items-center gap-4">
          <div
            className={[
              'flex h-[82px] w-[82px] shrink-0 items-center justify-center',
              'overflow-hidden rounded-[22px]',
              'border border-[#DED5CA] bg-white',
              'shadow-[0_8px_22px_rgba(45,42,39,0.10)]',
            ].join(' ')}
          >
            <img
              src="/assets/branding/BRAND MARK.svg"
              alt="Porch & Paw brand mark"
              className="h-full w-full scale-[1.45] object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="font-serif text-[28px] font-semibold leading-[0.95] text-[#2D2A27]">
              Porchside
            </p>

            <p className="mt-2 text-[15px] font-semibold uppercase tracking-[0.16em] text-[#7A7147]">
              Pet Life
            </p>

            <p className="mt-2 text-[13px] font-medium text-[#9A7362]">
              by Porch &amp; Paw
            </p>
          </div>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className={[
          'flex min-h-0 flex-1 flex-col overflow-y-auto pr-1',
          '[scrollbar-width:thin]',
          '[scrollbar-color:#D8CFC4_transparent]',
        ].join(' ')}
      >
        <div className="space-y-3">
          {primaryNavigation.map(renderNavigationItem)}
        </div>

        <div className="my-7 h-px shrink-0 bg-[#E3DCD3]" />

        <div>
          <p className="mb-4 px-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#93887D]">
            More Rooms
          </p>

          <div className="space-y-3">
            {exploreNavigation.map(renderNavigationItem)}
          </div>
        </div>

        <div className="mt-7 border-t border-[#E3DCD3] pt-7">
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              [
                'group flex min-h-[80px] w-full items-center gap-5',
                'rounded-[22px] border px-4 py-2.5',
                'text-[18px] font-semibold',
                'transition-all duration-200',
                isActive
                  ? 'border-[#BF6A43] bg-[#BF6A43] text-white shadow-[0_12px_30px_rgba(191,106,67,0.24)]'
                  : 'border-[#E2C7B8] bg-[#FFF8F4] text-[#9B4F31] hover:border-[#BF6A43] hover:bg-[#FFF3EC] hover:shadow-[0_9px_24px_rgba(191,106,67,0.12)]',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    'flex h-[60px] w-[60px] shrink-0 items-center justify-center',
                    'overflow-hidden rounded-[18px] border',
                    isActive
                      ? 'border-white/40 bg-white'
                      : 'border-[#F0D5C7] bg-white shadow-[0_6px_16px_rgba(155,79,49,0.08)]',
                  ].join(' ')}
                >
                  <EmergencyIcon isActive={isActive} />
                </span>

                <span>Emergency</span>
              </>
            )}
          </NavLink>

          <p className="mx-auto mt-5 max-w-[260px] px-2 text-center text-[12px] leading-[1.6] text-[#93887D]">
            A warm home for every part of life with your dogs.
          </p>
        </div>
      </nav>
    </aside>
  );
};

export default PorchSidebar;