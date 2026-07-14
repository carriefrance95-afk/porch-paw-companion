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
    <div className="space-y-1 relative z-10 w-full">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.22em] text-[#6F7250]">
        <span>Step {step} of {totalSteps}</span>
        <span>{step === 1 ? 'About 5 minutes' : 'You can add more later'}</span>
      </div>

      <div className="flex items-center gap-1 pt-0.5 overflow-x-auto no-scrollbar" aria-label={`Step ${step} of ${totalSteps}`}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const pawStep = index + 1;
          const isComplete = pawStep <= step;
          const isCurrent = pawStep === step;

          return (
            <span
              key={pawStep}
              className={`inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 ${
                isCurrent ? 'bg-[#F4F0EA] shadow-sm scale-105' : 'scale-100'
              }`}
              title={`Step ${pawStep}`}
            >
              <span className={`text-sm sm:text-base leading-none transition-all duration-300 ${
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

  const StoryIcon = ({ src, label }: { src: string; label: string }) => (
    <div className="rounded-xl bg-white/95 p-1.5 text-center shadow-sm border border-[#B6A799]/10 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[90px]">
      <div className="mx-auto mb-1 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#F4F0EA] shadow-inner p-1">
        <img 
          src={src} 
          alt={label} 
          className="w-full h-full object-contain"
          onError={(e) => {
            console.log(`Asset link check missing: ${src}`);
          }}
        />
      </div>
      <p className="text-[9px] sm:text-xs font-black text-[#2D2A27] leading-tight mt-0.5">{label}</p>
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

        .porch-stitch {
          opacity: 0;
          transform: scale(1.012) translateY(3px);
          transition: opacity 700ms ease, transform 900ms ease;
          transform-origin: center center;
        }

        .porch-stitch-loaded {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-0 sm:p-3 font-sans">
        <div className="w-full max-w-5xl h-screen sm:h-auto lg:h-[calc(100vh-2rem)] lg:max-h-[720px] overflow-y-auto lg:overflow-hidden bg-white sm:rounded-[1.5rem] border border-[#B6A799]/25 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] h-full min-h-screen sm:min-h-0">
            
            {/* Left Panel: Scaled Main Image Viewport using /stitch-porch.svg */}
            <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-[#F4F0EA] border-b lg:border-b-0 lg:border-r border-[#B6A799]/20">
              <img
                src="/stitch-porch.svg"
                alt="Stitch waiting on the Porch & Paw porch"
                className={`absolute inset-0 h-full w-full object-cover porch-stitch ${porchLoaded ? 'porch-stitch-loaded' : ''}`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/95 via-[#FDFBF7]/10 to-transparent lg:from-[#F4F0EA]/70" />

              {/* Floating Story Note Overlay */}
              <div className="absolute left-3 right-4 bottom-3 sm:left-5 sm:bottom-5 lg:left-5 lg:bottom-6 lg:w-[320px] rounded-xl bg-[#FFFDF8]/94 backdrop-blur-[2px] shadow-[0_6px_18px_rgba(45,42,39,0.08)] p-3.5 note-paper z-20">
                {step === 1 && (
                  <div className="space-y-1 text-xs sm:text-sm text-[#2D2A27]/85 leading-snug font-medium">
                    <p>Hi, friend.</p>
                    <p>I'm so glad you're here.</p>
                    <p>Before we head inside, let's get a few things ready for you and your dogs.</p>
                    <p>There's no rush.</p>
                    <p>We'll take it one step at a time, and if you need to come back later, I'll be right here waiting.</p>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-1 text-xs sm:text-sm text-[#2D2A27]/85 leading-snug font-medium">
                    <p>Every dog deserves their own little place to call home.</p>
                    <p className="font-bold text-[#B55D3B]">Tell me how many dogs you'd like to welcome today.</p>
                  </div>
                )}

                {step > 2 && (
                  <div className="space-y-1 text-xs sm:text-sm text-[#2D2A27]/85 leading-snug font-medium">
                    <p>Perfect.</p>
                    <p>Next we'll build the rest of your family's porch step by step.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Compact Text Layout & True Extension Mappings */}
            <main className="bg-[#FDFBF7] p-4 sm:p-6 lg:p-7 flex flex-col justify-between relative z-30 min-h-[420px] lg:min-h-0">
              <PawProgress />

              <div className="flex-1 flex flex-col justify-center py-3 lg:py-1">
                {step === 1 && (
                  <section className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F7250]">
                        Welcome Home
                      </p>

                      <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2D2A27] leading-tight">
                        Welcome home.
                      </h1>

                      <div className="space-y-1 text-xs sm:text-sm text-[#2D2A27]/75 leading-relaxed max-w-sm">
                        <p><strong className="text-[#2D2A27]">Hi! I'm Stitch.</strong></p>
                        <p>
                          Before we head inside, let's spend just a few minutes getting everything ready for you and your dogs.
                        </p>
                      </div>
                    </div>

                    {/* Exact Icon Mapping Container */}
                    <div className="rounded-xl bg-[#F4F0EA] border border-[#B6A799]/15 p-3 shadow-sm">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#6F7250] mb-2">
                        You'll set up:
                      </p>

                      <div className="grid grid-cols-3 gap-2">
                        <StoryIcon src="/About You.svg" label="About You" />
                        <StoryIcon src="/Meet Your Dogs.png" label="Meet Dogs" />
                        <StoryIcon src="/Peace of Mind.png" label="Safety" />
                      </div>
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F7250]">
                        Your Dogs
                      </p>

                      <h1 className="text-xl sm:text-2xl font-serif font-black text-[#2D2A27] leading-snug">
                        How many dogs would you like to add today?
                      </h1>

                      <p className="text-xs text-[#2D2A27]/75 leading-relaxed max-w-sm">
                        Each dog will have their own health center, active layout grids, reminders, and milestones.
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F4F0EA] border border-[#B6A799]/15 p-3 text-center shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6F7250] mb-2">
                        Dogs joining today
                      </p>

                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={decreaseDogCount}
                          disabled={dogCount <= 1}
                          className="h-9 w-10 rounded-xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] disabled:opacity-30 active:scale-95 transition-all"
                        >
                          <Minus size={15} />
                        </button>

                        <div className="min-w-[65px]">
                          <div className="text-3xl sm:text-4xl font-black text-[#B55D3B] leading-none">{dogCount}</div>
                          <p className="text-[10px] font-black text-[#2D2A27]/60 mt-0.5">
                            {dogCount === 1 ? 'dog' : 'dogs'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={increaseDogCount}
                          className="h-9 w-10 rounded-xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] active:scale-95 transition-all"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section className="space-y-3 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="mx-auto h-12 w-12 rounded-full bg-[#F4F0EA] flex items-center justify-center text-xl border border-[#B6A799]/15 shadow-sm">🐾</div>
                    <h1 className="text-lg sm:text-xl font-serif font-black text-[#2D2A27]">
                      Screen 3 is next.
                    </h1>
                    <p className="text-xs text-[#2D2A27]/70 max-w-xs mx-auto">
                      Dog count saved for this session: <strong>{dogCount}</strong>. Next we'll load your owner profile fields.
                    </p>
                  </section>
                )}
              </div>

              {/* Bottom Touch Targets */}
              <div className="space-y-2 border-t border-[#B6A799]/15 pt-2.5 w-full">
                <div className="flex flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="inline-flex items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-xs font-black text-[#6F7250] disabled:opacity-0 hover:bg-[#F4F0EA] transition-colors"
                  >
                    <ChevronLeft size={14} />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#B55D3B] hover:bg-[#9C4E30] px-4 sm:px-6 py-2 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {step === 1 ? "Let's Go!" : step === 2 ? 'Continue' : 'Next'}
                    <ChevronRight size={15} />
                  </button>
                </div>
                <p className="text-center text-[10px] text-[#2D2A27]/50 leading-normal">
                  ☕ Need a break? No worries. We'll save your progress as you go.
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