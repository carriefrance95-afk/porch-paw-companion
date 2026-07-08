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

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const increaseDogCount = () => setDogCount(prev => Math.min(prev + 1, 10));
  const decreaseDogCount = () => setDogCount(prev => Math.max(prev - 1, 1));

  const PawProgress = () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#6F7250]">
        <span>Step {step} of {totalSteps}</span>
        <span>{step === 1 ? 'About 5 minutes' : 'You can add more later'}</span>
      </div>

      <div className="flex items-center gap-2 pt-1" aria-label={`Step ${step} of ${totalSteps}`}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const pawStep = index + 1;
          const isComplete = pawStep <= step;
          const isCurrent = pawStep === step;

          return (
            <span
              key={pawStep}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                isCurrent ? 'scale-110 bg-[#F4F0EA] shadow-sm' : 'scale-100'
              }`}
              title={`Step ${pawStep}`}
            >
              <span className={`text-lg leading-none transition-all duration-300 ${
                isComplete ? 'text-[#244B63]' : 'text-[#B6A799]/45'
              }`}>
                🐾
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );

  const StoryIcon = ({ icon, label }: { icon: string; label: string }) => (
    <div className="rounded-2xl bg-white/95 p-3 text-center shadow-sm border border-[#B6A799]/10">
      <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#F4F0EA] shadow-inner text-2xl storybook-icon">
        {icon}
      </div>
      <p className="text-xs sm:text-sm font-black text-[#2D2A27] leading-tight">{label}</p>
    </div>
  );

  const PorchPanel = () => (
    <div className="relative min-h-[460px] lg:min-h-full overflow-hidden bg-[#F4F0EA]">
      <img
        src="/stitch-porch.png"
        alt="Stitch waiting on the Porch & Paw porch"
        className={`absolute inset-0 h-full w-full object-cover porch-stitch ${porchLoaded ? 'porch-stitch-loaded' : ''}`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/90 via-[#FDFBF7]/5 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#FDFBF7]/10" />

      <div className="absolute top-6 left-7 h-9 w-9 rounded-full bg-[#F6D07C]/30 blur-md lantern-glow" />
      <div className="absolute top-16 left-20 h-12 w-20 rounded-full bg-[#7A7A59]/10 plant-sway" />
      <div className="absolute top-24 left-[-40px] text-[#B55D3B]/35 leaf-drift">🍂</div>

      <div className="absolute left-7 right-7 bottom-7 md:left-auto md:right-10 md:bottom-9 md:w-[375px] rounded-[1.65rem] bg-[#FFFDF8]/94 backdrop-blur-[2px] shadow-[0_14px_35px_rgba(45,42,39,0.18)] p-4 md:p-5 note-paper">
        {step === 1 && (
          <div className="space-y-2 text-sm md:text-[15px] text-[#2D2A27]/82 leading-snug">
            <p>Hi, friend.</p>
            <p>I'm so glad you're here.</p>
            <p>Before we head inside, let's get a few things ready for you and your dogs.</p>
            <p>There's no rush.</p>
            <p>We'll take it one step at a time, and if you need to come back later, I'll be right here waiting.</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2 text-sm md:text-[15px] text-[#2D2A27]/82 leading-snug">
            <p>Every dog deserves their own little place to call home.</p>
            <p>Each profile gets memories, health records, recipes, milestones, and adventures.</p>
            <p className="font-black text-[#B55D3B]">Tell me how many dogs you'd like to welcome today.</p>
          </div>
        )}

        {step > 2 && (
          <div className="space-y-2 text-sm md:text-[15px] text-[#2D2A27]/82 leading-snug">
            <p>Perfect.</p>
            <p>Next we'll build the rest of your family's porch step by step.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .note-paper {
          background-image:
            radial-gradient(circle at 10% 20%, rgba(122, 114, 89, 0.05) 0 1px, transparent 1px),
            linear-gradient(135deg, rgba(255,255,255,0.78), rgba(253,251,247,0.94));
          background-size: 18px 18px, 100% 100%;
        }

        .storybook-icon {
          filter: saturate(0.9);
          font-family: Georgia, serif;
        }

        .porch-stitch {
          opacity: 0;
          transform: scale(1.012) translateY(3px);
          transition: opacity 700ms ease, transform 900ms ease;
          transform-origin: center center;
        }

        .porch-stitch-loaded {
          opacity: 1;
          animation: stitch-arrive 2.6s ease-out both;
        }

        @keyframes stitch-arrive {
          0% { opacity: 0; transform: scale(1.018) translateY(6px) rotate(0deg); }
          28% { opacity: 1; transform: scale(1.006) translateY(0) rotate(0deg); }
          42% { transform: scale(1.006) translateY(0) rotate(-0.35deg); }
          55% { transform: scale(1.006) translateY(0) rotate(0.25deg); }
          70% { transform: scale(1.003) translateY(0) rotate(0deg); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
        }

        .lantern-glow {
          animation: lantern-flicker 4.8s ease-in-out infinite;
        }

        @keyframes lantern-flicker {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          35% { opacity: 0.55; transform: scale(1.08); }
          64% { opacity: 0.42; transform: scale(0.96); }
          82% { opacity: 0.6; transform: scale(1.12); }
        }

        .plant-sway {
          animation: plant-sway 6.5s ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes plant-sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.7deg); }
        }

        .leaf-drift {
          animation: leaf-drift 14s ease-in-out infinite;
        }

        @keyframes leaf-drift {
          0%, 78% { opacity: 0; transform: translateX(0) translateY(0) rotate(0deg); }
          80% { opacity: 0.7; }
          100% { opacity: 0; transform: translateX(420px) translateY(85px) rotate(280deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .porch-stitch-loaded, .lantern-glow, .plant-sway, .leaf-drift {
            animation: none !important;
          }
          .porch-stitch {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-0 sm:p-3 font-sans">
        <div className="w-full max-w-7xl h-auto lg:h-[calc(100vh-1.5rem)] lg:max-h-[900px] lg:min-h-[700px] overflow-hidden bg-white sm:rounded-[2.25rem] border border-[#B6A799]/25 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] h-full">
            <PorchPanel />

            <main className="bg-[#FDFBF7] p-5 sm:p-7 md:p-9 lg:p-10 flex flex-col min-h-[680px] lg:min-h-0">
              <PawProgress />

              <div className="flex-1 flex flex-col justify-center py-6 lg:py-5">
                {step === 1 && (
                  <section className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#6F7250]">
                        Welcome Home
                      </p>

                      <h1 className="text-5xl sm:text-6xl lg:text-[4.75rem] font-serif font-black text-[#2D2A27] leading-[0.92]">
                        Welcome<br />home.
                      </h1>

                      <div className="space-y-3 text-base lg:text-[17px] text-[#2D2A27]/75 leading-relaxed max-w-xl">
                        <p><strong className="text-[#2D2A27]">Hi! I'm Stitch.</strong></p>
                        <p>
                          Before we head inside, let's spend just a few minutes getting everything ready for you and your dogs.
                        </p>
                        <p>
                          Life with dogs isn't about getting everything perfect. It's about enjoying every moment together.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] bg-[#F4F0EA] border border-[#B6A799]/20 p-4 lg:p-5 shadow-sm">
                      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#6F7250] mb-3">
                        You'll set up:
                      </p>

                      <div className="grid grid-cols-3 gap-3">
                        <StoryIcon icon="👤" label="About You" />
                        <StoryIcon icon="🐶" label="Meet Your Dogs" />
                        <StoryIcon icon="❤️" label="Peace of Mind" />
                      </div>
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#6F7250]">
                        Your Dogs
                      </p>

                      <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-serif font-black text-[#2D2A27] leading-tight">
                        How many dogs would you like to add today?
                      </h1>

                      <p className="text-base lg:text-[17px] text-[#2D2A27]/75 leading-relaxed max-w-xl">
                        Each dog will have their own health center, journal, memory timeline, recipes, and milestones.
                        You can always add more dogs later.
                      </p>
                    </div>

                    <div className="rounded-[1.75rem] bg-[#F4F0EA] border border-[#B6A799]/20 p-6 lg:p-7 text-center shadow-sm">
                      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#6F7250] mb-5">
                        Dogs joining today
                      </p>

                      <div className="flex items-center justify-center gap-5 lg:gap-7">
                        <button
                          type="button"
                          onClick={decreaseDogCount}
                          disabled={dogCount <= 1}
                          className="h-13 w-13 min-h-13 min-w-13 rounded-2xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] disabled:opacity-30 hover:scale-105 active:scale-95 transition-all"
                        >
                          <Minus size={21} />
                        </button>

                        <div className="min-w-[115px]">
                          <div className="text-7xl lg:text-[5rem] font-black text-[#B55D3B] leading-none">{dogCount}</div>
                          <p className="text-sm font-black text-[#2D2A27]/60 mt-1">
                            {dogCount === 1 ? 'dog' : 'dogs'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={increaseDogCount}
                          className="h-13 w-13 min-h-13 min-w-13 rounded-2xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] hover:scale-105 active:scale-95 transition-all"
                        >
                          <Plus size={21} />
                        </button>
                      </div>

                      <p className="text-sm text-[#2D2A27]/60 mt-5">
                        Setting up more than one dog? We'll walk through each profile one at a time.
                      </p>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mx-auto h-20 w-20 rounded-full bg-[#F4F0EA] flex items-center justify-center text-4xl border border-[#B6A799]/20 shadow-sm">🐾</div>
                    <h1 className="text-4xl font-serif font-black text-[#2D2A27]">
                      Screen 3 is next.
                    </h1>
                    <p className="text-lg text-[#2D2A27]/70 max-w-xl mx-auto">
                      Dog count saved for this session: <strong>{dogCount}</strong>.
                      Next we'll build the About You screen with address fields and clear instructions.
                    </p>
                  </section>
                )}
              </div>

              <div className="space-y-3 border-t border-[#B6A799]/20 pt-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black text-[#6F7250] disabled:opacity-30 hover:bg-[#F4F0EA] transition-colors"
                  >
                    <ChevronLeft size={18} />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-[#B55D3B] hover:bg-[#9C4E30] px-8 py-3.5 text-white font-black text-base shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {step === 1 ? "Let's Go!" : step === 2 ? 'Continue' : 'Next'}
                    <ChevronRight size={21} />
                  </button>
                </div>

                <p className="text-center text-xs sm:text-sm text-[#2D2A27]/60 leading-relaxed">
                  ☕ Need a break? No worries. We'll save your progress so you can pick up right where you left off.
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
