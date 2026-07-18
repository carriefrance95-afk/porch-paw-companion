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
    className="h-[52px] w-[52px]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="32"
      cy="32"
      r="29"
      fill={isActive ? '#FFFFFF' : '#FFF8F4'}
      stroke="#E7B9A4"
      strokeWidth="2"
    />

    <path
      d="M32 11L50 17.5V30.5C50 42 42.7 51.7 32 55.5C21.3 51.7 14 42 14 30.5V17.5L32 11Z"
      fill="#FFF3EC"
      stroke="#BF6A43"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    <path
      d="M32 21V42"
      stroke="#BF6A43"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <path
      d="M21.5 31.5H42.5"
      stroke="#BF6A43"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

const PorchSidebar: React.FC = () => {
  const navigationClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group flex min-h-[72px] w-full items-center gap-4',
      'rounded-[22px] px-3 py-2 text-left',
      'text-[17px] font-semibold leading-[1.2]',
      'transition-all duration-200',
      isActive
        ? 'bg-[#DCE4D6] text-[#2D2A27] shadow-[0_10px_26px_rgba(45,42,39,0.09)]'
        : 'text-[#514B46] hover:bg-white hover:text-[#2D2A27] hover:shadow-[0_7px_20px_rgba(45,42,39,0.06)]',
    ].join(' ');

  const renderNavigationItem = (item: NavigationItem) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.end}
      className={navigationClass}
    >
      <img
        src={item.iconPath}
        alt=""
        aria-hidden="true"
        className={[
          'h-[54px] w-[54px] shrink-0 rounded-full object-contain',
          'transition-transform duration-200',
          'group-hover:scale-[1.04]',
        ].join(' ')}
      />

      <span className="min-w-0 pr-2">
        {item.label}
      </span>
    </NavLink>
  );

  return (
    <aside
      className={[
        'hidden h-full w-[330px] min-w-[330px] flex-col',
        'border-r border-[#E8E1D8] bg-[#FAF7F2]',
        'px-5 pb-5 pt-5 lg:flex',
      ].join(' ')}
    >
      <div className="mb-6 px-2">
        <div className="flex items-center gap-4">
          <img
            src="/assets/branding/BRAND MARK.svg"
            alt="Porch & Paw brand mark"
            className="h-[70px] w-[82px] shrink-0 object-contain"
          />

          <div className="min-w-0">
            <p className="font-serif text-[27px] font-semibold leading-[0.95] text-[#2D2A27]">
              Porchside
            </p>

            <p className="mt-2 text-[14px] font-semibold uppercase tracking-[0.18em] text-[#7A7147]">
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
          '[scrollbar-width:thin]',
          '[scrollbar-color:#D8CFC4_transparent]',
        ].join(' ')}
      >
        <div className="space-y-2">
          {primaryNavigation.map(renderNavigationItem)}
        </div>

        <div className="my-6 h-px shrink-0 bg-[#E3DCD3]" />

        <div>
          <p className="mb-3 px-3 text-[12px] font-bold uppercase tracking-[0.22em] text-[#93887D]">
            More Rooms
          </p>

          <div className="space-y-2">
            {exploreNavigation.map(renderNavigationItem)}
          </div>
        </div>

        <div className="mt-6 border-t border-[#E3DCD3] pt-6">
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              [
                'group flex min-h-[74px] w-full items-center gap-4',
                'rounded-[22px] border px-3 py-2',
                'text-[17px] font-semibold transition-all duration-200',
                isActive
                  ? 'border-[#BF6A43] bg-[#BF6A43] text-white shadow-[0_12px_28px_rgba(191,106,67,0.22)]'
                  : 'border-[#E2C7B8] bg-[#FFF8F4] text-[#9B4F31] hover:border-[#BF6A43] hover:bg-[#FFF3EC]',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <EmergencyIcon isActive={isActive} />
                <span>Emergency</span>
              </>
            )}
          </NavLink>

          <p className="mx-auto mt-4 max-w-[250px] px-2 text-center text-[12px] leading-[1.55] text-[#93887D]">
            A warm home for every part of life with your dogs.
          </p>
        </div>
      </nav>
    </aside>
  );
};

export default PorchSidebar;