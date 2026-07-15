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
      <div className="text-center max-w-2xl mx-auto py-8">

        <p className="text-xs uppercase tracking-[0.35em] text-[#7A7147] font-bold mb-4">
          by Porch & Paw
        </p>

        <h1 className="font-serif text-5xl text-[#2D2A27] font-bold mb-5">
          Porchside Pet Life
        </h1>

        <p className="text-lg text-[#6B665F] leading-relaxed mb-10">
          The all-in-one guide for devoted dog parents.
          Cookbooks, health, travel, memories, and so much more.
        </p>

        <PrimaryButton onClick={onStart}>
          Start Your Journey
        </PrimaryButton>

        <button
          onClick={onSignIn}
          className="mt-8 text-[#BF6A43] font-semibold underline"
        >
          Already a member? Sign In
        </button>

      </div>
    </ArrivalLayout>
  );
};

export default WelcomeScreen;