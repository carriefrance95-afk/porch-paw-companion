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

const secondaryNavigation: NavigationItem[] = [
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

const EmergencyIcon: React.FC = () => (
  <svg
    viewBox="0 0 72 72"
    aria-hidden="true"
    className="h-[68px] w-[68px] shrink-0"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="36"
      cy="36"
      r="33"
      fill="#FAF7F2"
      stroke="#BF6A43"
      strokeWidth="2.4"
    />

    <path
      d="M36 14L55 21V34.5C55 47 47.2 57.2 36 61C24.8 57.2 17 47 17 34.5V21L36 14Z"
      fill="#F4E7DE"
      stroke="#BF6A43"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    <path
      d="M36 25V47"
      stroke="#BF6A43"
      strokeWidth="5.5"
      strokeLinecap="round"
    />

    <path
      d="M25 36H47"
      stroke="#BF6A43"
      strokeWidth="5.5"
      strokeLinecap="round"
    />
  </svg>
);

const PorchSidebar: React.FC = () => {
  const navigationClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group flex w-full items-center gap-4',
      'rounded-[22px] px-3 py-2',
      'text-[20px] font-bold leading-tight',
      'transition-all duration-200',
      isActive
        ? 'bg-[#DCE4D6] text-[#2D2A27] shadow-[0_8px_22px_rgba(45,42,39,0.08)]'
        : 'text-[#403A35] hover:bg-[#F3EEE7] hover:text-[#2D2A27]',
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
        className="h-[68px] w-[68px] shrink-0 object-contain"
      />

      <span className="min-w-0 flex-1">
        {item.label}
      </span>
    </NavLink>
  );

  return (
    <aside
      className={[
        'hidden h-screen w-[350px] min-w-[350px] flex-col',
        'border-r border-[#E8E1D8]',
        'bg-[#FAF7F2]',
        'lg:flex',
      ].join(' ')}
    >
      <div className="shrink-0 px-5 pb-3 pt-5">
        <img
          src="/assets/branding/BRAND MARK 2.svg"
          alt="Porchside Pet Life by Porch & Paw"
          className="mx-auto h-auto w-full max-w-[265px] object-contain"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-5">
        <nav
          aria-label="Main navigation"
          className="space-y-1"
        >
          {primaryNavigation.map(renderNavigationItem)}
        </nav>

        <div className="my-5 flex items-center gap-3 px-2">
          <div className="h-px flex-1 bg-[#D9CDBF]" />

          <p className="shrink-0 text-[14px] font-bold uppercase tracking-[0.18em] text-[#7A7147]">
            More Rooms
          </p>

          <div className="h-px flex-1 bg-[#D9CDBF]" />
        </div>

        <nav
          aria-label="More rooms"
          className="space-y-1"
        >
          {secondaryNavigation.map(renderNavigationItem)}
        </nav>

        <div className="my-5 h-px bg-[#D9CDBF]" />

        <NavLink
          to="/emergency"
          className={navigationClass}
        >
          <EmergencyIcon />

          <span className="min-w-0 flex-1">
            Emergency
          </span>
        </NavLink>

        <p className="px-5 pb-3 pt-5 text-center font-serif text-[16px] font-semibold italic leading-relaxed text-[#7A7147]">
          A warm home for every part of life with your dogs.
        </p>
      </div>
    </aside>
  );
};

export default PorchSidebar;