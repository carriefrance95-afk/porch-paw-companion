import React from 'react';
import { ArrowRight, Bell } from 'lucide-react';

interface WelcomeHeroProps {
  firstName?: string;
  dogName?: string;
  reminderCount?: number;
  nextReminderLabel?: string;
  onViewReminders?: () => void;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';

  return 'Good evening';
};

const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  firstName = 'Carrie',
  dogName = 'Stitch',
  reminderCount = 0,
  nextReminderLabel,
  onViewReminders,
}) => {
  const greeting = getGreeting();

  const statusMessage =
    reminderCount > 0
      ? `You have ${reminderCount} ${
          reminderCount === 1 ? 'thing' : 'things'
        } coming up${nextReminderLabel ? `, including ${nextReminderLabel}` : ''}.`
      : `Nothing needs your attention right now. Everything with ${dogName} is looking calm.`;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E8E1D8] bg-[#FFFDFC] shadow-[0_18px_45px_rgba(45,42,39,0.08)]">
      <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#DCE4D6]/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-8 h-64 w-64 rounded-full bg-[#BF6A43]/10 blur-3xl" />

      <div className="relative grid min-h-[250px] grid-cols-1 items-center gap-6 px-7 py-8 sm:px-9 lg:grid-cols-[1fr_390px] lg:px-11 lg:py-9">
        <div className="relative z-20 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#7A7147]">
            Your Porch
          </p>

          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-[#2D2A27] sm:text-5xl">
            {greeting}, {firstName}.
          </h1>

          <p className="mt-3 font-serif text-xl text-[#2D2A27]/80 sm:text-2xl">
            {dogName} has everything gathered for you.
          </p>

          <div className="mt-6 flex max-w-xl items-start gap-3 rounded-[22px] border border-[#DCE4D6] bg-white/75 px-4 py-3.5 shadow-[0_8px_24px_rgba(45,42,39,0.05)] backdrop-blur-sm">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCE4D6] text-[#7A7147]">
              <Bell size={17} strokeWidth={2} />
            </div>

            <div>
              <p className="text-sm font-semibold leading-6 text-[#2D2A27]">
                {statusMessage}
              </p>

              {reminderCount > 0 && onViewReminders && (
                <button
                  type="button"
                  onClick={onViewReminders}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#BF6A43] transition hover:gap-2.5 hover:text-[#A95C39] focus:outline-none focus:ring-2 focus:ring-[#BF6A43]/20"
                >
                  View what&apos;s coming up
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[210px] items-end justify-center lg:min-h-[225px] lg:justify-end">
          <div className="absolute bottom-1 left-1/2 h-16 w-[88%] -translate-x-1/2 rounded-[50%] bg-[#DCE4D6]/65 blur-xl" />

          <img
            src="/assets/stitch/stitch-porch-home.svg"
            alt={`${dogName} resting comfortably`}
            className="relative z-10 max-h-[245px] w-auto max-w-full object-contain drop-shadow-[0_16px_16px_rgba(45,42,39,0.14)] sm:max-h-[265px] lg:-mb-3 lg:max-h-[285px]"
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;