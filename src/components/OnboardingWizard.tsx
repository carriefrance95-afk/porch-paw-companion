import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [dogCount, setDogCount] = useState(1);

  const totalSteps = 7;
  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const increaseDogCount = () => setDogCount(prev => Math.min(prev + 1, 10));
  const decreaseDogCount = () => setDogCount(prev => Math.max(prev - 1, 1));
  const progressPercent = (step / totalSteps) * 100;

  const ProgressHeader = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#6F7250]">
        <span>Step {step} of {totalSteps}</span>
        <span>{step === 1 ? 'About 5 minutes' : 'You can add more later'}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#E9E1D7] overflow-hidden">
        <div className="h-full rounded-full bg-[#6F7250] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );

  const PorchPanel = () => (
    <div className="relative min-h-[520px] lg:min-h-full overflow-hidden bg-[#F4F0EA]">
      <img src="/stitch-porch.png" alt="Stitch waiting on the Porch & Paw porch" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/95 via-[#FDFBF7]/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#FDFBF7]/10" />

      <div className="absolute left-5 right-5 bottom-5 md:left-8 md:right-auto md:bottom-8 md:w-[470px] rounded-[1.75rem] bg-[#FDFBF7]/94 backdrop-blur-sm border border-white/70 shadow-xl p-5 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#B55D3B] mb-3">🐾 Stitch Says...</p>

        {step === 1 && (
          <div className="space-y-2 text-sm md:text-base text-[#2D2A27]/80 leading-relaxed">
            <p>I'm so glad you're here.</p>
            <p>Let's get everything ready for you and your dogs.</p>
            <p>You don't have to do everything today. We'll take it one step at a time, and you can always come back later.</p>
            <p className="font-black text-[#B55D3B]">I'll be right here whenever you need a helping paw.</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2 text-sm md:text-base text-[#2D2A27]/80 leading-relaxed">
            <p>Every dog deserves their own little place to call home.</p>
            <p>Each profile gets memories, health records, recipes, milestones, and adventures.</p>
            <p className="font-black text-[#B55D3B]">Tell me how many dogs you'd like to welcome today.</p>
          </div>
        )}

        {step > 2 && (
          <div className="space-y-2 text-sm md:text-base text-[#2D2A27]/80 leading-relaxed">
            <p>Perfect.</p>
            <p>Next we'll build the rest of your family's porch step by step.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-0 sm:p-4 font-sans">
      <div className="w-full max-w-7xl min-h-screen sm:min-h-[780px] overflow-hidden bg-white sm:rounded-[2.5rem] border border-[#B6A799]/25 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.95fr] min-h-screen sm:min-h-[780px]">
          <PorchPanel />

          <main className="bg-[#FDFBF7] p-6 sm:p-8 md:p-12 flex flex-col">
            <ProgressHeader />

            <div className="flex-1 flex flex-col justify-center py-8 md:py-10">
              {step === 1 && (
                <section className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-5">
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-[#6F7250]">Welcome Home</p>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-black text-[#2D2A27] leading-[0.95]">Welcome<br />home.</h1>
                    <div className="space-y-4 text-base sm:text-lg text-[#2D2A27]/75 leading-relaxed max-w-xl">
                      <p><strong className="text-[#2D2A27]">Hi! I'm Stitch.</strong></p>
                      <p>Before we jump in, let's spend just a few minutes getting everything ready for you and your dogs.</p>
                      <p>Life with dogs isn't about getting everything perfect. It's about enjoying every moment together.</p>
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#F4F0EA] border border-[#B6A799]/20 p-5 sm:p-6 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#6F7250] mb-4">You'll set up:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-2xl bg-white p-4 text-center shadow-sm border border-[#B6A799]/10">
                        <div className="text-3xl mb-2">👤</div>
                        <p className="text-sm font-black text-[#2D2A27]">About You</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 text-center shadow-sm border border-[#B6A799]/10">
                        <div className="text-3xl mb-2">🐶</div>
                        <p className="text-sm font-black text-[#2D2A27]">Meet Your Dogs</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 text-center shadow-sm border border-[#B6A799]/10">
                        <div className="text-3xl mb-2">❤️</div>
                        <p className="text-sm font-black text-[#2D2A27]">Peace of Mind</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {step === 2 && (
                <section className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-5">
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-[#6F7250]">Your Dogs</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#2D2A27] leading-tight">How many dogs would you like to add today?</h1>
                    <p className="text-base sm:text-lg text-[#2D2A27]/75 leading-relaxed max-w-xl">
                      Each dog will have their own health center, journal, memory timeline, recipes, and milestones. You can always add more dogs later.
                    </p>
                  </div>

                  <div className="rounded-[2rem] bg-[#F4F0EA] border border-[#B6A799]/20 p-7 sm:p-8 text-center shadow-sm">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#6F7250] mb-7">Dogs joining today</p>
                    <div className="flex items-center justify-center gap-5 sm:gap-7">
                      <button type="button" onClick={decreaseDogCount} disabled={dogCount <= 1} className="h-14 w-14 rounded-2xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] disabled:opacity-30 hover:scale-105 active:scale-95 transition-all">
                        <Minus size={22} />
                      </button>
                      <div className="min-w-[120px]">
                        <div className="text-7xl sm:text-8xl font-black text-[#B55D3B] leading-none">{dogCount}</div>
                        <p className="text-sm font-black text-[#2D2A27]/60 mt-2">{dogCount === 1 ? 'dog' : 'dogs'}</p>
                      </div>
                      <button type="button" onClick={increaseDogCount} className="h-14 w-14 rounded-2xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] hover:scale-105 active:scale-95 transition-all">
                        <Plus size={22} />
                      </button>
                    </div>
                    <p className="text-sm text-[#2D2A27]/60 mt-7">Setting up more than one dog? We'll walk through each profile one at a time.</p>
                  </div>
                </section>
              )}

              {step === 3 && (
                <section className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mx-auto h-24 w-24 rounded-full bg-[#F4F0EA] flex items-center justify-center text-5xl border border-[#B6A799]/20 shadow-sm">🐾</div>
                  <h1 className="text-4xl font-serif font-black text-[#2D2A27]">Screen 3 is next.</h1>
                  <p className="text-lg text-[#2D2A27]/70 max-w-xl mx-auto">
                    Dog count saved for this session: <strong>{dogCount}</strong>. Next we'll build the About You screen with address fields and clear instructions.
                  </p>
                </section>
              )}
            </div>

            <div className="space-y-5 border-t border-[#B6A799]/20 pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="button" onClick={prevStep} disabled={step === 1} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-[#6F7250] disabled:opacity-30 hover:bg-[#F4F0EA] transition-colors">
                  <ChevronLeft size={18} /> Back
                </button>
                <button type="button" onClick={nextStep} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-[#B55D3B] hover:bg-[#9C4E30] px-9 py-4 text-white font-black text-base sm:text-lg shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]">
                  {step === 1 ? "Let's Get Started" : step === 2 ? 'Continue' : 'Next'}
                  <ChevronRight size={22} />
                </button>
              </div>

              <p className="text-center text-sm text-[#2D2A27]/60 leading-relaxed">
                ☕ Need a break? No worries. We'll save your progress so you can pick up right where you left off.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
