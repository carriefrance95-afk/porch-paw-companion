import React from 'react';

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
  firstName,
  dogName,
  reminderCount = 0,
  nextReminderLabel,
  onViewReminders,
}) => {
  const greeting = getGreeting();
  const hasDog = Boolean(dogName?.trim());
  const displayName = firstName?.trim();

  const headline = displayName
    ? `${greeting}, ${displayName}.`
    : `${greeting}.`;

  const introduction = hasDog
    ? `${dogName} has been keeping an eye on things.`
    : 'Your new home for life with your dogs is ready.';

  const statusHeading = hasDog
    ? reminderCount > 0
      ? `${reminderCount} ${
          reminderCount === 1 ? 'thing is' : 'things are'
        } waiting for you.`
      : 'Everything is looking calm today.'
    : 'There is plenty of room here for your best friends.';

  const statusDetail = hasDog
    ? reminderCount > 0
      ? nextReminderLabel
        ? `Coming up next: ${nextReminderLabel}.`
        : 'Take a look at what is coming up around the house.'
      : `There is nothing that needs your attention for ${dogName} right now.`
    : 'When you are ready, add your first dog and we will begin gathering everything that matters in one place.';

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E8E1D8] bg-[#FFFDFC] shadow-[0_18px_45px_rgba(45,42,39,0.08)]">
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#DCE4D6]/55 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-[#BF6A43]/10 blur-3xl" />

      <svg
        aria-hidden="true"
        viewBox="0 0 180 260"
        className="pointer-events-none absolute -right-3 top-0 hidden h-full w-[180px] text-[#7A7147]/10 lg:block"
      >
        <path
          d="M139 251c-1-53-5-98-22-136-14-31-35-58-69-86"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M111 104c22-6 39-20 47-41-22 1-39 14-47 41Z"
          fill="currentColor"
        />
        <path
          d="M92 74c-2-22-12-40-30-54-5 23 5 42 30 54Z"
          fill="currentColor"
        />
        <path
          d="M127 151c21-4 37-16 48-35-22-2-40 10-48 35Z"
          fill="currentColor"
        />
        <path
          d="M104 129c-6-20-19-35-39-45 0 22 13 38 39 45Z"
          fill="currentColor"
        />
        <path
          d="M136 202c18-3 32-13 41-29-19-2-34 8-41 29Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative grid min-h-[270px] grid-cols-1 items-center gap-7 px-7 py-8 sm:px-9 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-11 lg:py-9">
        <div className="relative z-20 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#7A7147]">
            Your Porch
          </p>

          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-[#2D2A27] sm:text-5xl">
            {headline}
          </h1>

          <p className="mt-3 font-serif text-xl leading-snug text-[#2D2A27]/80 sm:text-2xl">
            {introduction}
          </p>

          <div className="mt-7 max-w-xl border-l-2 border-[#BF6A43]/45 pl-5">
            <p className="font-serif text-xl font-semibold leading-snug text-[#2D2A27]">
              {statusHeading}
            </p>

            <p className="mt-1.5 max-w-lg text-sm leading-6 text-[#655F59]">
              {statusDetail}
            </p>

            {hasDog && reminderCount > 0 && onViewReminders && (
              <button
                type="button"
                onClick={onViewReminders}
                className="mt-3 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-[#BF6A43] transition hover:gap-3 hover:text-[#A95C39] focus:outline-none focus:ring-2 focus:ring-[#BF6A43]/20 focus:ring-offset-4"
              >
                See what is waiting for today
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>

        <div className="relative flex min-h-[205px] items-end justify-center lg:min-h-[235px] lg:justify-end">
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-14 w-[82%] -translate-x-1/2 rounded-[50%] bg-[#DCE4D6]/70 blur-xl" />

          {hasDog ? (
            <img
              src="/assets/stitch/stitch-porch-home.svg"
              alt={`${dogName} resting comfortably at home`}
              className="relative z-10 max-h-[245px] w-auto max-w-full object-contain drop-shadow-[0_16px_16px_rgba(45,42,39,0.13)] sm:max-h-[265px] lg:-mb-3 lg:max-h-[285px]"
            />
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/assets/icons/meetyourdog.png"
                alt="A warm welcome for your dogs"
                className="h-[170px] w-[170px] object-contain drop-shadow-[0_14px_18px_rgba(45,42,39,0.12)] sm:h-[190px] sm:w-[190px] lg:h-[210px] lg:w-[210px]"
              />

              <p className="mt-2 max-w-[220px] text-center font-serif text-lg leading-snug text-[#7A7147]">
                Your porch is ready whenever they are.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;