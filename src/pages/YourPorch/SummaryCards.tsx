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

interface SummaryCardProps {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  to: string;
  iconPath: string;
  cardClassName: string;
  iconBackgroundClassName: string;
  statusClassName: string;
  accentClassName: string;
  statusLabel?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  eyebrow,
  title,
  description,
  linkLabel,
  to,
  iconPath,
  cardClassName,
  iconBackgroundClassName,
  statusClassName,
  accentClassName,
  statusLabel,
}) => {
  return (
    <Link
      to={to}
      className={[
        'group relative flex min-h-[300px] flex-col overflow-hidden',
        'rounded-[28px] border p-6 no-underline',
        'shadow-[0_14px_32px_rgba(46,43,40,0.08)]',
        'transition duration-300',
        'hover:-translate-y-1',
        'hover:shadow-[0_22px_46px_rgba(46,43,40,0.13)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[#B65E3C]/40 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[#F5F1EA]',
        cardClassName,
      ].join(' ')}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/35 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-14 h-44 w-44 rounded-full bg-white/20 blur-3xl"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div
          className={[
            'flex h-[88px] w-[88px] shrink-0 items-center justify-center',
            'overflow-hidden rounded-full border-2 border-white/90',
            'shadow-[0_9px_22px_rgba(46,43,40,0.13)]',
            iconBackgroundClassName,
          ].join(' ')}
        >
          <img
            src={iconPath}
            alt=""
            aria-hidden="true"
            className={[
              'h-[82px] w-[82px] rounded-full object-cover',
              'mix-blend-multiply',
              'transition-transform duration-300',
              'group-hover:scale-[1.04]',
            ].join(' ')}
          />
        </div>

        {statusLabel && (
          <span
            className={[
              'max-w-[130px] rounded-full border px-3 py-1.5',
              'text-center text-[11px] font-bold leading-tight',
              'shadow-[0_4px_12px_rgba(46,43,40,0.06)]',
              statusClassName,
            ].join(' ')}
          >
            {statusLabel}
          </span>
        )}
      </div>

      <div className="relative z-10 mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7A7B5A]">
          {eyebrow}
        </p>

        <h3 className="mt-2 max-w-[290px] font-serif text-[28px] font-semibold leading-[1.06] text-[#2E2B28]">
          {title}
        </h3>

        <p className="mt-3 max-w-[300px] text-[15px] leading-6 text-[#665F59]">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2E2B28]">
          {linkLabel}

          <span
            aria-hidden="true"
            className="text-[#B65E3C] transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>

      <div
        aria-hidden="true"
        className={[
          'absolute inset-x-0 bottom-0 h-1.5',
          accentClassName,
        ].join(' ')}
      />
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
      ? 'Create a profile and keep their routines, important details, and care information together.'
      : dogCount === 1
        ? 'Open their profile to view routines, care details, and everything that makes them unique.'
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
      : 'Review active medications and keep health records and important care details close at hand.';

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
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7A7B5A]">
          Around the House
        </p>

        <h2
          id="around-the-house-heading"
          className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#2E2B28]"
        >
          Everything has its place here
        </h2>

        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-[#665F59]">
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
          cardClassName="border-[#C4CEBB] bg-[#DFE8D9]"
          iconBackgroundClassName="bg-[#F5F1EA]"
          statusClassName="border-[#BFCAB5] bg-[#F5F1EA]/90 text-[#667052]"
          accentClassName="bg-[#7A7B5A]/75"
          statusLabel={dogStatusLabel}
        />

        <SummaryCard
          eyebrow="Health Center"
          title={healthTitle}
          description={healthDescription}
          linkLabel="Open Health Center"
          to="/health"
          iconPath="/assets/icons/MAIN - HEALTH CENTER.png"
          cardClassName="border-[#D8C8B3] bg-[#EEE2D2]"
          iconBackgroundClassName="bg-[#F5F1EA]"
          statusClassName="border-[#D3C3AD] bg-[#F5F1EA]/90 text-[#8A6A52]"
          accentClassName="bg-[#8A6A52]/70"
          statusLabel={healthStatusLabel}
        />

        <SummaryCard
          eyebrow="Reminders"
          title={remindersTitle}
          description={remindersDescription}
          linkLabel="View Reminders"
          to="/reminders"
          iconPath="/assets/Reminders.png"
          cardClassName="border-[#D9B2A2] bg-[#F0D6CA]"
          iconBackgroundClassName="bg-[#F5F1EA]"
          statusClassName="border-[#D5AD9C] bg-[#F5F1EA]/90 text-[#B65E3C]"
          accentClassName="bg-[#B65E3C]/80"
          statusLabel={remindersStatusLabel}
        />

        <SummaryCard
          eyebrow="Journal & Memories"
          title={memoriesTitle}
          description={memoriesDescription}
          linkLabel="Open Journal"
          to="/journal"
          iconPath="/assets/icons/MEMORIES.png"
          cardClassName="border-[#CFC0B6] bg-[#E6DCD5]"
          iconBackgroundClassName="bg-[#F5F1EA]"
          statusClassName="border-[#CBBBAF] bg-[#F5F1EA]/90 text-[#8A6A52]"
          accentClassName="bg-[#C9785C]/75"
          statusLabel={memoriesStatusLabel}
        />
      </div>
    </section>
  );
};

export default SummaryCards;