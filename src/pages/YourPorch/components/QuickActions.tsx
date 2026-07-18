import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BookHeart,
  CalendarPlus,
  HeartPulse,
  PawPrint,
} from 'lucide-react';

interface QuickAction {
  label: string;
  description: string;
  to: string;
  icon: React.ReactNode;
}

const actions: QuickAction[] = [
  {
    label: 'Add a Memory',
    description: 'Save a moment from today',
    to: '/journal',
    icon: <BookHeart size={21} strokeWidth={1.8} />,
  },
  {
    label: 'Add a Reminder',
    description: 'Keep an important date close',
    to: '/reminders',
    icon: <CalendarPlus size={21} strokeWidth={1.8} />,
  },
  {
    label: 'Update Health',
    description: 'Add a medication or record',
    to: '/health',
    icon: <HeartPulse size={21} strokeWidth={1.8} />,
  },
  {
    label: 'Add a Dog',
    description: 'Welcome another dog home',
    to: '/profiles',
    icon: <PawPrint size={21} strokeWidth={1.8} />,
  },
];

const QuickActions: React.FC = () => {
  return (
    <section className="h-full rounded-[30px] border border-[#E8E1D8] bg-[#F8F1E6] p-6 shadow-[0_14px_35px_rgba(45,42,39,0.055)] sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7A7147]">
        Quick Add
      </p>

      <h2 className="mt-2 font-serif text-3xl font-semibold text-[#2D2A27]">
        Make yourself at home
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#2D2A27]/60">
        Add what matters without searching through the rest of the house.
      </p>

      <div className="mt-7 space-y-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="group flex items-center gap-4 rounded-[20px] border border-[#E7DCCB] bg-white/75 px-4 py-4 no-underline shadow-[0_6px_18px_rgba(45,42,39,0.035)] transition hover:-translate-y-0.5 hover:border-[#BF6A43]/30 hover:bg-white hover:shadow-[0_10px_24px_rgba(45,42,39,0.07)]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7E8DF] text-[#BF6A43]">
              {action.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-[#2D2A27]">
                {action.label}
              </h3>

              <p className="mt-0.5 truncate text-xs text-[#2D2A27]/50">
                {action.description}
              </p>
            </div>

            <ArrowUpRight
              size={17}
              className="shrink-0 text-[#BF6A43] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;