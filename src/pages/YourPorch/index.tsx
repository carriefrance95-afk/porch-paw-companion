import React from 'react';
import WelcomeHero from './components/WelcomeHero';

const YourPorch: React.FC = () => {
  const handleContinueJourney = () => {
    const journeySection = document.getElementById('porch-journey');

    if (journeySection) {
      journeySection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <main className="min-h-full bg-[#FAF7F2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <WelcomeHero
          firstName="Carrie"
          dogName="Stitch"
          onContinue={handleContinueJourney}
        />

        <section
          id="porch-journey"
          className="mt-8 rounded-[28px] border border-[#E8E1D8] bg-white p-8 shadow-[0_14px_35px_rgba(45,42,39,0.06)]"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7A7147]">
            Continue Your Journey
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#2D2A27]">
            Your porch is ready to grow with you.
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#2D2A27]/65">
            This is where your setup progress, dogs, daily schedule, favorite
            rooms, and updates from Stitch will come together.
          </p>
        </section>
      </div>
    </main>
  );
};

export default YourPorch;