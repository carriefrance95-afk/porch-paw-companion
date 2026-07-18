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

const EmergencyIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className="h-[42px] w-[42px]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 6.5L53 14.2V29.3C53 42.6 44.4 53.9 32 58C19.6 53.9 11 42.6 11 29.3V14.2L32 6.5Z"
      fill={isActive ? '#FFF8F4' : '#F8E9E1'}
      stroke={isActive ? '#BF6A43' : '#BF6A43'}
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    <path
      d="M32 18V42"
      stroke="#BF6A43"
      strokeWidth="6"
      strokeLinecap="round"
    />

    <path
      d="M20 30H44"
      stroke="#BF6A43"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

const PorchSidebar: React.FC = () => {
  const navigationClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group flex min-h-[74px] w-full items-center gap-[18px]',
      'rounded-[22px] px-[14px] py-[9px] text-left',
      'text-[17px] font-semibold leading-[1.2]',
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
              'flex h-[56px] w-[56px] shrink-0 items-center justify-center',
              'rounded-[18px] border transition-all duration-200',
              isActive
                ? 'border-white/90 bg-white shadow-[0_7px_18px_rgba(45,42,39,0.10)]'
                : 'border-[#E8E1D8] bg-[#F8F4EE] group-hover:border-[#DED5CA] group-hover:bg-white',
            ].join(' ')}
          >
            <img
              src={item.iconPath}
              alt=""
              aria-hidden="true"
              className="h-[44px] w-[44px] object-contain"
            />
          </span>

          <span className="min-w-0 pr-1">{item.label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <aside
      className={[
        'hidden h-full w-[330px] min-w-[330px] flex-col',
        'border-r border-[#E8E1D8] bg-[#FAF7F2]',
        'px-[18px] pb-5 pt-6 lg:flex',
      ].join(' ')}
    >
      <div className="mb-6 px-2">
        <div className="flex items-center gap-4">
          <div
            className={[
              'flex h-[72px] w-[72px] shrink-0 items-center justify-center',
              'overflow-hidden rounded-[22px] border border-[#DED5CA]',
              'bg-white shadow-[0_8px_22px_rgba(45,42,39,0.10)]',
            ].join(' ')}
          >
            <img
              src="/assets/branding/BRAND MARK.svg"
              alt="Porch & Paw brand mark"
              className="h-[64px] w-[64px] object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="font-serif text-[25px] font-semibold leading-[0.98] text-[#2D2A27]">
              Porchside
            </p>

            <p className="mt-1.5 text-[14px] font-semibold uppercase tracking-[0.16em] text-[#7A7147]">
              Pet Life
            </p>

            <p className="mt-1.5 text-[12px] font-medium text-[#9A7362]">
              by Porch &amp; Paw
            </p>
          </div>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className={[
          'flex min-h-0 flex-1 flex-col overflow-y-auto pr-1',
          '[scrollbar-width:thin] [scrollbar-color:#D8CFC4_transparent]',
        ].join(' ')}
      >
        <div className="space-y-2.5">
          {primaryNavigation.map(renderNavigationItem)}
        </div>

        <div className="my-7 h-px shrink-0 bg-[#E3DCD3]" />

        <div>
          <p className="mb-3.5 px-4 text-[12px] font-bold uppercase tracking-[0.22em] text-[#93887D]">
            More Rooms
          </p>

          <div className="space-y-2.5">
            {exploreNavigation.map(renderNavigationItem)}
          </div>
        </div>

        <div className="mt-7 border-t border-[#E3DCD3] pt-7">
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              [
                'group flex min-h-[76px] w-full items-center gap-[18px]',
                'rounded-[22px] border px-[14px] py-[9px]',
                'text-[17px] font-semibold transition-all duration-200',
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
                    'flex h-[56px] w-[56px] shrink-0 items-center justify-center',
                    'rounded-[18px] border transition-all duration-200',
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

          <p className="mx-auto mt-5 max-w-[250px] px-2 text-center text-[12px] leading-[1.6] text-[#93887D]">
            A warm home for every part of life with your dogs.
          </p>
        </div>
      </nav>
    </aside>
  );
};

export default PorchSidebar;