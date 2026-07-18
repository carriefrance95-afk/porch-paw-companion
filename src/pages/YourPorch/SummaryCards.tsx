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
  iconContainerClassName: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  eyebrow,
  title,
  description,
  linkLabel,
  to,
  iconPath,
  cardClassName,
  iconContainerClassName,
}) => {
  return (
    <Link
      to={to}
      className={[
        'group relative flex min-h-[220px] flex-col overflow-hidden',
        'rounded-[28px] border p-6 no-underline',
        'shadow-[0_12px_30px_rgba(45,42,39,0.055)]',
        'transition duration-300',
        'hover:-translate-y-1',
        'hover:shadow-[0_18px_38px_rgba(45,42,39,0.09)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[#BF6A43]/40 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[#FAF7F2]',
        cardClassName,
      ].join(' ')}
    >
      <div className="relative z-10">
        <div
          className={[
            'flex h-[62px] w-[62px] items-center justify-center',
            'rounded-[18px] border bg-white/70',
            'shadow-[0_6px_18px_rgba(45,42,39,0.06)]',
            iconContainerClassName,
          ].join(' ')}
        >
          <img
            src={iconPath}
            alt=""
            aria-hidden="true"
            className={[
              'h-[54px] w-[54px] object-contain',
              'mix-blend-multiply',
              'transition-transform duration-300',
              'group-hover:scale-[1.04]',
            ].join(' ')}
          />
        </div>

        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A7147]">
          {eyebrow}
        </p>

        <h3 className="mt-2 font-serif text-[28px] font-semibold leading-tight text-[#2D2A27]">
          {title}
        </h3>

        <p className="mt-3 max-w-[250px] text-sm leading-6 text-[#2D2A27]/65">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between pt-6">
        <span className="text-sm font-semibold text-[#2D2A27]">
          {linkLabel}
        </span>

        <span
          aria-hidden="true"
          className={[
            'flex h-9 w-9 items-center justify-center rounded-full',
            'bg-white/70 text-[20px] leading-none text-[#BF6A43]',
            'transition duration-300',
            'group-hover:translate-x-1 group-hover:bg-white',
          ].join(' ')}
        >
          ↗
        </span>
      </div>

      <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-white/35 blur-2xl" />
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
  const dogCount = dogNames.length;

  const dogTitle =
    dogCount === 0
      ? 'Ready when you are'
      : dogCount === 1
        ? dogNames[0]
        : `${dogCount} dogs at home`;

  const dogDescription =
    dogCount === 0
      ? 'Add your first dog to begin making this porch your own.'
      : dogCount === 1
        ? 'One very loved dog lives here.'
        : `${dogNames.join(', ')} are all gathered here.`;

  const healthTitle =
    activeMedicationCount === 0
      ? 'Everything looks calm'
      : `${activeMedicationCount} active ${
          activeMedicationCount === 1 ? 'medication' : 'medications'
        }`;

  const healthDescription =
    activeMedicationCount === 0
      ? 'No active medications need your attention right now.'
      : 'Keep current medications and health details close at hand.';

  const remindersTitle =
    reminderCount === 0
      ? 'Nothing coming up'
      : `${reminderCount} ${
          reminderCount === 1 ? 'reminder' : 'reminders'
        }`;

  const remindersDescription =
    reminderCount === 0
      ? 'Your schedule is clear for now.'
      : nextReminder
        ? `Next on the porch: ${nextReminder}.`
        : 'See what needs your attention next.';

  const memoriesTitle =
    memoryCount === 0
      ? 'A fresh page'
      : `${memoryCount} ${memoryCount === 1 ? 'memory' : 'memories'}`;

  const memoriesDescription =
    memoryCount === 0
      ? 'Capture the little moments you never want to forget.'
      : latestMemory
        ? `Most recently: ${latestMemory}.`
        : 'Your favorite moments are safe here.';

  return (
    <section
      aria-labelledby="around-the-house-heading"
      className="mt-8"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7A7147]">
            Around the House
          </p>

          <h2
            id="around-the-house-heading"
            className="mt-2 font-serif text-3xl font-semibold text-[#2D2A27]"
          >
            A quick look around your porch
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          eyebrow="Your Dogs"
          title={dogTitle}
          description={dogDescription}
          linkLabel="Visit your dogs"
          to="/profiles"
          iconPath="/assets/icons/meetyourdog.png"
          cardClassName="border-[#CFD9C9] bg-[#EEF2EA]"
          iconContainerClassName="border-[#CFD9C9]"
        />

        <SummaryCard
          eyebrow="Health Today"
          title={healthTitle}
          description={healthDescription}
          linkLabel="Open Health Center"
          to="/health"
          iconPath="/assets/icons/MAIN - HEALTH CENTER.png"
          cardClassName="border-[#E7DCCB] bg-[#F8F1E6]"
          iconContainerClassName="border-[#E7DCCB]"
        />

        <SummaryCard
          eyebrow="Coming Up"
          title={remindersTitle}
          description={remindersDescription}
          linkLabel="See your schedule"
          to="/reminders"
          iconPath="/assets/icons/WELLNESS.png"
          cardClassName="border-[#E5C7B8] bg-[#F7E8DF]"
          iconContainerClassName="border-[#E5C7B8]"
        />

        <SummaryCard
          eyebrow="Memories"
          title={memoriesTitle}
          description={memoriesDescription}
          linkLabel="Open your journal"
          to="/journal"
          iconPath="/assets/icons/MEMORIES.png"
          cardClassName="border-[#DDD4CA] bg-[#F1ECE6]"
          iconContainerClassName="border-[#DDD4CA]"
        />
      </div>
    </section>
  );
};

export default SummaryCards;