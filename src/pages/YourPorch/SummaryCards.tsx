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
        viewBox="0 0 220 220"
        className={className}
        fill="none"
      >
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M116 198C113 157 109 118 103 74" strokeWidth="2.4" />
          <path d="M104 87C91 61 73 43 47 31" strokeWidth="2.2" />
          <path d="M106 96C126 66 148 47 178 38" strokeWidth="2.2" />
          <path d="M108 119C83 95 58 82 27 79" strokeWidth="2.2" />
          <path d="M111 133C139 105 165 93 196 94" strokeWidth="2.2" />
          <path d="M113 158C88 137 65 128 38 130" strokeWidth="2.2" />
          <path d="M114 169C139 146 162 137 187 139" strokeWidth="2.2" />

          <path d="M91 66C79 49 66 39 50 34" strokeWidth="1.45" />
          <path d="M86 72C72 59 59 53 43 52" strokeWidth="1.45" />
          <path d="M82 79C68 70 55 67 40 70" strokeWidth="1.45" />

          <path d="M126 68C140 54 154 47 170 44" strokeWidth="1.45" />
          <path d="M122 76C138 65 153 61 169 63" strokeWidth="1.45" />
          <path d="M118 84C134 77 149 76 164 81" strokeWidth="1.45" />

          <path d="M82 101C66 91 51 88 35 91" strokeWidth="1.45" />
          <path d="M76 109C60 103 45 103 30 108" strokeWidth="1.45" />
          <path d="M71 117C55 115 42 118 29 126" strokeWidth="1.45" />

          <path d="M139 111C155 103 170 101 186 105" strokeWidth="1.45" />
          <path d="M134 120C151 116 167 118 182 125" strokeWidth="1.45" />
          <path d="M128 129C145 129 160 134 173 144" strokeWidth="1.45" />

          <path d="M89 143C74 136 60 135 46 139" strokeWidth="1.45" />
          <path d="M84 151C69 148 56 151 44 158" strokeWidth="1.45" />
          <path d="M80 160C66 161 55 166 46 176" strokeWidth="1.45" />

          <path d="M139 151C153 145 167 145 181 150" strokeWidth="1.45" />
          <path d="M135 160C150 158 163 162 175 170" strokeWidth="1.45" />
          <path d="M130 169C144 171 155 177 164 187" strokeWidth="1.45" />

          <path d="M88 188H145L138 213H96L88 188Z" strokeWidth="2.2" />
          <path d="M94 194H139" strokeWidth="1.4" />
        </g>
      </svg>
    );
  }

  if (type === 'spider-plant') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 220 220"
        className={className}
        fill="none"
      >
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M107 189C91 141 72 105 42 66" strokeWidth="2.4" />
          <path d="M111 189C108 137 111 91 124 42" strokeWidth="2.4" />
          <path d="M112 189C125 140 147 102 181 71" strokeWidth="2.4" />
          <path d="M108 188C82 157 54 139 21 134" strokeWidth="2.1" />
          <path d="M113 188C140 156 170 140 203 137" strokeWidth="2.1" />
          <path d="M109 187C93 129 92 82 99 31" strokeWidth="2.1" />
          <path d="M108 187C77 146 48 120 16 108" strokeWidth="1.9" />
          <path d="M114 187C145 145 174 120 207 109" strokeWidth="1.9" />

          <path d="M125 42C140 28 154 23 169 27" strokeWidth="1.6" />
          <path d="M169 27C181 29 190 36 196 47" strokeWidth="1.6" />
          <circle cx="198" cy="51" r="4.5" strokeWidth="1.6" />

          <path d="M99 31C87 17 73 11 59 14" strokeWidth="1.6" />
          <path d="M59 14C47 17 39 25 35 37" strokeWidth="1.6" />
          <circle cx="34" cy="41" r="4.5" strokeWidth="1.6" />

          <path d="M82 187H141L135 213H89L82 187Z" strokeWidth="2.2" />
          <path d="M88 194H136" strokeWidth="1.4" />
        </g>
      </svg>
    );
  }

  if (type === 'boston-fern') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 220 220"
        className={className}
        fill="none"
      >
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M111 197C108 154 99 114 82 69" strokeWidth="2.4" />
          <path d="M82 69C77 54 75 42 78 30" strokeWidth="1.8" />

          {[
            ['88 79', '106 72 122 61'],
            ['91 91', '112 83 130 69'],
            ['95 104', '119 95 139 80'],
            ['99 118', '126 108 149 92'],
            ['103 133', '132 122 158 105'],
            ['106 149', '138 137 166 119'],
            ['108 166', '143 153 173 133'],
          ].map(([start, end]) => (
            <path key={`${start}-${end}`} d={`M${start}C${end}`} strokeWidth="1.65" />
          ))}

          {[
            ['85 79', '67 72 51 61'],
            ['88 91', '67 83 49 70'],
            ['91 104', '67 95 47 81'],
            ['94 118', '67 108 44 93'],
            ['98 133', '69 122 43 106'],
            ['101 149', '69 137 41 120'],
            ['104 166', '69 153 39 135'],
          ].map(([start, end]) => (
            <path key={`${start}-${end}`} d={`M${start}C${end}`} strokeWidth="1.65" />
          ))}

          <path d="M89 190H145L138 213H96L89 190Z" strokeWidth="2.2" />
          <path d="M95 197H139" strokeWidth="1.4" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 220"
      className={className}
      fill="none"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M111 198C109 157 105 120 96 83" strokeWidth="2.4" />
        <path d="M96 84C90 65 92 49 101 34" strokeWidth="1.8" />

        <path d="M95 88C73 88 57 77 47 59C70 57 87 67 95 88Z" strokeWidth="1.8" />
        <path d="M99 105C122 103 140 91 150 72C126 70 108 82 99 105Z" strokeWidth="1.8" />
        <path d="M102 125C77 124 59 113 48 94C73 91 92 102 102 125Z" strokeWidth="1.8" />
        <path d="M106 145C132 143 151 131 162 111C136 109 116 121 106 145Z" strokeWidth="1.8" />
        <path d="M109 165C84 165 65 155 53 137C79 133 99 145 109 165Z" strokeWidth="1.8" />

        <path d="M101 35C113 20 128 13 144 15" strokeWidth="1.6" />
        <path d="M144 15C157 16 168 22 176 33" strokeWidth="1.6" />
        <circle cx="179" cy="37" r="4" strokeWidth="1.5" />
        <circle cx="167" cy="27" r="3.2" strokeWidth="1.5" />
        <circle cx="155" cy="20" r="2.7" strokeWidth="1.5" />

        <path d="M88 190H145L138 213H96L88 190Z" strokeWidth="2.2" />
        <path d="M95 197H139" strokeWidth="1.4" />
      </g>
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
          'pointer-events-none absolute -bottom-7 -right-5',
          'h-[185px] w-[175px]',
          'opacity-[0.22]',
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
              'h-full w-full scale-[1.06] rounded-full object-cover',
              'mix-blend-multiply',
              'transition-transform duration-300',
              'group-hover:scale-[1.035]',
            ].join(' ')}
          />
        </div>
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