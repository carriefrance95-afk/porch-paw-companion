import React from 'react';
import ArrivalLayout from './ArrivalLayout';
import PrimaryButton from './PrimaryButton';

export type PlanId = 'Free' | 'Wellness' | 'Memory' | 'Premium';

export interface PlanOption {
  id: PlanId;
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PlanSelectionProps {
  plans: PlanOption[];
  selectedPlan: PlanId;
  onSelectPlan: (plan: PlanId) => void;
  onContinue: () => void;
  onBack: () => void;
}

const planContent: Record<
  PlanId,
  {
    title: string;
    description: string;
  }
> = {
  Free: {
    title: 'Your First Porch',
    description: 'A welcoming place to begin with one dog.',
  },
  Wellness: {
    title: 'Healthy Home',
    description: 'Everything you need to care for the dogs you love.',
  },
  Memory: {
    title: 'Memory Porch',
    description: 'Preserve every milestone, photo, and story.',
  },
  Premium: {
    title: 'Everything Under One Roof',
    description: 'Everything your family needs, all under one roof.',
  },
};

const PlanSelection: React.FC<PlanSelectionProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
  onContinue,
  onBack,
}) => {
  return (
    <ArrivalLayout maxWidth="large">
      <div className="mx-auto flex w-full max-w-5xl flex-col py-0">
        <div className="mb-4 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.26em] text-[#7A7147]">
            Welcome Home · Step 1 of 6
          </p>

          <h1 className="font-serif text-3xl font-bold leading-tight text-[#2D2A27] sm:text-4xl">
            Find the Porch That&apos;s Right for You
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-[#6B665F] sm:text-sm">
            Choose the experience that fits your family today. You can change
            your plan anytime as your porch grows.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const content = planContent[plan.id];

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => onSelectPlan(plan.id)}
                aria-pressed={isSelected}
                className={`relative rounded-[20px] border-2 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isSelected
                    ? 'border-[#BF6A43] bg-[#FAF7F2] shadow-sm'
                    : 'border-[#E8E1D8] bg-white shadow-sm'
                }`}
              >
                {isSelected && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#BF6A43] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                    Recommended
                  </span>
                )}

                <div className="pr-24">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A7147]">
                    {plan.name}
                  </p>

                  <h2 className="mt-1 font-serif text-xl font-bold leading-tight text-[#2D2A27]">
                    {content.title}
                  </h2>

                  <p className="mt-0.5 text-sm font-semibold text-[#BF6A43]">
                    {plan.price}
                  </p>

                  <p className="mt-2 min-h-[36px] text-xs leading-relaxed text-[#6B665F]">
                    {content.description}
                  </p>

                  <ul className="mt-3 space-y-1 text-xs text-[#2D2A27]/80">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 text-[#7A7147]"
                        >
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-5 w-full max-w-sm">
          <PrimaryButton onClick={onContinue} className="py-3 text-base">
            Let&apos;s Keep Going
          </PrimaryButton>

          <button
            type="button"
            onClick={onBack}
            className="mt-2 w-full rounded-xl px-4 py-1.5 text-xs font-semibold text-[#6B665F] underline decoration-[#E8E1D8] underline-offset-4 transition-colors hover:text-[#BF6A43]"
          >
            Back
          </button>
        </div>

        <div className="mx-auto mt-3 max-w-2xl rounded-xl border border-[#E8E1D8] bg-[#FAF7F2] px-3 py-2 text-center">
          <p className="text-[10px] leading-relaxed text-[#6B665F]">
            You can change plans later. Beta access is unlocked, and billing
            remains disabled until public launch.
          </p>
        </div>
      </div>
    </ArrivalLayout>
  );
};

export default PlanSelection;