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
  accentClassName: string;
  botanical: 'olive' | 'rosemary' | 'fern' | 'peperomia';
}

const BotanicalAccent: React.FC<{
  type: SummaryCardProps['botanical'];
  className: string;
}> = ({ type, className }) => {
  if (type === 'olive') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 150 170"
        className={className}
      >
        <path
          d="M124 161C109 122 89 87 50 37"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M89 86C104 80 114 69 119 54C102 56 91 66 89 86Z"
          fill="currentColor"
        />
        <path
          d="M73 66C73 50 67 37 55 27C51 43 57 56 73 66Z"
          fill="currentColor"
        />
        <path
          d="M105 118C120 114 132 104 139 90C122 89 110 99 105 118Z"
          fill="currentColor"
        />
        <path
          d="M89 101C85 85 76 74 62 67C62 84 71 95 89 101Z"
          fill="currentColor"
        />
        <path
          d="M116 145C129 142 140 134 147 122C132 121 121 129 116 145Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === 'rosemary') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 150 170"
        className={className}
      >
        <path
          d="M117 163C105 126 89 90 67 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M79 73L103 58"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M84 83L112 76"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M90 97L121 94"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M96 112L128 113"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M102 128L134 134"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M74 65L58 45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M82 88L59 75"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M89 104L63 98"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M95 120L68 119"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === 'fern') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 150 170"
        className={className}
      >
        <path
          d="M113 163C104 125 89 91 60 47"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M68 59C86 58 99 50 108 36C90 34 76 42 68 59Z"
          fill="currentColor"
        />
        <path
          d="M77 73C95 72 109 64 119 50C100 48 86 56 77 73Z"
          fill="currentColor"
        />
        <path
          d="M86 90C105 88 120 80 130 65C110 64 95 72 86 90Z"
          fill="currentColor"
        />
        <path
          d="M95 108C114 106 130 98 141 83C120 82 105 90 95 108Z"
          fill="currentColor"
        />
        <path
          d="M63 62C54 49 42 42 26 41C33 56 45 63 63 62Z"
          fill="currentColor"
        />
        <path
          d="M72 77C60 65 47 60 31 62C41 76 55 81 72 77Z"
          fill="currentColor"
        />
        <path
          d="M80 94C67 83 52 79 36 83C48 96 63 100 80 94Z"
          fill="currentColor"
        />
        <path
          d="M89 112C75 102 60 99 43 104C56 117 72 120 89 112Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 150 170"
      className={className}
    >
      <path
        d="M115 163C104 127 91 97 72 68"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M76 72C92 71 104 63 111 50C95 50 83 57 76 72Z"
        fill="currentColor"
      />
      <path
        d="M86 89C103 88 116 80 124 66C107 66 94 73 86 89Z"
        fill="currentColor"
      />
      <path
        d="M95 108C112 107 126 99 135 84C117 84 104 92 95 108Z"
        fill="currentColor"
      />
      <path
        d="M72 72C64 58 53 50 38 47C43 63 54 71 72 72Z"
        fill="currentColor"
      />
      <path
        d="M82 90C72 77 59 70 44 69C51 84 63 91 82 90Z"
        fill="currentColor"
      />
      <path
        d="M91 109C80 97 66 91 50 92C59 106 72 112 91 109Z"
        fill="currentColor"
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
  iconPath,
  cardClassName,
  accentClassName,
  botanical,
}) => {
  return (
    <Link
      to={to}
      className={[
        'group relative flex min-h-[260px] flex-col overflow-hidden',
        'rounded-[30px] border px-6 pb-6 pt-5 no-underline',
        'shadow-[0_12px_30px_rgba(45,42,39,0.055)]',
        'transition duration-300',
        'hover:-translate-y-1',
        'hover:shadow-[0_20px_42px_rgba(45,42,39,0.09)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[#BF6A43]/40 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[#FAF7F2]',
        cardClassName,
      ].join(' ')}
    >
      <BotanicalAccent
        type={botanical}
        className={[
          'pointer-events-none absolute -right-4 -top-2',
          'h-[158px] w-[138px]',
          'opacity-[0.12]',
          accentClassName,
        ].join(' ')}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <img
          src={iconPath}
          alt=""
          aria-hidden="true"
          className={[
            'h-[82px] w-[82px] shrink-0 object-contain',
            'transition-transform duration-300',
            'group-hover:scale-[1.035]',
          ].join(' ')}
        />

        <span
          aria-hidden="true"
          className={[
            'mt-2 text-[22px] leading-none text-[#BF6A43]',
            'transition-transform duration-300',
            'group-hover:translate-x-1 group-hover:-translate-y-1',
          ].join(' ')}
        >
          ↗
        </span>
      </div>

      <div className="relative z-10 mt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7A7147]">
          {eyebrow}
        </p>

        <h3 className="mt-2 font-serif text-[27px] font-semibold leading-[1.08] text-[#2D2A27]">
          {title}
        </h3>

        <p className="mt-3 max-w-[265px] text-sm leading-6 text-[#2D2A27]/68">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D2A27]">
          {linkLabel}
          <span
            aria-hidden="true"
            className="text-[#BF6A43] transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>

      <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/35 blur-3xl" />
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
      ? 'Room for someone special'
      : dogCount === 1
        ? dogNames[0]
        : `${dogCount} dogs call this home`;

  const dogDescription =
    dogCount === 0
      ? 'Add your first dog and begin making this porch feel like home.'
      : dogCount === 1
        ? 'Their profile, routines, and important details are gathered here.'
        : `${dogNames.join(', ')} are all gathered together in one place.`;

  const healthTitle =
    activeMedicationCount === 0
      ? 'Health looks settled'
      : `${activeMedicationCount} active ${
          activeMedicationCount === 1 ? 'medication' : 'medications'
        }`;

  const healthDescription =
    activeMedicationCount === 0
      ? 'No active medications need your attention right now.'
      : 'Keep medications, records, and health details close at hand.';

  const remindersTitle =
    reminderCount === 0
      ? 'The calendar is quiet'
      : `${reminderCount} ${
          reminderCount === 1 ? 'thing is' : 'things are'
        } coming up`;

  const remindersDescription =
    reminderCount === 0
      ? 'There is nothing waiting on your schedule right now.'
      : nextReminder
        ? `Next on the porch: ${nextReminder}.`
        : 'Take a look at what needs your attention next.';

  const memoriesTitle =
    memoryCount === 0
      ? 'A story waiting to begin'
      : `${memoryCount} ${memoryCount === 1 ? 'memory' : 'memories'} saved`;

  const memoriesDescription =
    memoryCount === 0
      ? 'Keep the ordinary little moments that become the best stories.'
      : latestMemory
        ? `Most recently: ${latestMemory}.`
        : 'Your favorite moments are safe here.';

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

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#2D2A27]/60">
          Step into the rooms that hold the everyday details, care, and memories
          of life with your dogs.
        </p>
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
          accentClassName="text-[#7A8A70]"
          botanical="olive"
        />

        <SummaryCard
          eyebrow="Health Center"
          title={healthTitle}
          description={healthDescription}
          linkLabel="Open Health Center"
          to="/health"
          iconPath="/assets/icons/MAIN - HEALTH CENTER.png"
          cardClassName="border-[#E7DCCB] bg-[#F8F1E6]"
          accentClassName="text-[#91836F]"
          botanical="rosemary"
        />

        <SummaryCard
          eyebrow="Coming Up"
          title={remindersTitle}
          description={remindersDescription}
          linkLabel="See your schedule"
          to="/reminders"
          iconPath="/assets/icons/WELLNESS.png"
          cardClassName="border-[#E5C7B8] bg-[#F7E8DF]"
          accentClassName="text-[#A86B4E]"
          botanical="fern"
        />

        <SummaryCard
          eyebrow="Journal & Memories"
          title={memoriesTitle}
          description={memoriesDescription}
          linkLabel="Open your journal"
          to="/journal"
          iconPath="/assets/icons/MEMORIES.png"
          cardClassName="border-[#DDD4CA] bg-[#F1ECE6]"
          accentClassName="text-[#81766C]"
          botanical="peperomia"
        />
      </div>
    </section>
  );
};

export default SummaryCards;