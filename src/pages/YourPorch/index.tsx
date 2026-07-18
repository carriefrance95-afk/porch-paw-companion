import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHero from './components/WelcomeHero';
import SummaryCards from './components/SummaryCards';

const YourPorch: React.FC = () => {
  const navigate = useNavigate();

  const handleViewReminders = () => {
    navigate('/reminders');
  };

  return (
    <main className="min-h-full bg-[#FAF7F2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <WelcomeHero
          firstName="Carrie"
          dogName="Stitch"
          reminderCount={0}
          onViewReminders={handleViewReminders}
        />

        <SummaryCards
          dogNames={['Stitch']}
          activeMedicationCount={0}
          reminderCount={0}
          memoryCount={0}
        />
      </div>
    </main>
  );
};

export default YourPorch;