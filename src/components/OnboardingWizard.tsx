import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [dogCount, setDogCount] = useState(1);
  const [porchLoaded, setPorchLoaded] = useState(false);

  const totalSteps = 7;

  useEffect(() => {
    const timer = window.setTimeout(() => setPorchLoaded(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const increaseDogCount = () =>
    setDogCount((prev) => Math.min(prev + 1, 10));

  const decreaseDogCount = () =>
    setDogCount((prev) => Math.max(prev - 1, 1));

  const PawProgress = () => (
    <div className="relative z-10 w-full space-y-1">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.22em] text-[#6F7250]">
        <span>
          Step {step} of {totalSteps}
        </span>

        <span>
          {step === 1 ? 'About 5 minutes' : 'You can add more later'}
        </span>
      </div>

      <div
        className="no-scrollbar flex items-center gap-1 overflow-x-auto pt-0.5"
        aria-label={`Step ${step} of ${totalSteps}`}
      >
        {Array.from({ length: totalSteps }).map((_, index) => {
          const pawStep = index + 1;
          const isComplete = pawStep <= step;
          const isCurrent = pawStep === step;

          return (
            <span
              key={pawStep}
              className={`inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-6 sm:w-6 ${
                isCurrent
                  ? 'scale-105 bg-[#F4F0EA] shadow-sm'
                  : 'scale-100'
              }`}
              title={`Step ${pawStep}`}
            >
              <span
                className={`text-sm leading-none transition-all duration-300 sm:text-base ${
                  isComplete ? 'text-[#244B63]' : 'text-[#B6A799]/45'
                }`}
              >
                🐾
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );

  const StoryIcon = ({
    src,
    label,
    imageScale = 1,
  }: {
    src: string;
    label: string;
    imageScale?: number;
  }) => (
    <div className="setup-card group flex min-h-[205px] flex-col items-center justify-between rounded-[22px] px-3 py-5 text-center transition-all duration-300">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-28 w-28 items-center justify-center overflow-visible sm:h-30 sm:w-30 lg:h-32 lg:w-32">
          <img
            src={src}
            alt={label}
            style={{ transform: `scale(${imageScale})` }}
            className="setup-card-image h-full w-full object-contain transition-transform duration-300"
            onError={() => {
              console.log(`Asset link check missing: ${src}`);
            }}
          />
        </div>
      </div>

      <p className="mt-4 flex min-h-[44px] items-center justify-center whitespace-normal text-[15px] font-black leading-tight text-[#2D2A27] sm:whitespace-nowrap lg:text-base">
        {label}
      </p>
    </div>
  );

  return (
    <>
      <style>{`
        .note-paper {
          background-image:
            radial-gradient(
              circle at 10% 20%,
              rgba(122, 114, 89, 0.05) 0 1px,
              transparent 1px
            ),
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.78),
              rgba(253, 251, 247, 0.94)
            );
          background-size: 18px 18px, 100% 100%;
        }

        .porch-stitch {
          opacity: 0;
          transform: scale(1.012) translateY(3px);
          transition:
            opacity 700ms ease,
            transform 900ms ease;
          transform-origin: center center;
        }

        .porch-stitch-loaded {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        @keyframes card-rise {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .setup-card-grid > * {
          animation: card-rise 480ms ease both;
        }

        .setup-card-grid > *:nth-child(2) {
          animation-delay: 90ms;
        }

        .setup-card-grid > *:nth-child(3) {
          animation-delay: 180ms;
        }

        .setup-card {
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #fcfbf8 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.78);
          outline: 1px solid rgba(210, 205, 196, 0.38);
          box-shadow:
            0 2px 6px rgba(45, 42, 39, 0.05),
            0 12px 28px rgba(45, 42, 39, 0.1);
          transform: translateY(0);
          will-change: transform, box-shadow;
        }

        .setup-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 6px 14px rgba(45, 42, 39, 0.06),
            0 18px 36px rgba(45, 42, 39, 0.14);
        }

        .setup-card:hover .setup-card-image {
          transform: scale(1.03);
        }

        @keyframes stitch-gentle-breathe {
          0%,
          100% {
            transform: scale(1) translateX(0) rotate(0deg);
          }

          50% {
            transform: scale(1.004) translateX(-1px) rotate(0deg);
          }
        }

        @keyframes stitch-curious-tilt {
          0%,
          72%,
          100% {
            transform: scale(1) translateX(0) rotate(0deg);
          }

          78% {
            transform: scale(1.004) translateX(-2px) rotate(-0.7deg);
          }

          84% {
            transform: scale(1.004) translateX(-2px) rotate(-0.7deg);
          }

          91% {
            transform: scale(1) translateX(0) rotate(0deg);
          }
        }

        .porch-stitch-loaded.stitch-alive {
          animation:
            stitch-gentle-breathe 7s ease-in-out infinite,
            stitch-curious-tilt 18s ease-in-out 4s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .porch-stitch-loaded.stitch-alive,
          .setup-card-grid > * {
            animation: none !important;
          }

          .setup-card,
          .setup-card-image {
            transition: none !important;
          }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] p-0 font-sans sm:p-3">
        <div className="relative h-screen w-full max-w-6xl overflow-y-auto border border-[#B6A799]/25 bg-white shadow-2xl sm:h-auto sm:rounded-[1.5rem] lg:h-[calc(100vh-2rem)] lg:max-h-[720px] lg:overflow-hidden">
          <div className="grid h-full min-h-screen grid-cols-1 sm:min-h-0 lg:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[240px] overflow-hidden border-b border-[#B6A799]/20 bg-[#F4F0EA] sm:min-h-[300px] lg:min-h-full lg:border-b-0 lg:border-r">
              <img
                src="/assets/branding/stitch-welcome.png"
                alt="Stitch waiting on the Porch & Paw porch"
                className={`porch-stitch stitch-alive absolute inset-0 h-full w-full object-cover object-left ${
                  porchLoaded ? 'porch-stitch-loaded' : ''
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/95 via-[#FDFBF7]/10 to-transparent lg:from-[#F4F0EA]/70" />

              <div className="note-paper absolute bottom-3 left-3 right-4 z-20 rotate-[1deg] rounded-xl bg-[#FFFDF8]/94 p-3.5 shadow-[0_6px_18px_rgba(45,42,39,0.08)] backdrop-blur-[2px] sm:bottom-5 sm:left-5 lg:bottom-3 lg:left-5 lg:w-[320px]">
                {step === 1 && (
                  <div className="space-y-1 text-xs font-medium leading-snug text-[#2D2A27]/85 sm:text-sm">
                    <p>Hi, friend.</p>

                    <p>I'm so glad you're here.</p>

                    <p>
                      Before we head inside, let's get a few things ready for
                      you and your dogs.
                    </p>

                    <p>There's no rush.</p>

                    <p>
                      We'll take it one step at a time, and if you need to
                      come back later, I'll be right here waiting.
                    </p>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-1 text-xs font-medium leading-snug text-[#2D2A27]/85 sm:text-sm">
                    <p>
                      Every dog deserves their own little place to call home.
                    </p>

                    <p className="font-bold text-[#B55D3B]">
                      Tell me how many dogs you'd like to welcome today.
                    </p>
                  </div>
                )}

                {step > 2 && (
                  <div className="space-y-1 text-xs font-medium leading-snug text-[#2D2A27]/85 sm:text-sm">
                    <p>Perfect.</p>

                    <p>
                      Next we'll build the rest of your family's porch step
                      by step.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <main className="relative z-30 flex min-h-[420px] flex-col justify-between bg-[#FCFAF6] p-5 sm:p-7 lg:min-h-0 lg:p-8">
              <PawProgress />

              <div className="flex flex-1 flex-col justify-center py-3 lg:py-1">
                {step === 1 && (
                  <section className="animate-in space-y-3 fade-in slide-in-from-bottom-2 duration-300 sm:space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F7250]">
                        Welcome Home
                      </p>

                      <h1 className="font-serif text-2xl font-black leading-tight text-[#2D2A27] sm:text-3xl">
                        Welcome home.
                      </h1>

                      <div className="max-w-sm space-y-1 text-xs leading-relaxed text-[#2D2A27]/75 sm:text-sm">
                        <p>
                          <strong className="text-[#2D2A27]">
                            Hi! I'm Stitch.
                          </strong>
                        </p>

                        <p>
                          Before we head inside, let's spend just a few
                          minutes getting everything ready for you and your
                          dogs.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[#D2D9CC] bg-[#E4E9DD] p-5 shadow-[0_10px_24px_rgba(45,42,39,0.08)] sm:p-6 lg:px-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#66735A] sm:text-xs">
                        🌿 Before We Head Inside...
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-[#68645F]">
                        Let's get a few things ready before we head inside.
                      </p>

                      <div className="setup-card-grid mt-5 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3 sm:gap-6">
                        <StoryIcon
                          src="/assets/icons/aboutyou.png"
                          label="About You"
                          imageScale={0.96}
                        />

                        <StoryIcon
                          src="/assets/icons/meetyourdog.png"
                          label="Your Dogs"
                          imageScale={0.92}
                        />

                        <StoryIcon
                          src="/assets/icons/safety.png"
                          label="Peace of Mind"
                          imageScale={0.9}
                        />
                      </div>
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="animate-in space-y-3 fade-in slide-in-from-bottom-2 duration-300 sm:space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F7250]">
                        Your Dogs
                      </p>

                      <h1 className="font-serif text-xl font-black leading-snug text-[#2D2A27] sm:text-2xl">
                        How many dogs would you like to add today?
                      </h1>

                      <p className="max-w-sm text-xs leading-relaxed text-[#2D2A27]/75">
                        Each dog will have their own health center, active
                        layout grids, reminders, and milestones.
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#B6A799]/15 bg-[#F4F0EA] p-3 text-center shadow-sm">
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#6F7250]">
                        Dogs joining today
                      </p>

                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={decreaseDogCount}
                          disabled={dogCount <= 1}
                          className="flex h-9 w-10 items-center justify-center rounded-xl border border-[#B6A799]/30 bg-white text-[#2D2A27] shadow-sm transition-all active:scale-95 disabled:opacity-30"
                        >
                          <Minus size={15} />
                        </button>

                        <div className="min-w-[65px]">
                          <div className="text-3xl font-black leading-none text-[#B55D3B] sm:text-4xl">
                            {dogCount}
                          </div>

                          <p className="mt-0.5 text-[10px] font-black text-[#2D2A27]/60">
                            {dogCount === 1 ? 'dog' : 'dogs'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={increaseDogCount}
                          className="flex h-9 w-10 items-center justify-center rounded-xl border border-[#B6A799]/30 bg-white text-[#2D2A27] shadow-sm transition-all active:scale-95"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section className="animate-in space-y-3 text-center fade-in slide-in-from-bottom-2 duration-300">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#B6A799]/15 bg-[#F4F0EA] text-xl shadow-sm">
                      🐾
                    </div>

                    <h1 className="font-serif text-lg font-black text-[#2D2A27] sm:text-xl">
                      Screen 3 is next.
                    </h1>

                    <p className="mx-auto max-w-xs text-xs text-[#2D2A27]/70">
                      Dog count saved for this session:{' '}
                      <strong>{dogCount}</strong>. Next we'll load your owner
                      profile fields.
                    </p>
                  </section>
                )}
              </div>

              <div className="w-full space-y-2 border-t border-[#B6A799]/15 pt-2.5">
                <div className="flex flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="inline-flex items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-xs font-black text-[#6F7250] transition-colors hover:bg-[#F4F0EA] disabled:opacity-0"
                  >
                    <ChevronLeft size={14} />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-xl bg-[#B55D3B] px-4 py-2 text-xs font-black text-white shadow-md transition-all hover:bg-[#9C4E30] active:scale-[0.98] sm:px-6 sm:text-sm"
                  >
                    {step === 1
                      ? "Let's Go!"
                      : step === 2
                        ? 'Continue'
                        : 'Next'}

                    <ChevronRight size={15} />
                  </button>
                </div>

                <p className="text-center text-[10px] leading-normal text-[#2D2A27]/50">
                  ☕ Need a break? No worries. We'll save your progress as you
                  go.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingWizard;