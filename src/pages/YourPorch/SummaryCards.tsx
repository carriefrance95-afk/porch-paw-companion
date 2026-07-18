import React from 'react';
import { Link } from 'react-router-dom';

interface SummaryCardsProps {
  dogNames?: string[];
  activeMedicationCount?: number;
  reminderCount?: number;
  nextReminder?: string;
  memoryCount?: number;
  latestMemory?: string;
}

type CardIconType = 'image' | 'calendar';

interface SummaryCardProps {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  to: string;
  iconType?: CardIconType;
  iconPath?: string;
  cardClassName: string;
  iconBackgroundClassName: string;
  iconAccentClassName: string;
  statusClassName: string;
  statusLabel?: string;
}

const CalendarIcon: React.FC = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-11 w-11"
      fill="none"
    >
      <rect
        x="13"
        y="17"
        width="38"
        height="34"
        rx="7"
        stroke="currentColor"
        strokeWidth="2.4"
      />

      <path
        d="M13 27H51"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      <path
        d="M23 12V22"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      <path
        d="M41 12V22"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      <circle cx="23" cy="35" r="2.2" fill="currentColor" />
      <circle cx="32" cy="35" r="2.2" fill="currentColor" />
      <circle cx="41" cy="35" r="2.2" fill="currentColor" />
      <circle cx="23" cy="43" r="2.2" fill="currentColor" />
      <circle cx="32" cy="43" r="2.2" fill="currentColor" />

      <path
        d="M41 41L44 44L49 38"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M20 15C23 10 28 8 32 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />

      <path
        d="M44 14C41 10 37 8 33 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  eyebrow,
  title,
  description,
  linkLabel,
  to,
  iconType = 'image',
  iconPath,
  cardClassName,
  iconBackgroundClassName,
  iconAccentClassName,
  statusClassName,
  statusLabel,
}) => {
  return (
    <Link
      to={to}
      className={[
        'group relative flex min-h-[300px] flex-col overflow-hidden',
        'rounded-[28px] border p-6 no-underline',
        'shadow-[0_14px_32px_rgba(45,42,39,0.08)]',
        'transition duration-300',
        'hover:-translate-y-1',
        'hover:shadow-[0_22px_46px_rgba(45,42,39,0.13)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[#BF6A43]/45 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[#FAF7F2]',
        cardClassName,
      ].join(' ')}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-14 h-44 w-44 rounded-full bg-white/25 blur-3xl"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div
          className={[
            'flex h-[78px] w-[78px] shrink-0 items-center justify-center',
            'rounded-full border-2 border-white/90',
            'shadow-[0_8px_20px_rgba(45,42,39,0.13)]',
            iconBackgroundClassName,
            iconAccentClassName,
          ].join(' ')}
        >
          {iconType === 'calendar' ? (
            <CalendarIcon />
          ) : (
            <img
              src={iconPath}
              alt=""
              aria-hidden="true"
              className="h-[68px] w-[68px] rounded-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.04]"
            />
          )}
        </div>

        {statusLabel && (
          <span
            className={[
              'rounded-full border px-3 py-1.5',
              'text-[11px] font-bold',
              'shadow-[0_4px_12px_rgba(45,42,39,0.06)]',
              statusClassName,
            ].join(' ')}
          >
            {statusLabel}
          </span>
        )}
      </div>

      <div className="relative z-10 mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6F673F]">
          {eyebrow}
        </p>

        <h3 className="mt-2 max-w-[290px] font-serif text-[28px] font-semibold leading-[1.06] text-[#2D2A27]">
          {title}
        </h3>

        <p className="mt-3 max-w-[300px] text-[15px] leading-6 text-[#554F49]">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2D2A27]">
          {linkLabel}

          <span
            aria-hidden="true"
            className="text-[#BF6A43] transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#BF6A43]/70" />
    </Link>
  );
};

