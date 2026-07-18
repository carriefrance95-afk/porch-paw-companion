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
  const cleanDogName = dogName?.trim();
  const hasDog = Boolean(cleanDogName);
  const displayName = firstName?.trim();

  const headline = displayName
    ? `${greeting}, ${displayName}.`
    : `${greeting}.`;

  const introduction = hasDog
    ? `Everything for life with ${cleanDogName} is gathered here.`
    : 'A warm home for every part of life with your dogs.';

  const statusHeading = hasDog
    ? reminderCount > 0
      ? `${reminderCount} ${
          reminderCount === 1 ? 'thing needs' : 'things need'
        } your attention.`
      : 'Everything is looking calm today.'
    : 'Your porch is ready to become their home.';

  const statusDetail = hasDog
    ? reminderCount > 0
      ? nextReminderLabel
        ? `Coming up next: ${nextReminderLabel}.`
        : 'Take a look at what is coming up around the house.'
      : `There is nothing that needs your attention for ${cleanDogName} right now.`
    : 'Add your first dog when you are ready, and we will begin keeping their care, routines, and memories together.';

  const dogInitial = cleanDogName?.charAt(0).toUpperCase();

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E8E1D8] bg-[#FFFDFC] shadow-[0_18px_45px_rgba(45,42,39,0.08)]">
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#DCE4D6]/55 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-36 right-8 h-72 w-72 rounded-full bg-[#BF6A43]/10 blur-3xl" />

      <div className="relative grid min-h-[270px] grid-cols-1 items-center gap-8 px-7 py-8 sm:px-9 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-11 lg:py-9">
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
                See what needs your attention
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>

        <div className="relative hidden min-h-[220px] items-center justify-center lg:flex">
          <div className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto h-14 w-[78%] rounded-[50%] bg-[#DCE4D6]/45 blur-2xl" />

          <svg
            aria-hidden="true"
            viewBox="0 0 170 250"
            className="pointer-events-none absolute bottom-0 right-0 h-[225px] w-[155px] text-[#7A7147]/18"
          >
            <path
              d="M87 233c2-47 0-91-8-132-7-35-20-65-41-89"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M78 178c-19-18-39-27-61-28 10 21 30 31 61 28Z"
              fill="currentColor"
            />

            <path
              d="M82 145c20-14 42-19 64-14-14 19-35 24-64 14Z"
              fill="currentColor"
            />

            <path
              d="M72 111c-18-16-37-24-58-23 10 20 29 28 58 23Z"
              fill="currentColor"
            />

            <path
              d="M65 78c16-14 35-20 55-17-11 18-29 24-55 17Z"
              fill="currentColor"
            />

            <path
              d="M52 48c-13-14-27-23-44-26 5 18 20 28 44 26Z"
              fill="currentColor"
            />

            <path
              d="M62 226h48l-7 20H69l-7-20Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>

          <div className="relative z-10 flex h-[210px] w-[210px] flex-col items-center justify-center rounded-full border border-[#D8D0C6] bg-[#FAF7F2]/95 shadow-[0_18px_40px_rgba(45,42,39,0.09)]">
            <div className="flex h-[116px] w-[116px] items-center justify-center rounded-full border border-[#BF6A43]/35 bg-white shadow-[inset_0_0_0_8px_rgba(250,247,242,0.9)]">
              {hasDog ? (
                <span className="font-serif text-6xl font-semibold text-[#BF6A43]">
                  {dogInitial}
                </span>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 64 64"
                  className="h-14 w-14 text-[#BF6A43]"
                  fill="none"
                >
                  <ellipse
                    cx="32"
                    cy="41"
                    rx="13"
                    ry="11"
                    fill="currentColor"
                    opacity="0.18"
                  />

                  <ellipse
                    cx="17"
                    cy="25"
                    rx="6"
                    ry="8"
                    transform="rotate(-22 17 25)"
                    fill="currentColor"
                    opacity="0.8"
                  />

                  <ellipse
                    cx="29"
                    cy="18"
                    rx="6"
                    ry="8"
                    transform="rotate(-7 29 18)"
                    fill="currentColor"
                    opacity="0.8"
                  />

                  <ellipse
                    cx="47"
                    cy="25"
                    rx="6"
                    ry="8"
                    transform="rotate(22 47 25)"
                    fill="currentColor"
                    opacity="0.8"
                  />

                  <ellipse
                    cx="38"
                    cy="18"
                    rx="6"
                    ry="8"
                    transform="rotate(7 38 18)"
                    fill="currentColor"
                    opacity="0.8"
                  />

                  <path
                    d="M21 42c0-8 5-14 11-14s11 6 11 14c0 7-5 11-11 11S21 49 21 42Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </div>

            <p className="mt-4 px-5 text-center font-serif text-lg font-semibold leading-snug text-[#2D2A27]">
              {hasDog ? `${cleanDogName}’s place` : 'Their place is waiting'}
            </p>

            <p className="mt-1 px-6 text-center text-xs leading-5 text-[#706963]">
              {hasDog
                ? 'Care, routines, and memories—all together.'
                : 'Add your dogs to make this porch their own.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;