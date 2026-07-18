import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BookHeart,
  CalendarDays,
  HeartPulse,
  PawPrint,
} from 'lucide-react';

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
  icon: React.ReactNode;
  cardClassName: string;
  iconClassName: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  eyebrow,
  title,
  description,
  linkLabel,
  to,
  icon,
  cardClassName,
  iconClassName,
}) => {
  return (
    <Link
      to={to}
      className={`group relative flex min-h-[220px] flex-col overflow-hidden rounded-[28px] border p-6 no-underline shadow-[0_12px_30px_rgba(45,42,39,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(45,42,39,0.09)] ${cardClassName}`}
    >
      <div className="relative z-10">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full border bg-white/75 shadow-[0_6px_18px_rgba(45,42,39,0.06)] ${iconClassName}`}
        >
          {icon}
        </div>

        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A7147]">
          {eyebrow}
        </p>

        <h2 className="mt-2 font-serif text-[28px] font-semibold leading-tight text-[#2D2A27]">
          {title}
        </h2>

        <p className="mt-3 max-w-[250px] text-sm leading-6 text-[#2D2A27]/65">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between pt-6">
        <span className="text-sm font-semibold text-[#2D2A27]">
          {linkLabel}
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#BF6A43] transition duration-300 group-hover:translate-x-1 group-hover:bg-white">
          <ArrowUpRight size={17} strokeWidth={2} />
        </span>
      </div>

      <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-white/35 blur-2xl" />
    </Link>
  );
};

const SummaryCards: React.FC<SummaryCardsProps> = ({
  dogNames = ['Stitch'],
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
          icon={<PawPrint size={22} strokeWidth={1.7} />}
          cardClassName="border-[#CFD9C9] bg-[#EEF2EA]"
          iconClassName="border-[#CFD9C9] text-[#7A7147]"
        />

        <SummaryCard
          eyebrow="Health Today"
          title={healthTitle}
          description={healthDescription}
          linkLabel="Open Health Center"
          to="/health"
          icon={<HeartPulse size={22} strokeWidth={1.7} />}
          cardClassName="border-[#E7DCCB] bg-[#F8F1E6]"
          iconClassName="border-[#E7DCCB] text-[#9A765E]"
        />

        <SummaryCard
          eyebrow="Coming Up"
          title={remindersTitle}
          description={remindersDescription}
          linkLabel="See your schedule"
          to="/reminders"
          icon={<CalendarDays size={22} strokeWidth={1.7} />}
          cardClassName="border-[#E5C7B8] bg-[#F7E8DF]"
          iconClassName="border-[#E5C7B8] text-[#BF6A43]"
        />

        <SummaryCard
          eyebrow="Memories"
          title={memoriesTitle}
          description={memoriesDescription}
          linkLabel="Open your journal"
          to="/journal"
          icon={<BookHeart size={22} strokeWidth={1.7} />}
          cardClassName="border-[#DDD4CA] bg-[#F1ECE6]"
          iconClassName="border-[#DDD4CA] text-[#74685E]"
        />
      </div>
    </section>
  );
};

export default SummaryCards;