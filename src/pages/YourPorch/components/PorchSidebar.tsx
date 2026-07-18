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
    className="h-[48px] w-[48px] shrink-0"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="36"
      cy="36"
      r="32"
      fill="#FAF7F2"
      stroke="#BF6A43"
      strokeWidth="2.5"
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
      strokeWidth="5"
      strokeLinecap="round"
    />

    <path
      d="M25 36H47"
      stroke="#BF6A43"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

const PorchSidebar: React.FC = () => {
  const navigationClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group relative flex min-h-[54px] w-full items-center gap-[14px]',
      'rounded-[16px] px-3 py-1.5',
      'font-sans text-[17px] font-semibold leading-[1.2]',
      'transition-colors duration-200',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-[#BF6A43]/40 focus-visible:ring-offset-2',
      'focus-visible:ring-offset-[#FAF7F2]',
      isActive
        ? [
            'bg-[#DCE4D6]',
            'text-[#2D2A27]',
            'shadow-[0_5px_16px_rgba(45,42,39,0.08)]',
            'before:absolute before:bottom-2.5 before:left-0',
            'before:top-2.5 before:w-[4px] before:rounded-full',
            'before:bg-[#BF6A43]',
          ].join(' ')
        : [
            'text-[#403A35]',
            'hover:bg-[#F1ECE5]',
            'hover:text-[#2D2A27]',
          ].join(' '),
    ].join(' ');

  const renderNavigationItem = (item: NavigationItem) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.end}
      className={navigationClass}
    >
      <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center">
        <img
          src={item.iconPath}
          alt=""
          aria-hidden="true"
          className={[
            'h-[46px] w-[46px]',
            'object-contain',
            'mix-blend-multiply',
            'transition-transform duration-200',
            'group-hover:scale-[1.03]',
          ].join(' ')}
        />
      </span>

      <span className="min-w-0 flex-1">
        {item.label}
      </span>
    </NavLink>
  );

  return (
    <aside
      className={[
        'hidden h-screen w-[300px] min-w-[300px] flex-col',
        'border-r border-[#E8E1D8]',
        'bg-[#FAF7F2]',
        'lg:flex',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-[140px] shrink-0 items-center justify-center',
          'border-b border-[#E8E1D8]/80',
          'px-5 py-4',
        ].join(' ')}
      >
        <img
          src="/assets/branding/porchside-pet-life-brand.svg"
          alt="Porchside Pet Life"
          className="h-auto max-h-[118px] w-auto max-w-[130px] object-contain"
        />
      </div>

      <div
        className={[
          'min-h-0 flex-1 overflow-y-auto',
          'px-4 pb-4 pt-3',
          '[scrollbar-width:none]',
          '[&::-webkit-scrollbar]:hidden',
        ].join(' ')}
      >
        <nav
          aria-label="Main navigation"
          className="space-y-1"
        >
          {primaryNavigation.map(renderNavigationItem)}
        </nav>

        <div className="my-3 flex items-center gap-3 px-2">
          <div className="h-px flex-1 bg-[#D9CDBF]" />

          <p
            className={[
              'shrink-0 font-sans',
              'text-[11px] font-bold uppercase',
              'tracking-[0.18em] text-[#7A7147]',
            ].join(' ')}
          >
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

        <div className="my-3 h-px bg-[#D9CDBF]" />

        <NavLink
          to="/emergency"
          className={navigationClass}
        >
          <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center">
            <EmergencyIcon />
          </span>

          <span className="min-w-0 flex-1 text-[#9D4E31]">
            Emergency
          </span>
        </NavLink>

        <p
          className={[
            'px-4 pb-2 pt-4 text-center',
            'font-serif text-[14px] font-semibold italic',
            'leading-[1.4] text-[#7A7147]',
          ].join(' ')}
        >
          A warm home for every part of life with your dogs.
        </p>
      </div>
    </aside>
  );
};

export default PorchSidebar;