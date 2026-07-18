import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHero from './components/WelcomeHero';
import ComingUp, {
  type ComingUpItem,
} from './ComingUp';
import QuickActions from './components/QuickActions';
import SummaryCards from './SummaryCards';

const YourPorch: React.FC = () => {
  const navigate = useNavigate();

  const handleViewReminders = () => {
    navigate('/reminders');
  };

  const upcomingItems: ComingUpItem[] = [];

  return (
    <main className="min-h-full bg-[#FAF7F2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <WelcomeHero
          firstName="Carrie"
          dogName="Stitch"
          reminderCount={upcomingItems.length}
          onViewReminders={handleViewReminders}
        />

        <SummaryCards
          dogNames={['Stitch']}
          activeMedicationCount={0}
          reminderCount={upcomingItems.length}
          memoryCount={0}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
          <ComingUp items={upcomingItems} />
          <QuickActions />
        </div>
      </div>
    </main>
  );
};

export default YourPorch;