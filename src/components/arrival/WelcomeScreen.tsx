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
      <div className="grid overflow-hidden rounded-[24px] bg-white lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
          <div className="mx-auto w-full max-w-xl text-center lg:text-left">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#7A7147]">
              Porch &amp; Paw
            </p>

            <h1 className="font-serif text-4xl font-bold leading-tight text-[#2D2A27] sm:text-5xl">
              Porchside Pet Life
            </h1>

            <p className="mt-4 font-serif text-3xl font-semibold text-[#BF6A43] sm:text-4xl">
              Welcome Home.
            </p>

            <div className="mt-5 space-y-1 text-lg font-medium leading-relaxed text-[#2D2A27]">
              <p>A place for every dog.</p>
              <p>A home for every story.</p>
            </div>

            <div className="mx-auto mt-7 max-w-md rounded-[24px] border border-[#E8E1D8] bg-[#FAF7F2] px-5 py-5 text-left shadow-sm lg:mx-0">
              <p className="font-serif text-2xl font-semibold text-[#2D2A27]">
                Hi, friend.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B665F]">
                I&apos;m Stitch, and I&apos;m so glad you&apos;re here. Before we head
                inside, let&apos;s get your porch ready for you and your dogs.
              </p>
            </div>

            <div className="mx-auto mt-7 max-w-md lg:mx-0">
              <PrimaryButton onClick={onStart}>
                Start Your Journey
              </PrimaryButton>

              <div className="mt-5 text-center">
                <p className="text-sm text-[#6B665F]">Already have a home?</p>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="mt-1 text-sm font-semibold text-[#BF6A43] underline decoration-[#E8E1D8] underline-offset-4 transition-colors hover:text-[#A85B38]"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden border-t border-[#E8E1D8] lg:min-h-[680px] lg:border-l lg:border-t-0">
          <img
            src="/assets/stitch-welcome.png"
            alt="Stitch sitting on a warm porch beside an open front door"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A27]/20 via-transparent to-white/5" />

          <div className="absolute bottom-5 left-5 right-5 rounded-[20px] border border-white/60 bg-white/88 px-4 py-3 text-center shadow-lg backdrop-blur-sm">
            <p className="font-serif text-lg font-semibold text-[#2D2A27]">
              Come on in. We&apos;ve been waiting for you.
            </p>
          </div>
        </div>
      </div>
    </ArrivalLayout>
  );
};

export default WelcomeScreen;