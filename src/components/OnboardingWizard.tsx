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
    <div className="space-y-2 relative z-10">
      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.25em] text-[#7a7b5a]">
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
                isCurrent ? 'scale-110 bg-[#f5f1ea] shadow-sm' : 'scale-100'
              }`}
              title={`Step ${pawStep}`}
            >
              <span className={`text-lg leading-none transition-all duration-300 ${
                isComplete ? 'text-[#b65e3c]' : 'text-[#b7a89a]/45'
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
    <div className="rounded-2xl bg-white/95 p-3 text-center shadow-sm border border-[#b7a89a]/20">
      <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f1ea] shadow-inner text-2xl">
        {icon}
      </div>
      <p className="text-xs sm:text-sm font-black text-[#2e2b28] leading-tight">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f1ea] flex items-center justify-center p-0 sm:p-4 font-sans select-none overflow-x-hidden">
      <div className="w-full max-w-7xl h-auto lg:h-[calc(100vh-2rem)] lg:max-h-[850px] overflow-hidden bg-white sm:rounded-[2.25rem] border border-[#b7a89a]/30 shadow-2xl relative">
        
        {/* Dynamic Responsive Screen Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] h-full min-h-[100vh] lg:min-h-0">
          
          {/* Left Column: Premium Typography & Interactive Coded Interface */}
          <main className="bg-[#f5f1ea] lg:bg-[#FFFDF9] p-6 sm:p-10 lg:p-12 flex flex-col justify-between order-2 lg:order-1 relative z-30">
            <PawProgress />

            {/* Centralized Dynamic Viewport Content Wrapper */}
            <div className="flex-1 flex flex-col justify-center py-10 lg:py-6 max-w-xl mx-auto w-full">
              {step === 1 && (
                <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#7a7b5a]">
                      Welcome Home
                    </p>
                    <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-serif font-black text-[#2e2b28] leading-[0.95]">
                      Welcome<br />home.
                    </h1>
                    <div className="space-y-4 text-base lg:text-[17px] text-[#2e2b28]/80 leading-relaxed pt-2">
                      <p>
                        Before we head inside, let's spend just a few minutes getting everything ready for you and your dogs.
                      </p>
                      <p className="text-sm text-[#2e2b28]/60 italic font-medium">
                        "Life with dogs isn't about getting everything perfect. It's about enjoying every moment together."
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] bg-[#f5f1ea]/80 border border-[#b7a89a]/30 p-5 shadow-inner">
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#7a7b5a] mb-3">
                      Your Phase 1 Setup Checklist:
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <StoryIcon icon="👤" label="About You" />
                      <StoryIcon icon="🐶" label="Meet Dogs" />
                      <StoryIcon icon="❤️" label="Safety Center" />
                    </div>
                  </div>
                </section>
              )}

              {step === 2 && (
                <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#7a7b5a]">
                      Your Household Dogs
                    </p>
                    <h2 className="text-4xl lg:text-[3.25rem] font-serif font-black text-[#2e2b28] leading-tight">
                      How many dogs join today?
                    </h2>
                    <p className="text-base text-[#2e2b28]/75 leading-relaxed">
                      Each dog gets an interactive profile linking health files, active calendars, and vital care notes.
                    </p>
                  </div>

                  <div className="rounded-[1.75rem] bg-[#FFFDF9] border border-[#b7a89a]/30 p-6 text-center shadow-sm max-w-md mx-auto w-full">
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#7a7b5a] mb-4">
                      Dogs joining today
                    </p>
                    <div className="flex items-center justify-center gap-6">
                      <button
                        type="button"
                        onClick={decreaseDogCount}
                        disabled={dogCount <= 1}
                        className="h-12 w-12 rounded-2xl bg-[#f5f1ea] border border-[#b7a89a]/30 shadow-sm flex items-center justify-center text-[#2e2b28] disabled:opacity-30 hover:scale-105 active:scale-95 transition-all"
                      >
                        <Minus size={20} />
                      </button>
                      <div className="min-w-[100px]">
                        <div className="text-6xl font-black text-[#b65e3c] leading-none">{dogCount}</div>
                        <p className="text-xs font-black text-[#2e2b28]/50 mt-1 uppercase tracking-wider">
                          {dogCount === 1 ? 'Companion' : 'Companions'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={increaseDogCount}
                        className="h-12 w-12 rounded-2xl bg-[#f5f1ea] border border-[#b7a89a]/30 shadow-sm flex items-center justify-center text-[#2e2b28] hover:scale-105 active:scale-95 transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {step === 3 && (
                <section className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mx-auto h-16 w-16 rounded-full bg-[#b65e3c]/10 flex items-center justify-center text-3xl border border-[#b65e3c]/20 shadow-sm">👤</div>
                  <h3 className="text-3xl font-serif font-black text-[#2e2b28]">
                    Let's create your account profile
                  </h3>
                  <p className="text-base text-[#2e2b28]/70 max-w-md mx-auto">
                    We'll establish your basic home details and owner information next to configure the database for your <strong>{dogCount}</strong> {dogCount === 1 ? 'dog' : 'dogs'}.
                  </p>
                </section>
              )}
            </div>

            {/* Bottom Form Actions Control Panel */}
            <div className="space-y-4 border-t border-[#b7a89a]/20 pt-4 relative z-40">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-[#7a7b5a] disabled:opacity-0 hover:bg-[#f5f1ea] transition-all duration-200"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#b65e3c] hover:bg-[#8a6a52] px-8 py-3.5 text-white font-black text-base shadow-md hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] relative z-50 cursor-pointer"
                >
                  {step === 1 ? "Let's Go!" : step === 2 ? 'Continue' : 'Next'}
                  <ChevronRight size={18} />
                </button>
              </div>
              <p className="text-center text-xs text-[#2e2b28]/50">
                ☕ Need a break? Progress is actively logged so you won't lose your place.
              </p>
            </div>
          </main>

          {/* Right Column: High-End Vector Animation Frame Panel */}
          <div className="relative h-[40vh] lg:h-full overflow-hidden bg-[#f5f1ea] border-b lg:border-b-0 lg:border-l border-[#b7a89a]/20 order-1 lg:order-2 z-10">
            <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-12">
              <img
                src="/welcome-stitch.svg"
                alt="Stitch Attentive Companion vector art"
                className={`max-h-[35vh] lg:max-h-[75vh] w-full object-contain transition-all duration-700 ease-out transform ${
                  porchLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              />
            </div>

            {/* Subdued Elegant Lighting Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f1ea]/40 pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;