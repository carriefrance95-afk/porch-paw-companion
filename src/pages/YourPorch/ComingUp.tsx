import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Syringe,
} from 'lucide-react';

export interface ComingUpItem {
  id: string;
  title: string;
  dateLabel: string;
  dogName?: string;
  time?: string;
  detail?: string;
  type?: 'appointment' | 'medication' | 'vaccine' | 'general';
}

interface ComingUpProps {
  items?: ComingUpItem[];
}

const getItemIcon = (type: ComingUpItem['type']) => {
  switch (type) {
    case 'appointment':
      return <HeartPulse size={20} strokeWidth={1.8} />;

    case 'medication':
      return <Clock3 size={20} strokeWidth={1.8} />;

    case 'vaccine':
      return <Syringe size={20} strokeWidth={1.8} />;

    default:
      return <CalendarDays size={20} strokeWidth={1.8} />;
  }
};

const ComingUp: React.FC<ComingUpProps> = ({ items = [] }) => {
  const visibleItems = items.slice(0, 4);

  return (
    <section className="h-full rounded-[30px] border border-[#E8E1D8] bg-white p-6 shadow-[0_14px_35px_rgba(45,42,39,0.06)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7A7147]">
            Coming Up
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#2D2A27]">
            What needs your attention
          </h2>
        </div>

        <Link
          to="/reminders"
          className="hidden items-center gap-2 rounded-full border border-[#E8E1D8] bg-[#FAF7F2] px-4 py-2 text-sm font-semibold text-[#2D2A27] no-underline transition hover:border-[#BF6A43]/35 hover:text-[#BF6A43] sm:inline-flex"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      {visibleItems.length === 0 ? (
        <div className="mt-7 flex min-h-[250px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D5DDCF] bg-[#F5F8F2] px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#CFD9C9] bg-white text-[#7A7147] shadow-[0_8px_20px_rgba(45,42,39,0.06)]">
            <CheckCircle2 size={25} strokeWidth={1.7} />
          </div>

          <h3 className="mt-5 font-serif text-2xl font-semibold text-[#2D2A27]">
            Everything looks calm.
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#2D2A27]/60">
            Nothing is coming up right now. Enjoy the quiet and spend a little
            extra time with your dogs.
          </p>

          <Link
            to="/reminders"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#BF6A43] px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-[0_8px_18px_rgba(191,106,67,0.2)] transition hover:-translate-y-0.5 hover:bg-[#A95C39]"
          >
            Add a reminder
            <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="mt-7 divide-y divide-[#E8E1D8]">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 py-5 first:pt-0 sm:grid-cols-[120px_1fr_auto] sm:items-center"
            >
              <div>
                <p className="text-sm font-bold text-[#BF6A43]">
                  {item.dateLabel}
                </p>

                {item.time && (
                  <p className="mt-1 text-xs font-medium text-[#2D2A27]/50">
                    {item.time}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D5DDCF] bg-[#F5F8F2] text-[#7A7147]">
                  {getItemIcon(item.type)}
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#2D2A27]">
                    {item.title}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#2D2A27]/55">
                    {item.dogName && <span>{item.dogName}</span>}
                    {item.detail && <span>{item.detail}</span>}
                  </div>
                </div>
              </div>

              <Link
                to="/reminders"
                aria-label={`View ${item.title}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-[#BF6A43] no-underline transition hover:translate-x-1 hover:bg-[#F7E8DF]"
              >
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      )}

      <Link
        to="/reminders"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#BF6A43] no-underline sm:hidden"
      >
        View all reminders
        <ArrowRight size={15} />
      </Link>
    </section>
  );
};

export default ComingUp;