const SummaryCards: React.FC<SummaryCardsProps> = ({
  dogNames = [],
  activeMedicationCount = 0,
  reminderCount = 0,
  nextReminder,
  memoryCount = 0,
  latestMemory,
}) => {
  const cleanDogNames = dogNames
    .map((name) => name.trim())
    .filter(Boolean);

  const dogCount = cleanDogNames.length;

  const dogTitle =
    dogCount === 0
      ? 'Add your first dog'
      : dogCount === 1
        ? cleanDogNames[0]
        : `${dogCount} dog profiles`;

  const dogDescription =
    dogCount === 0
      ? 'Create a profile for your dog and keep their routines, important details, and care information together.'
      : dogCount === 1
        ? 'Open their profile to view routines, important details, and everything that makes them unique.'
        : `${cleanDogNames.join(', ')} are all gathered together in one place.`;

  const dogStatusLabel =
    dogCount === 0
      ? 'No profiles yet'
      : `${dogCount} ${dogCount === 1 ? 'profile' : 'profiles'}`;

  const healthTitle =
    activeMedicationCount === 0
      ? 'Health Center'
      : `${activeMedicationCount} active ${
          activeMedicationCount === 1 ? 'medication' : 'medications'
        }`;

  const healthDescription =
    activeMedicationCount === 0
      ? 'Keep medications, health records, weight, allergies, and vet information organized.'
      : 'Review active medications and keep health records, appointments, and important details close at hand.';

  const healthStatusLabel =
    activeMedicationCount === 0
      ? 'Nothing active'
      : `${activeMedicationCount} active`;

  const remindersTitle =
    reminderCount === 0
      ? 'Reminders'
      : `${reminderCount} ${
          reminderCount === 1 ? 'item coming up' : 'items coming up'
        }`;

  const remindersDescription =
    reminderCount === 0
      ? 'There are no appointments, medications, or care reminders scheduled right now.'
      : nextReminder
        ? `Coming up next: ${nextReminder}.`
        : 'Review the appointments, medications, and routines that need your attention next.';

  const remindersStatusLabel =
    reminderCount === 0
      ? 'Schedule clear'
      : `${reminderCount} upcoming`;

  const memoriesTitle =
    memoryCount === 0
      ? 'Journal & Memories'
      : `${memoryCount} ${memoryCount === 1 ? 'memory' : 'memories'}`;

  const memoriesDescription =
    memoryCount === 0
      ? 'Save everyday moments, milestones, photographs, notes, and stories you never want to forget.'
      : latestMemory
        ? `Your latest memory: ${latestMemory}.`
        : 'Your saved moments, milestones, photographs, and stories are waiting here.';

  const memoriesStatusLabel =
    memoryCount === 0
      ? 'Nothing saved yet'
      : `${memoryCount} saved`;

  return (
    <section
      aria-labelledby="around-the-house-heading"
      className="mt-9"
    >
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7A7147]">
          Around the House
        </p>

        <h2
          id="around-the-house-heading"
          className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#2D2A27]"
        >
          Everything has its place here
        </h2>

        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-[#655F59]">
          Open the spaces that hold your dogs&apos; profiles, health,
          reminders, and memories.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          eyebrow="My Dogs"
          title={dogTitle}
          description={dogDescription}
          linkLabel="Open My Dogs"
          to="/profiles"
          iconPath="/assets/icons/meetyourdog.png"
          cardClassName="border-[#BFCFB6] bg-[#DDE8D7]"
          iconBackgroundClassName="bg-[#F6FAF3]"
          iconAccentClassName="text-[#65765C]"
          statusClassName="border-[#B9C9B1] bg-[#F5F9F2] text-[#55644F]"
          statusLabel={dogStatusLabel}
        />

        <SummaryCard
          eyebrow="Health Center"
          title={healthTitle}
          description={healthDescription}
          linkLabel="Open Health Center"
          to="/health"
          iconPath="/assets/icons/MAIN - HEALTH CENTER.png"
          cardClassName="border-[#DEC9A9] bg-[#F2E3C9]"
          iconBackgroundClassName="bg-[#FFF9EF]"
          iconAccentClassName="text-[#7A7147]"
          statusClassName="border-[#D9C6A7] bg-[#FFF8EB] text-[#6F653E]"
          statusLabel={healthStatusLabel}
        />

        <SummaryCard
          eyebrow="Reminders"
          title={remindersTitle}
          description={remindersDescription}
          linkLabel="View Reminders"
          to="/reminders"
          iconType="calendar"
          cardClassName="border-[#DBA98F] bg-[#F1D3C3]"
          iconBackgroundClassName="bg-[#FFF8F4]"
          iconAccentClassName="text-[#BF6A43]"
          statusClassName="border-[#DFAE95] bg-[#FFF6F1] text-[#9D5435]"
          statusLabel={remindersStatusLabel}
        />

        <SummaryCard
          eyebrow="Journal & Memories"
          title={memoriesTitle}
          description={memoriesDescription}
          linkLabel="Open Journal"
          to="/journal"
          iconPath="/assets/icons/MEMORIES.png"
          cardClassName="border-[#C8B5AE] bg-[#E5D8D2]"
          iconBackgroundClassName="bg-[#FCF8F6]"
          iconAccentClassName="text-[#77645D]"
          statusClassName="border-[#CBB9B1] bg-[#FAF5F2] text-[#6D5D57]"
          statusLabel={memoriesStatusLabel}
        />
      </div>
    </section>
  );
};

export default SummaryCards;