import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Minus, Plus } from 'lucide-react';

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [dogCount, setDogCount] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const increaseDogCount = () => setDogCount(prev => Math.min(prev + 1, 10));
  const decreaseDogCount = () => setDogCount(prev => Math.max(prev - 1, 1));

  const progressPercent = step === 1 ? 14 : step === 2 ? 28 : 42;

  const ProgressHeader = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.25em] text-[#7A7A59]">
        <span>Step {step} of 7</span>
        <span>{step === 1 ? 'About 5 minutes' : 'You can add more later'}</span>
      </div>

      <div className="h-2 w-full rounded-full bg-[#E9E1D7] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#7A7A59] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );

  const StitchCard = ({ mood = 'welcome' }: { mood?: 'welcome' | 'thinking' | 'ready' }) => (
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-[#F4F0EA] border border-[#B6A799]/30 shadow-xl overflow-hidden">
      <div className="absolute inset-4 rounded-full bg-white/70" />
      <div className="relative z-10 text-center">
        <div className="text-6xl mb-2">{mood === 'thinking' ? '🐶' : mood === 'ready' ? '🐾' : '🏡'}</div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#B55D3B]">Stitch</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#B6A799]/25 bg-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] min-h-[680px]">
          <div className="relative bg-gradient-to-br from-[#F4F0EA] via-[#FDFBF7] to-[#EAE4DA] p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#B55D3B]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#7A7A59]/10 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#7A7A59] shadow-sm">
                <Home size={14} />
                Porchside Pet Life
              </div>
            </div>

            <div className="relative z-10 py-10">
              <StitchCard mood={step === 1 ? 'welcome' : 'thinking'} />

              <div className="mt-8 rounded-[2rem] bg-white/75 border border-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#B55D3B] mb-3">
                  A note from Stitch
                </p>

                {step === 1 && (
                  <p className="text-[#2D2A27]/80 leading-relaxed">
                    I'm right here whenever you need a helping paw. You don't have to get everything perfect today.
                    We'll take this one step at a time, and you can always come back later.
                  </p>
                )}

                {step === 2 && (
                  <p className="text-[#2D2A27]/80 leading-relaxed">
                    Every dog gets their own space for memories, health records, recipes, milestones, and adventures.
                    Tell me how many you'd like to welcome today.
                  </p>
                )}

                {step > 2 && (
                  <p className="text-[#2D2A27]/80 leading-relaxed">
                    Great. Next we'll set up your account details and start welcoming your dogs into the porch.
                  </p>
                )}
              </div>
            </div>

            <div className="relative z-10 text-xs text-[#7A7A59] leading-relaxed">
              🐾 Need a break? No worries. Your progress will be saved as we build this flow.
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col">
            <ProgressHeader />

            <div className="flex-1 flex flex-col justify-center py-10">
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-5">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-[#7A7A59]">Welcome Home</p>
                    <h1 className="text-5xl md:text-6xl font-serif font-black text-[#2D2A27] leading-tight">
                      Welcome home.
                    </h1>
                    <div className="space-y-4 text-lg text-[#2D2A27]/75 leading-relaxed">
                      <p>Hi! I'm Stitch.</p>
                      <p>
                        Before we jump in, let's spend just a few minutes getting everything ready for you and your dogs.
                      </p>
                      <p>
                        Life with dogs isn't about getting everything perfect. It's about enjoying every moment together.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#F4F0EA] border border-[#B6A799]/20 p-6">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7A7A59] mb-4">
                      You'll set up:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                        <div className="text-2xl mb-2">👤</div>
                        <p className="text-sm font-bold text-[#2D2A27]">Your account</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                        <div className="text-2xl mb-2">🐶</div>
                        <p className="text-sm font-bold text-[#2D2A27]">Your dog(s)</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                        <div className="text-2xl mb-2">❤️</div>
                        <p className="text-sm font-bold text-[#2D2A27]">Health basics</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-5">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-[#7A7A59]">Your Dogs</p>
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2D2A27] leading-tight">
                      How many dogs would you like to add today?
                    </h1>
                    <p className="text-lg text-[#2D2A27]/75 leading-relaxed">
                      Each dog will have their own health center, journal, memory timeline, recipes, and milestones.
                      You can always add more dogs later.
                    </p>
                  </div>

                  <div className="rounded-[2rem] bg-[#F4F0EA] border border-[#B6A799]/20 p-8 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#7A7A59] mb-6">
                      Dogs joining today
                    </p>

                    <div className="flex items-center justify-center gap-6">
                      <button
                        type="button"
                        onClick={decreaseDogCount}
                        disabled={dogCount <= 1}
                        className="h-14 w-14 rounded-2xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27] disabled:opacity-30"
                      >
                        <Minus size={22} />
                      </button>

                      <div className="min-w-[120px]">
                        <div className="text-7xl font-black text-[#B55D3B] leading-none">{dogCount}</div>
                        <p className="text-sm font-bold text-[#2D2A27]/60 mt-2">
                          {dogCount === 1 ? 'dog' : 'dogs'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={increaseDogCount}
                        className="h-14 w-14 rounded-2xl bg-white border border-[#B6A799]/30 shadow-sm flex items-center justify-center text-[#2D2A27]"
                      >
                        <Plus size={22} />
                      </button>
                    </div>

                    <p className="text-sm text-[#2D2A27]/60 mt-6">
                      Setting up more than one dog? We'll walk through each profile one at a time.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <StitchCard mood="ready" />
                  <h1 className="text-4xl font-serif font-black text-[#2D2A27]">
                    Screen 3 is next.
                  </h1>
                  <p className="text-lg text-[#2D2A27]/70 max-w-xl mx-auto">
                    Dog count saved for this session: <strong>{dogCount}</strong>.
                    Next we'll build the About You screen with address fields and clear instructions.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#B6A799]/20 pt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-[#7A7A59] disabled:opacity-30"
              >
                <ChevronLeft size={18} />
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#B55D3B] hover:bg-[#9C4E30] px-8 py-4 text-white font-black shadow-lg transition-all"
              >
                {step === 1 ? "Let's Get Started" : step === 2 ? 'Continue' : 'Next'}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
