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
  const displayName = firstName?.trim();
  const cleanDogName = dogName?.trim();
  const hasDog = Boolean(cleanDogName);
  const hasReminders = reminderCount > 0;

  const headline = displayName
    ? `${greeting}, ${displayName}.`
    : `${greeting}.`;

  const introduction = hasDog
    ? `Everything for life with ${cleanDogName} is gathered here.`
    : 'Everything for life with your dogs is gathered here.';

  const statusHeading = hasDog
    ? hasReminders
      ? `${reminderCount} ${
          reminderCount === 1 ? 'thing needs' : 'things need'
        } your attention.`
      : 'Everything looks calm today.'
    : 'Your porch is ready for your dogs.';

  const statusDetail = hasDog
    ? hasReminders
      ? nextReminderLabel
        ? `Coming up next: ${nextReminderLabel}.`
        : 'Take a look at the care, appointments, or routines coming up.'
      : `There are no medications, appointments, or reminders needing attention for ${cleanDogName} right now.`
    : 'Add your first dog to begin keeping their care, routines, important details, and memories together.';

  const dogInitial = cleanDogName?.charAt(0).toUpperCase();

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#DED6CB] bg-[#FFFDFC] shadow-[0_18px_45px_rgba(45,42,39,0.08)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#DCE4D6]/45 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-10 h-64 w-64 rounded-full bg-[#BF6A43]/10 blur-3xl"
      />

      <div className="relative grid grid-cols-1 gap-7 px-7 py-8 sm:px-9 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-stretch lg:px-10 lg:py-9">
        <div className="relative z-10 flex flex-col justify-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#7A7147]">
            Your Porch
          </p>

          <h1 className="font-serif text-[2.7rem] font-semibold leading-[1.02] text-[#2D2A27] sm:text-5xl">
            {headline}
          </h1>

          <p className="mt-3 max-w-3xl font-serif text-xl leading-snug text-[#554F49] sm:text-[1.45rem]">
            {introduction}
          </p>

          <div className="mt-6 max-w-3xl rounded-2xl border border-[#E5DED4] bg-white/75 px-5 py-4 shadow-[0_8px_22px_rgba(45,42,39,0.04)]">
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  hasReminders
                    ? 'bg-[#BF6A43]/12 text-[#BF6A43]'
                    : 'bg-[#DCE4D6] text-[#59624F]'
                }`}
              >
                {hasReminders ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 8v5" />
                    <path d="M12 17h.01" />
                    <path d="M10.3 3.7 2.7 17a2 2 0 0 0 1.74 3h15.12a2 2 0 0 0 1.74-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                )}
              </div>

              <div className="min-w-0">
                <p className="font-serif text-xl font-semibold leading-snug text-[#2D2A27]">
                  {statusHeading}
                </p>

                <p className="mt-1 text-[15px] leading-6 text-[#655F59]">
                  {statusDetail}
                </p>

                {hasDog && hasReminders && onViewReminders && (
                  <button
                    type="button"
                    onClick={onViewReminders}
                    className="mt-3 inline-flex items-center gap-2 rounded-full text-sm font-bold text-[#BF6A43] transition hover:gap-3 hover:text-[#A95C39] focus:outline-none focus:ring-2 focus:ring-[#BF6A43]/25 focus:ring-offset-4"
                  >
                    See what needs your attention
                    <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="relative z-10 flex rounded-[24px] border border-[#DED6CB] bg-[#FAF7F2]/90 p-5 shadow-[0_12px_28px_rgba(45,42,39,0.06)]">
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#7A7147]">
                Your Dogs
              </p>

              <span className="rounded-full border border-[#D8D0C6] bg-white px-3 py-1 text-xs font-semibold text-[#655F59]">
                {hasDog ? '1 profile' : 'No profiles yet'}
              </span>
            </div>

            {hasDog ? (
              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#DCE4D6] shadow-[0_6px_16px_rgba(45,42,39,0.12)] ring-1 ring-[#C9C1B6]">
                    <span className="font-serif text-3xl font-semibold text-[#59624F]">
                      {dogInitial}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-serif text-2xl font-semibold text-[#2D2A27]">
                      {cleanDogName}
                    </p>

                    <p className="mt-1 text-sm leading-5 text-[#6B645E]">
                      Care, routines, health, and memories.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-[#D5DDCF] bg-[#F1F5EE] px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#59624F]">
                    <span className="h-2 w-2 rounded-full bg-[#7A8A6B]" />
                    {hasReminders
                      ? 'Something needs attention'
                      : 'No care items need attention'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D8D0C6] bg-white text-[#BF6A43] shadow-[0_6px_16px_rgba(45,42,39,0.07)]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 64 64"
                      className="h-9 w-9"
                      fill="currentColor"
                    >
                      <ellipse
                        cx="17"
                        cy="24"
                        rx="6"
                        ry="8"
                        transform="rotate(-22 17 24)"
                        opacity="0.72"
                      />
                      <ellipse
                        cx="29"
                        cy="17"
                        rx="6"
                        ry="8"
                        transform="rotate(-7 29 17)"
                        opacity="0.72"
                      />
                      <ellipse
                        cx="47"
                        cy="24"
                        rx="6"
                        ry="8"
                        transform="rotate(22 47 24)"
                        opacity="0.72"
                      />
                      <ellipse
                        cx="38"
                        cy="17"
                        rx="6"
                        ry="8"
                        transform="rotate(7 38 17)"
                        opacity="0.72"
                      />
                      <path d="M20 42c0-8 5-14 12-14s12 6 12 14c0 7-5 12-12 12s-12-5-12-12Z" />
                    </svg>
                  </div>

                  <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[#2D2A27]">
                    Add your first dog
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#655F59]">
                    Their profile will bring health details, reminders, routines,
                    and memories into one place.
                  </p>
                </div>

                <p className="mt-5 border-t border-[#DED6CB] pt-4 text-sm font-semibold text-[#BF6A43]">
                  Visit My Dogs to get started →
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default WelcomeHero;