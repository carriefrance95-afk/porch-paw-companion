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

type BotanicalType =
  | 'parlor-palm'
  | 'spider-plant'
  | 'boston-fern'
  | 'peperomia';

interface SummaryCardProps {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  to: string;
  iconPath: string;
  cardClassName: string;
  accentClassName: string;
  botanical: BotanicalType;
}

const BotanicalAccent: React.FC<{
  type: BotanicalType;
  className: string;
}> = ({ type, className }) => {
  if (type === 'parlor-palm') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 180 190"
        className={className}
        fill="none"
      >
        <path
          d="M113 180C109 137 101 98 85 57"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M87 63C73 44 56 31 35 25"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M88 72C106 48 126 33 151 28"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M96 98C74 81 53 74 29 76"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M100 111C122 91 143 82 166 84"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M105 139C86 125 67 120 46 123"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M69 48C57 40 46 37 35 38"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M76 55C64 52 52 53 42 58"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <path
          d="M108 51C119 41 131 36 144 36"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M101 61C114 57 126 58 138 64"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <path
          d="M69 84C56 80 44 81 33 86"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M78 92C64 92 52 97 42 105"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <path
          d="M124 96C136 92 147 93 158 99"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M117 106C131 106 143 111 153 120"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <path
          d="M78 128C66 127 55 131 46 138"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M88 137C76 140 66 147 59 157"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        <path
          d="M92 174H132L127 188H98L92 174Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'spider-plant') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 180 190"
        className={className}
        fill="none"
      >
        <path
          d="M88 170C78 126 62 92 38 61"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M94 170C96 121 104 83 120 44"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M91 169C91 120 87 77 76 35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M87 169C70 132 49 105 22 86"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M96 169C112 131 133 103 160 84"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M89 164C67 147 46 140 25 143"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M98 162C120 144 141 137 163 140"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M121 44C132 34 143 30 155 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="158"
          cy="33"
          r="4"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M79 35C70 24 61 19 50 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="47"
          cy="21"
          r="4"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M76 166H110L106 188H81L76 166Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'boston-fern') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 180 190"
        className={className}
        fill="none"
      >
        <path
          d="M111 180C106 137 94 98 69 52"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M74 63C89 61 101 54 110 43"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M79 75C95 74 109 67 119 56"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M85 89C103 87 118 80 129 68"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M91 104C110 101 126 94 138 81"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M97 121C117 117 134 109 147 96"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M103 139C123 134 140 126 153 112"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M67 61C56 53 44 50 31 52"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M73 74C60 66 47 64 33 67"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M79 89C65 82 51 80 36 84"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M85 105C70 98 55 97 40 102"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M91 122C75 116 60 116 44 122"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M98 140C81 135 65 136 49 143"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M91 174H130L125 188H97L91 174Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 190"
      className={className}
      fill="none"
    >
      <path
        d="M106 178C104 137 98 102 86 70"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M87 75C70 75 57 67 48 53C65 52 79 60 87 75Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M91 91C108 90 122 82 131 68C114 67 100 75 91 91Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M94 109C76 109 62 101 52 87C70 85 84 93 94 109Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M99 128C117 127 132 119 142 104C123 103 109 111 99 128Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M101 146C83 146 68 139 57 125C76 122 91 130 101 146Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M88 70C95 52 106 39 122 31"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M120 32C128 25 137 22 147 24"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <circle
        cx="149"
        cy="25"
        r="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="140"
        cy="31"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="132"
        cy="38"
        r="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M87 173H126L122 188H92L87 173Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
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
        'group relative flex min-h-[288px] flex-col overflow-hidden',
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
          'pointer-events-none absolute -bottom-5 -right-4',
          'h-[160px] w-[150px]',
          'opacity-[0.11]',
          accentClassName,
        ].join(' ')}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-full">
          <img
            src={iconPath}
            alt=""
            aria-hidden="true"
            className={[
              'h-full w-full rounded-full object-contain',
              'mix-blend-multiply',
              'transition-transform duration-300',
              'group-hover:scale-[1.035]',
            ].join(' ')}
          />
        </div>

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

        <h3 className="mt-2 max-w-[275px] font-serif text-[27px] font-semibold leading-[1.08] text-[#2D2A27]">
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

      <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
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
      ? 'Room for someone special'
      : dogCount === 1
        ? cleanDogNames[0]
        : `${dogCount} dogs call this home`;

  const dogDescription =
    dogCount === 0
      ? 'Add your first dog and begin making this porch feel like home.'
      : dogCount === 1
        ? 'Their profile, routines, and important details are gathered here.'
        : `${cleanDogNames.join(', ')} are all gathered together in one place.`;

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
          accentClassName="text-[#718169]"
          botanical="parlor-palm"
        />

        <SummaryCard
          eyebrow="Health Center"
          title={healthTitle}
          description={healthDescription}
          linkLabel="Open Health Center"
          to="/health"
          iconPath="/assets/icons/MAIN - HEALTH CENTER.png"
          cardClassName="border-[#E7DCCB] bg-[#F8F1E6]"
          accentClassName="text-[#807867]"
          botanical="spider-plant"
        />

        <SummaryCard
          eyebrow="Coming Up"
          title={remindersTitle}
          description={remindersDescription}
          linkLabel="See your schedule"
          to="/reminders"
          iconPath="/assets/icons/WELLNESS.png"
          cardClassName="border-[#E5C7B8] bg-[#F7E8DF]"
          accentClassName="text-[#9B654D]"
          botanical="boston-fern"
        />

        <SummaryCard
          eyebrow="Journal & Memories"
          title={memoriesTitle}
          description={memoriesDescription}
          linkLabel="Open your journal"
          to="/journal"
          iconPath="/assets/icons/MEMORIES.png"
          cardClassName="border-[#DDD4CA] bg-[#F1ECE6]"
          accentClassName="text-[#766D65]"
          botanical="peperomia"
        />
      </div>
    </section>
  );
};

export default SummaryCards;