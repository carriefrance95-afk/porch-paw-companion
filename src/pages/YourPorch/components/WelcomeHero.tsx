import React from 'react';

interface WelcomeHeroProps {
  firstName?: string;
  dogName?: string;
  onContinue?: () => void;
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  firstName = 'Carrie',
  dogName = 'Stitch',
  onContinue,
}) => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#E8E1D8] bg-white shadow-[0_18px_45px_rgba(45,42,39,0.08)]">
      <div className="grid min-h-[430px] grid-cols-1 items-center gap-8 px-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-12">
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#7A7147]">
            Your Porch
          </p>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-[#2D2A27] sm:text-5xl lg:text-6xl">
            Welcome home, {firstName}.
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-[#2D2A27]/70">
            Everything you need for life with {dogName}, gathered in one calm,
            familiar place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#BF6A43] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(191,106,67,0.24)] transition hover:-translate-y-0.5 hover:bg-[#A95C39] focus:outline-none focus:ring-4 focus:ring-[#BF6A43]/20"
            >
              Continue Your Journey
            </button>

            <p className="text-sm text-[#2D2A27]/55">
              A warm home for every part of life with your dogs.
            </p>
          </div>
        </div>

        <div className="relative flex min-h-[290px] items-end justify-center lg:min-h-[360px] lg:justify-end">
          <div className="absolute bottom-4 left-1/2 h-24 w-[85%] -translate-x-1/2 rounded-[50%] bg-[#DCE4D6]/55 blur-2xl" />

          <img
            src="/assets/stitch/stitch-home-hero.png"
            alt={`${dogName} resting comfortably`}
            className="relative z-10 max-h-[340px] w-auto max-w-full object-contain drop-shadow-[0_18px_18px_rgba(45,42,39,0.16)] sm:max-h-[380px]"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-[#DCE4D6]/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-[#BF6A43]/10 blur-3xl" />
    </section>
  );
};

export default WelcomeHero;