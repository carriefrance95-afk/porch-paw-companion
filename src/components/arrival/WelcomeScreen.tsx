import React from 'react';
import ArrivalLayout from './ArrivalLayout';
import PrimaryButton from './PrimaryButton';

interface WelcomeScreenProps {
  onStart: () => void;
  onSignIn: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onSignIn,
}) => {
  return (
    <ArrivalLayout maxWidth="large">
      <div className="grid overflow-hidden rounded-[24px] bg-white lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-center px-8 py-10 lg:px-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#7A7147]">
            Porch &amp; Paw
          </p>

          <h1 className="font-serif text-5xl font-bold leading-tight text-[#2D2A27]">
            Porchside Pet Life
          </h1>

          <h2 className="mt-6 font-serif text-4xl font-semibold text-[#BF6A43]">
            Welcome Home.
          </h2>

          <div className="mt-6 space-y-2 text-xl font-medium text-[#2D2A27]">
            <p>A place for every dog.</p>
            <p>A home for every story.</p>
          </div>

          <div className="mt-8 rounded-[24px] border border-[#E8E1D8] bg-[#FAF7F2] p-6 shadow-sm">
            <h3 className="font-serif text-3xl font-bold text-[#2D2A27]">
              I&apos;m Stitch.
            </h3>

            <p className="mt-3 text-base leading-7 text-[#6B665F]">
              Welcome home. Before we head inside, let&apos;s get your porch
              ready for everyone you&apos;ll love.
            </p>
          </div>

          <div className="mt-9">
            <PrimaryButton onClick={onStart} className="py-5 text-lg">
              Let&apos;s Head Inside
            </PrimaryButton>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#6B665F]">
                Already have a home?
              </p>

              <button
                type="button"
                onClick={onSignIn}
                className="mt-2 text-base font-semibold text-[#BF6A43] underline underline-offset-4"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[480px] overflow-hidden lg:min-h-[680px]">
          <img
            src="/assets/branding/stitch-welcome.png"
            alt="Stitch welcoming you home from the porch"
            className="absolute inset-0 h-full w-full object-cover object-[55%_center]"
          />
        </div>
      </div>
    </ArrivalLayout>
  );
};

export default WelcomeScreen;
