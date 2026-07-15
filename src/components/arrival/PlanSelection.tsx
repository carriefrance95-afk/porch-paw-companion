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

const planIcons: Record<PlanId, string> = {
  Free: '🐾',
  Wellness: '❤️',
  Memory: '📖',
  Premium: '🏡',
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
      <div className="mx-auto w-full max-w-4xl py-2 sm:py-4">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A7147]">
            Step 1
          </p>

          <h1 className="font-serif text-4xl font-bold text-[#2D2A27] sm:text-5xl">
            Choose Your Plan
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#6B665F] sm:text-base">
            Choose the experience that feels right for you today. You can change plans later as your porch grows.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => onSelectPlan(plan.id)}
                aria-pressed={isSelected}
                className={`relative rounded-[24px] border-2 p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isSelected
                    ? 'border-[#BF6A43] bg-[#FAF7F2] shadow-md'
                    : 'border-[#E8E1D8] bg-white shadow-sm'
                }`}
              >
                {isSelected && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#BF6A43] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    Selected
                  </span>
                )}

                <div className="pr-20">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCE4D6] text-xl"
                    >
                      {planIcons[plan.id]}
                    </span>

                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#2D2A27]">
                        {plan.name}
                      </h2>
                      <p className="font-semibold text-[#BF6A43]">{plan.price}</p>
                    </div>
                  </div>

                  <p className="mb-4 min-h-[48px] text-sm leading-relaxed text-[#6B665F]">
                    {plan.description}
                  </p>

                  <ul className="space-y-2 text-sm text-[#2D2A27]/80">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-0.5 text-[#7A7147]">
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

        <div className="mx-auto mt-8 max-w-md">
          <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>

          <button
            type="button"
            onClick={onBack}
            className="mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold text-[#6B665F] underline decoration-[#E8E1D8] underline-offset-4 transition-colors hover:text-[#BF6A43]"
          >
            Back
          </button>
        </div>

        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-[#E8E1D8] bg-[#FAF7F2] px-4 py-3 text-center">
          <p className="text-xs leading-relaxed text-[#6B665F]">
            Beta access is currently unlocked. Billing will remain disabled until the public launch.
          </p>
        </div>
      </div>
    </ArrivalLayout>
  );
};

export default PlanSelection;