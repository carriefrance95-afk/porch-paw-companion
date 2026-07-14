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
    <div className="space-y-2 relative z-10 w-full">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#6F7250]">
        <span>Step {step} of {totalSteps}</span>
        <span>{step === 1 ? 'About 5 minutes' : 'You can add more later'}</span>
      </div>

      <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar" aria-label={`Step ${step} of ${totalSteps}`}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const pawStep = index + 1;
          const isComplete = pawStep <= step;
          const isCurrent = pawStep === step;

          return (
            <span
              key={pawStep}
              className={`inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 ${
                isCurrent ? 'scale-105 bg-[#F4F0EA] shadow-sm' : 'scale-100'
              }`}
              title={`Step ${pawStep}`}
            >
              <span className={`text-base sm:text-lg leading-none transition-all duration-300 ${
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
    <div className="rounded-xl bg-white/95 p-2 sm:p-3 text-center shadow-sm border border-[#B6A799]/10 flex flex-col items-center justify-center min-h-[90px] sm:min-h-[105px]">
      <div className="mx-auto mb-1.5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#F4F0EA] shadow-inner p-1">
        <img 
          src={src} 
          alt={label} 
          className="w-full h-full object-contain"
          onError={(e) => {
            console.log(`Asset pipeline path missing or mismatch: ${src}`);
          }}
        />
      </div>
      <p className="text-[11px] sm:text-xs font-black text-[#2D2A27] leading-tight mt-0.5">{label}</p>
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

        /* Hide scrollbar utility for mobile step viewports */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-0 sm:p-4 font-sans">
        <div className="w-full max-w-6xl h-screen sm:h-auto lg:h-[calc(100vh-2rem)] lg:max-h-[820px] overflow-y-auto lg:overflow-hidden bg-white sm:rounded-[2rem] border border-[#B6A799]/25 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] h-full min-h-screen sm:min-h-0">
            
            {/* Left Panel: Graphic Workspace Container Layout */}
            <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-full overflow-hidden bg-[#F4F0EA] border-b lg:border-b-0 lg:border-r border-[#B6A799]/20">
              <img
                src="/welcome-stitch.svg"
                alt="Stitch waiting on the Porch & Paw porch"
                className={`absolute inset-0 h-full w-full object-cover porch-stitch ${porchLoaded ? 'porch-stitch-loaded' : ''}`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/95 via-[#FDFBF7]/10 to-transparent lg:from-[#F4F0EA]/80" />

              {/* Responsive Overlay Floating Paper Card */}
              <div className="absolute left-4 right-4 bottom-4 sm:left-6 sm:bottom-6 lg:left-6 lg:bottom-8 lg:w-[360px] rounded-2xl bg-[#FFFDF8]/94 backdrop-blur-[2px] shadow-[0_10px_25px_rgba(45,42,39,0.12)] p-4 sm:p-5 note-paper z-20">
                {step === 1 && (
                  <div className="space-y-1.5 text-xs sm:text-sm text-[#2D2A27]/85 leading-snug font-medium">
                    <p>Hi, friend.</p>
                    <p>I'm so glad you're here.</p>
                    <p>Before we head inside, let's get a few things ready for you and your dogs.</p>
                    <p>There's no rush.</p>
                    <p>We'll take it one step at a time, and if you need to come back later, I'll be right here waiting.</p>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-1.5 text-xs sm:text-sm text-[#2D2A27]/85 leading-snug font-medium">
                    <p>Every dog deserves their own little place to call home.</p>
                    <p className="font-bold text-[#B55D3B]">Tell me how many dogs you'd like to welcome today.</p>
                  </div>
                )}

                {step > 2 && (
                  <div className="space-y-1.5 text-xs sm:text-sm text-[#2D2A27]/85 leading-snug font-medium">
                    <p>Perfect.</p>
                    <p>Next we'll build the rest of your family's porch step by step.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Content Input Workspace */}
            <main className="bg-[#FDFBF7] p-5 sm:p-8 lg:p-10 flex flex-col justify-between relative z-30 min-h-[480px] lg:min-h-0">
              <PawProgress />

              <div className="flex-1 flex flex-col justify-center py-6 lg:py-4">
                {step === 1 && (
                  <section className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
                    <div className="space-y-2.5">
                      <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.35em] text-[#6F7250]">
                        Welcome Home
                      </p>

                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#2D2A27] leading-tight">
                        Welcome home.
                      </h1>

                      <div className="space-y-2 text-sm sm:text-base text-[#2D2A27]/75 leading-relaxed max-w-md">
                        <p><strong className="text-[#2D2A27]">Hi! I'm Stitch.</strong></p>
                        <p>
                          Before we head inside, let's spend just a few minutes getting everything ready for you and your dogs.
                        </p>
                      </div>
                    </div>

                    {/* True Extension-Matched Checklist Grid */}
                    <div className="rounded-2xl bg-[#F4F0EA] border border-[#B6A799]/20 p-4 shadow-sm">
                      <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#6F7250] mb-3">
                        You'll set up:
                      </p>

                      <div className="grid grid-cols-3 gap-2.5">
                        <StoryIcon src="/About You.png" label="About You" />
                        <StoryIcon src="/Meet Your Dogs.png" label="Meet Dogs" />
                        <StoryIcon src="/Peace of Mind.png" label="Safety" />
                      </div>
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
                    <div className="space-y-2">
                      <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.35em] text-[#6F7250]">
                        Your Dogs
                      </p>

                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#2D2A27] leading-snug">
                        How many dogs would you like to add today?
                      </h1>

                      <p className="text-xs sm:text-sm text-[#2D2A27]/75 leading-relaxed max-w-md">
                        Each dog will have their own health center, active layout grids, reminders, and milestones.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F4F0EA] border border-[#B6A799]/20 p-4 sm:p-6 text-center shadow-sm">
                      <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-[#6F7250] mb-4">
                        Dogs joining today
                      </p>

                      <div className="flex items-center justify-center gap-4 sm:gap-6">
                        <button
                          type="button"
                          onClick={decreaseDogCount}
                          disabled={dogCount <= 1}
                          className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] disabled:opacity-30 active:scale-95 transition-all"
                        >
                          <Minus size={18} />
                        </button>

                        <div className="min-w-[80px]">
                          <div className="text-5xl sm:text-6xl font-black text-[#B55D3B] leading-none">{dogCount}</div>
                          <p className="text-xs font-black text-[#2D2A27]/60 mt-0.5">
                            {dogCount === 1 ? 'dog' : 'dogs'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={increaseDogCount}
                          className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] active:scale-95 transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-3 duration-400">
                    <div className="mx-auto h-16 w-16 rounded-full bg-[#F4F0EA] flex items-center justify-center text-3xl border border-[#B6A799]/20 shadow-sm">🐾</div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2D2A27]">
                      Screen 3 is next.
                    </h1>
                    <p className="text-sm sm:text-base text-[#2D2A27]/70 max-w-sm mx-auto">
                      Dog count saved for this session: <strong>{dogCount}</strong>. Next we'll load your owner profile fields.
                    </p>
                  </section>
                )}
              </div>

              {/* Bottom Action Strip - Optimized for Mobile Thumb Taps */}
              <div className="space-y-3 border-t border-[#B6A799]/15 pt-4 w-full">
                <div className="flex flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-[#6F7250] disabled:opacity-0 hover:bg-[#F4F0EA] transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B55D3B] hover:bg-[#9C4E30] px-6 sm:px-8 py-2.5 sm:py-3 text-white font-black text-sm sm:text-base shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {step === 1 ? "Let's Go!" : step === 2 ? 'Continue' : 'Next'}
                    <ChevronRight size={18} />
                  </button>
                </div>
                <p className="text-center text-[11px] sm:text-xs text-[#2D2A27]/50 leading-normal">
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