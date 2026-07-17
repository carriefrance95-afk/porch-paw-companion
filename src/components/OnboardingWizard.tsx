import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Dog,
  Home,
  Minus,
  Plus,
  Sprout,
  UserRound,
} from "lucide-react";

type DogProfile = {
  name: string;
  breed: string;
  sex: string;
  lifeStage: string;
  birthday: string;
  weight: string;
};

const UNITED_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "District of Columbia",
];

const CANADIAN_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

const createEmptyDogProfile = (): DogProfile => ({
  name: "",
  breed: "",
  sex: "",
  lifeStage: "",
  birthday: "",
  weight: "",
});

const getDetectedTimeZone = () => {
  try {
    return (
      Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York"
    );
  } catch {
    return "America/New_York";
  }
};

const getFriendlyTimeZoneName = (timeZone: string) => {
  const knownTimeZones: Record<string, string> = {
    "America/New_York": "Eastern Time",
    "America/Detroit": "Eastern Time",
    "America/Indiana/Indianapolis": "Eastern Time",
    "America/Indiana/Marengo": "Eastern Time",
    "America/Indiana/Vevay": "Eastern Time",
    "America/Indiana/Vincennes": "Eastern Time",
    "America/Indiana/Winamac": "Eastern Time",
    "America/Kentucky/Louisville": "Eastern Time",
    "America/Kentucky/Monticello": "Eastern Time",
    "America/Chicago": "Central Time",
    "America/Indiana/Knox": "Central Time",
    "America/Indiana/Tell_City": "Central Time",
    "America/Menominee": "Central Time",
    "America/North_Dakota/Beulah": "Central Time",
    "America/North_Dakota/Center": "Central Time",
    "America/North_Dakota/New_Salem": "Central Time",
    "America/Denver": "Mountain Time",
    "America/Boise": "Mountain Time",
    "America/Phoenix": "Arizona Time",
    "America/Los_Angeles": "Pacific Time",
    "America/Anchorage": "Alaska Time",
    "America/Juneau": "Alaska Time",
    "America/Nome": "Alaska Time",
    "America/Sitka": "Alaska Time",
    "America/Yakutat": "Alaska Time",
    "Pacific/Honolulu": "Hawaii Time",
    "America/Toronto": "Eastern Time",
    "America/Vancouver": "Pacific Time",
    "America/Edmonton": "Mountain Time",
    "America/Winnipeg": "Central Time",
    "Europe/London": "United Kingdom Time",
    "Australia/Sydney": "Sydney Time",
    "Australia/Melbourne": "Melbourne Time",
    "Australia/Brisbane": "Brisbane Time",
    "Australia/Perth": "Perth Time",
  };

  if (knownTimeZones[timeZone]) {
    return knownTimeZones[timeZone];
  }

  return timeZone.replaceAll("_", " ").replaceAll("/", " · ");
};

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [dogCount, setDogCount] = useState(1);
  const [porchLoaded, setPorchLoaded] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [timeZone] = useState(getDetectedTimeZone);
  const [country, setCountry] = useState("United States");
  const [stateProvince, setStateProvince] = useState("");

  const [dogProfiles, setDogProfiles] = useState<DogProfile[]>([
    createEmptyDogProfile(),
  ]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);

  const totalSteps = 5;

  const friendlyTimeZone = useMemo(
    () => getFriendlyTimeZoneName(timeZone),
    [timeZone],
  );

  const locationSuggestions = useMemo(() => {
    if (country === "United States") {
      return UNITED_STATES;
    }

    if (country === "Canada") {
      return CANADIAN_PROVINCES;
    }

    return [];
  }, [country]);

  const currentDog = dogProfiles[currentDogIndex] || createEmptyDogProfile();

  const displayName = preferredName.trim() || firstName.trim() || "friend";
  const dogNames = dogProfiles
    .map((dogProfile) => dogProfile.name.trim())
    .filter(Boolean);

  const dogNamesText =
    dogNames.length === 0
      ? "your dogs"
      : dogNames.length === 1
        ? dogNames[0]
        : dogNames.length === 2
          ? `${dogNames[0]} and ${dogNames[1]}`
          : `${dogNames.slice(0, -1).join(", ")}, and ${dogNames.at(-1)}`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPorchLoaded(true);
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setDogProfiles((previousProfiles) => {
      if (previousProfiles.length === dogCount) {
        return previousProfiles;
      }

      if (previousProfiles.length < dogCount) {
        return [
          ...previousProfiles,
          ...Array.from(
            { length: dogCount - previousProfiles.length },
            createEmptyDogProfile,
          ),
        ];
      }

      return previousProfiles.slice(0, dogCount);
    });

    setCurrentDogIndex((previousIndex) =>
      Math.min(previousIndex, dogCount - 1),
    );
  }, [dogCount]);

  const completeOnboarding = async () => {
    const { supabase } = await import("../utils/supabaseClient");
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;

    if (!userId) {
      return;
    }

    localStorage.setItem(`onboarding_complete_${userId}`, "true");
    window.dispatchEvent(new Event("porchside:onboarding-complete"));
  };

  const nextStep = () => {
    if (step === 4 && currentDogIndex < dogCount - 1) {
      setCurrentDogIndex((previousIndex) => previousIndex + 1);
      return;
    }

    setStep((previousStep) => Math.min(previousStep + 1, totalSteps));
  };

  const prevStep = () => {
    if (step === 4 && currentDogIndex > 0) {
      setCurrentDogIndex((previousIndex) => previousIndex - 1);
      return;
    }

    setStep((previousStep) => Math.max(previousStep - 1, 1));
  };

  const increaseDogCount = () => {
    setDogCount((previousCount) => Math.min(previousCount + 1, 10));
  };

  const decreaseDogCount = () => {
    setDogCount((previousCount) => Math.max(previousCount - 1, 1));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
    setStateProvince("");
  };

  const updateCurrentDog = (field: keyof DogProfile, value: string) => {
    setDogProfiles((previousProfiles) =>
      previousProfiles.map((dogProfile, index) =>
        index === currentDogIndex
          ? {
              ...dogProfile,
              [field]: value,
            }
          : dogProfile,
      ),
    );
  };

  const isCurrentStepValid = () => {
    if (step === 3) {
      return firstName.trim().length > 0;
    }

    if (step === 4) {
      return currentDog.name.trim().length > 0;
    }

    return true;
  };

  const getPrimaryButtonLabel = () => {
    if (step === 1) {
      return "Let's Head Inside";
    }

    if (step === 2) {
      return "Let's Keep Going";
    }

    if (step === 3) {
      return "Continue Home";
    }

    if (step === 4 && currentDogIndex < dogCount - 1) {
      return "Meet the Next Dog";
    }

    if (step === 4) {
      return "Welcome Them Home";
    }

    if (step === 5) {
      return "Open My Porch";
    }

    return "Next Step";
  };

  const PawProgress = () => (
    <div className="relative z-10 w-full space-y-2">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.22em] text-[#6F7250]">
        <span>
          Step {step} of {totalSteps}
        </span>

        <span>{step === 1 ? "About 5 minutes" : "You can add more later"}</span>
      </div>

      <div
        className="flex min-h-[28px] items-center"
        aria-label={`Step ${step} of ${totalSteps}`}
      >
        <img
          src="/assets/progress/paw-progress.svg"
          alt=""
          aria-hidden="true"
          className="h-auto w-[190px] max-w-full object-contain object-left"
        />
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
            style={{
              transform: `scale(${imageScale})`,
            }}
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
              circle at 12% 20%,
              rgba(122, 114, 89, 0.045) 0 1px,
              transparent 1px
            ),
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.9),
              rgba(253, 251, 247, 0.97)
            );
          background-size: 18px 18px, 100% 100%;
        }

        .sage-tray {
          background-image:
            radial-gradient(
              circle at 18% 22%,
              rgba(122, 113, 71, 0.055) 0 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 82% 68%,
              rgba(255, 255, 255, 0.34) 0 1px,
              transparent 1px
            ),
            linear-gradient(
              180deg,
              #edf1e8 0%,
              #e4e9dd 52%,
              #dce3d5 100%
            );
          background-size:
            22px 22px,
            28px 28px,
            100% 100%;
        }

        .porch-stitch {
          opacity: 0;
          transform: scale(1.14);
          transform-origin: 52% 52%;
          transition: opacity 700ms ease;
        }

        .porch-stitch-loaded {
          opacity: 1;
          transform: scale(1.14);
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
          border: 1px solid rgba(255, 255, 255, 0.82);
          outline: 1px solid rgba(210, 205, 196, 0.42);
          box-shadow:
            0 2px 6px rgba(45, 42, 39, 0.04),
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

        .onboarding-field {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(182, 167, 153, 0.38);
          background: rgba(255, 255, 255, 0.96);
          padding: 10px 12px;
          color: #2d2a27;
          font-size: 13px;
          line-height: 1.4;
          outline: none;
          box-shadow: 0 2px 6px rgba(45, 42, 39, 0.035);
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background-color 180ms ease;
        }

        .onboarding-field::placeholder {
          color: rgba(45, 42, 39, 0.38);
        }

        .onboarding-field:focus {
          border-color: rgba(181, 93, 59, 0.7);
          background: #ffffff;
          box-shadow:
            0 0 0 3px rgba(181, 93, 59, 0.09),
            0 4px 10px rgba(45, 42, 39, 0.05);
        }

        .detected-time-zone {
          width: 100%;
          min-height: 41px;
          border-radius: 14px;
          border: 1px solid rgba(182, 167, 153, 0.3);
          background: rgba(255, 255, 255, 0.82);
          padding: 9px 11px;
          color: #2d2a27;
          box-shadow: 0 2px 6px rgba(45, 42, 39, 0.03);
        }

        @media (prefers-reduced-motion: reduce) {
          .setup-card-grid > * {
            animation: none !important;
          }

          .setup-card,
          .setup-card-image,
          .porch-stitch,
          .onboarding-field {
            transition: none !important;
          }
        }
      `}</style>

      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] p-0 font-sans sm:p-3">
        <div className="relative h-screen w-full max-w-6xl overflow-y-auto border border-[#B6A799]/25 bg-white shadow-2xl sm:h-auto sm:rounded-[1.5rem] lg:h-[calc(100vh-2rem)] lg:max-h-[720px] lg:overflow-hidden">
          <div className="grid h-full min-h-screen grid-cols-1 sm:min-h-0 lg:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[240px] overflow-hidden border-b border-[#B6A799]/20 bg-[#F4F0EA] sm:min-h-[300px] lg:min-h-full lg:border-b-0 lg:border-r">
              <img
                src="/assets/branding/stitch-welcome.png"
                alt="Stitch waiting on the Porch & Paw porch"
                className={`porch-stitch absolute inset-0 h-full w-full object-cover object-[52%_48%] ${
                  porchLoaded ? "porch-stitch-loaded" : ""
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/92 via-[#FDFBF7]/5 to-transparent lg:from-[#F4F0EA]/55" />

              <div className="note-paper absolute bottom-7 left-5 right-5 z-20 rotate-[2deg] rounded-xl border border-white/70 bg-[#FFFDF8]/95 p-3.5 shadow-[0_5px_14px_rgba(45,42,39,0.07)] backdrop-blur-[2px] sm:bottom-8 sm:left-7 lg:bottom-7 lg:left-7 lg:w-[320px]">
                {step === 1 && (
                  <div className="space-y-1 text-xs font-medium leading-snug text-[#2D2A27]/85 sm:text-sm">
                    <p className="font-bold text-[#2D2A27]">Hi, friend.</p>

                    <p>I'm so glad you're here.</p>

                    <p>
                      I'll help you get everything ready before we head inside.
                    </p>

                    <p>There's no rush.</p>

                    <p>
                      We'll take it one step at a time, and if you need to come
                      back later, I'll be right here waiting.
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

                {step === 3 && (
                  <div className="space-y-1.5 text-xs font-medium leading-snug text-[#2D2A27]/85 sm:text-sm">
                    <p className="font-bold text-[#2D2A27]">
                      Every porch is a little different.
                    </p>

                    <p>Let's make this one feel like yours.</p>

                    <p className="text-[#B55D3B]">
                      Just the basics for now. You can change anything later.
                    </p>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-1.5 text-xs font-medium leading-snug text-[#2D2A27]/85 sm:text-sm">
                    <p className="font-bold text-[#2D2A27]">
                      Now it's my turn to meet your best friend.
                    </p>

                    <p>
                      Tell me a little about{" "}
                      {currentDog.name.trim() || "your dog"}.
                    </p>

                    <p className="text-[#B55D3B]">
                      We only need the basics today.
                    </p>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-1.5 text-xs font-medium leading-snug text-[#2D2A27]/85 sm:text-sm">
                    <p className="font-bold text-[#2D2A27]">
                      Welcome home, {displayName}.
                    </p>

                    <p>
                      Your porch is ready, and I'll be right here whenever you
                      need me.
                    </p>

                    <p className="text-[#B55D3B]">Let's head inside.</p>
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

                      <div className="max-w-md space-y-1 text-xs leading-relaxed text-[#2D2A27]/75 sm:text-sm">
                        <p>
                          <strong className="text-[#2D2A27]">
                            Hi, I'm Stitch.
                          </strong>
                        </p>

                        <p>
                          I'll help you get everything ready before we head
                          inside. We'll take it one easy step at a time.
                        </p>
                      </div>
                    </div>

                    <div className="sage-tray rounded-[28px] border border-[#CBD3C3] p-5 shadow-[0_14px_30px_rgba(45,42,39,0.09)] sm:p-6 lg:px-6">
                      <div className="flex items-center gap-2">
                        <Sprout
                          size={15}
                          strokeWidth={2}
                          className="text-[#7A7147]"
                        />

                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#66735A] sm:text-xs">
                          Before We Head Inside...
                        </p>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-[#68645F]">
                        Let's get a few things ready for you and your dogs.
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
                        Each dog will have their own health center, reminders,
                        records, and milestones.
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
                          aria-label="Remove one dog"
                          className="flex h-9 w-10 items-center justify-center rounded-xl border border-[#B6A799]/30 bg-white text-[#2D2A27] shadow-sm transition-all active:scale-95 disabled:opacity-30"
                        >
                          <Minus size={15} />
                        </button>

                        <div className="min-w-[65px]">
                          <div className="text-3xl font-black leading-none text-[#B55D3B] sm:text-4xl">
                            {dogCount}
                          </div>

                          <p className="mt-0.5 text-[10px] font-black text-[#2D2A27]/60">
                            {dogCount === 1 ? "dog" : "dogs"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={increaseDogCount}
                          aria-label="Add one dog"
                          className="flex h-9 w-10 items-center justify-center rounded-xl border border-[#B6A799]/30 bg-white text-[#2D2A27] shadow-sm transition-all active:scale-95"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section className="animate-in space-y-3 fade-in slide-in-from-bottom-2 duration-300">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F7250]">
                        About You
                      </p>

                      <h1 className="font-serif text-xl font-black leading-tight text-[#2D2A27] sm:text-2xl">
                        Let's get to know you.
                      </h1>

                      <p className="max-w-md text-xs leading-relaxed text-[#2D2A27]/70">
                        These details help personalize your porch, reminders,
                        and recommendations. You can always change them later.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                      <div className="rounded-[20px] border border-[#B6A799]/20 bg-white p-4 shadow-[0_8px_20px_rgba(45,42,39,0.06)]">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F0EA] text-[#B55D3B]">
                            <UserRound size={16} strokeWidth={1.8} />
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6F7250]">
                              You
                            </p>

                            <p className="text-xs text-[#2D2A27]/55">
                              What should we call you?
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <label className="block">
                            <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                              First Name
                              <span className="ml-1 text-[#B55D3B]">*</span>
                            </span>

                            <input
                              type="text"
                              value={firstName}
                              onChange={(event) =>
                                setFirstName(event.target.value)
                              }
                              placeholder="Carrie"
                              autoComplete="given-name"
                              className="onboarding-field"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                              Last Name
                            </span>

                            <input
                              type="text"
                              value={lastName}
                              onChange={(event) =>
                                setLastName(event.target.value)
                              }
                              placeholder="Your last name"
                              autoComplete="family-name"
                              className="onboarding-field"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                              Preferred Name
                              <span className="ml-1 normal-case tracking-normal text-[#2D2A27]/40">
                                optional
                              </span>
                            </span>

                            <input
                              type="text"
                              value={preferredName}
                              onChange={(event) =>
                                setPreferredName(event.target.value)
                              }
                              placeholder="What friends call you"
                              className="onboarding-field"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="rounded-[20px] border border-[#CBD3C3] bg-[#EEF1E9] p-4 shadow-[0_8px_20px_rgba(45,42,39,0.06)]">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#7A7147] shadow-sm">
                            <Home size={16} strokeWidth={1.8} />
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6F7250]">
                              Your Home
                            </p>

                            <p className="text-xs text-[#2D2A27]/55">
                              For local reminders and timing.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <div>
                            <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                              Time Zone
                            </span>

                            <div className="detected-time-zone flex items-center justify-between gap-3">
                              <div className="flex min-w-0 items-center gap-2">
                                <Clock3
                                  size={15}
                                  strokeWidth={1.8}
                                  className="flex-shrink-0 text-[#7A7147]"
                                />

                                <div className="min-w-0">
                                  <p className="truncate text-[13px] font-medium text-[#2D2A27]">
                                    {friendlyTimeZone}
                                  </p>

                                  <p className="truncate text-[9px] text-[#2D2A27]/45">
                                    Detected automatically
                                  </p>
                                </div>
                              </div>

                              <Check
                                size={15}
                                strokeWidth={2.2}
                                className="flex-shrink-0 text-[#6F7250]"
                              />
                            </div>
                          </div>

                          <label className="block">
                            <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                              Country
                            </span>

                            <select
                              value={country}
                              onChange={handleCountryChange}
                              className="onboarding-field"
                            >
                              <option value="United States">
                                United States
                              </option>

                              <option value="Canada">Canada</option>

                              <option value="United Kingdom">
                                United Kingdom
                              </option>

                              <option value="Australia">Australia</option>

                              <option value="Other">Other</option>
                            </select>
                          </label>

                          <label className="block">
                            <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                              State / Province
                            </span>

                            <input
                              type="text"
                              value={stateProvince}
                              onChange={(event) =>
                                setStateProvince(event.target.value)
                              }
                              placeholder={
                                country === "Canada"
                                  ? "Start typing your province"
                                  : country === "United States"
                                    ? "Start typing your state"
                                    : "Enter your state or province"
                              }
                              autoComplete="address-level1"
                              list="state-province-options"
                              className="onboarding-field"
                            />

                            <datalist id="state-province-options">
                              {locationSuggestions.map((location) => (
                                <option key={location} value={location} />
                              ))}
                            </datalist>
                          </label>
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-[10px] leading-relaxed text-[#2D2A27]/45">
                      We only use this information to personalize your
                      experience inside Porchside Pet Life.
                    </p>
                  </section>
                )}

                {step === 4 && (
                  <section className="animate-in space-y-3 fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F7250]">
                          Meet Your Dogs
                        </p>

                        <h1 className="font-serif text-xl font-black leading-tight text-[#2D2A27] sm:text-2xl">
                          Now it's my turn to meet your best friend.
                        </h1>

                        <p className="max-w-md text-xs leading-relaxed text-[#2D2A27]/70">
                          Tell us the basics today. You can add photos, records,
                          favorites, and more once you're inside.
                        </p>
                      </div>

                      {dogCount > 1 && (
                        <div className="flex-shrink-0 rounded-full border border-[#CBD3C3] bg-[#EEF1E9] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#6F7250]">
                          Dog {currentDogIndex + 1} of {dogCount}
                        </div>
                      )}
                    </div>

                    <div className="rounded-[22px] border border-[#B6A799]/20 bg-white p-4 shadow-[0_10px_24px_rgba(45,42,39,0.07)]">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F0EA] text-[#B55D3B]">
                          <Dog size={20} strokeWidth={1.8} />
                        </div>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6F7250]">
                            Their Place on the Porch
                          </p>

                          <p className="text-xs text-[#2D2A27]/55">
                            Start with what you know.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                            Dog's Name
                            <span className="ml-1 text-[#B55D3B]">*</span>
                          </span>

                          <input
                            type="text"
                            value={currentDog.name}
                            onChange={(event) =>
                              updateCurrentDog("name", event.target.value)
                            }
                            placeholder="Stitch"
                            autoComplete="off"
                            className="onboarding-field"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                            Breed
                            <span className="ml-1 normal-case tracking-normal text-[#2D2A27]/40">
                              optional
                            </span>
                          </span>

                          <input
                            type="text"
                            value={currentDog.breed}
                            onChange={(event) =>
                              updateCurrentDog("breed", event.target.value)
                            }
                            placeholder="French Bulldog"
                            autoComplete="off"
                            className="onboarding-field"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                            Sex
                          </span>

                          <select
                            value={currentDog.sex}
                            onChange={(event) =>
                              updateCurrentDog("sex", event.target.value)
                            }
                            className="onboarding-field"
                          >
                            <option value="">Choose one</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unknown">Not sure</option>
                          </select>
                        </label>

                        <label className="block">
                          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                            Life Stage
                          </span>

                          <select
                            value={currentDog.lifeStage}
                            onChange={(event) =>
                              updateCurrentDog("lifeStage", event.target.value)
                            }
                            className="onboarding-field"
                          >
                            <option value="">Choose one</option>
                            <option value="puppy">Puppy</option>
                            <option value="adult">Adult</option>
                            <option value="senior">Senior</option>
                            <option value="unknown">Not sure</option>
                          </select>
                        </label>

                        <label className="block">
                          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                            Birthday or Gotcha Day
                            <span className="ml-1 normal-case tracking-normal text-[#2D2A27]/40">
                              optional
                            </span>
                          </span>

                          <input
                            type="date"
                            value={currentDog.birthday}
                            onChange={(event) =>
                              updateCurrentDog("birthday", event.target.value)
                            }
                            className="onboarding-field"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-[#2D2A27]/65">
                            Current Weight
                            <span className="ml-1 normal-case tracking-normal text-[#2D2A27]/40">
                              optional
                            </span>
                          </span>

                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              value={currentDog.weight}
                              onChange={(event) =>
                                updateCurrentDog("weight", event.target.value)
                              }
                              placeholder="24"
                              inputMode="decimal"
                              className="onboarding-field pr-12"
                            />

                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#2D2A27]/40">
                              lbs
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <p className="text-center text-[10px] leading-relaxed text-[#2D2A27]/45">
                      Only their name is required. Everything else can be
                      completed later.
                    </p>
                  </section>
                )}

                {step === 5 && (
                  <section className="animate-in space-y-5 text-center fade-in slide-in-from-bottom-2 duration-500">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#CBD3C3] bg-[#EEF1E9] text-[#B55D3B] shadow-[0_10px_24px_rgba(45,42,39,0.08)]">
                      <Home size={30} strokeWidth={1.7} />
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F7250]">
                        Welcome Home
                      </p>

                      <h1 className="font-serif text-3xl font-black leading-tight text-[#2D2A27] sm:text-4xl">
                        Your porch is ready.
                      </h1>

                      <p className="mx-auto max-w-md text-sm leading-relaxed text-[#2D2A27]/70">
                        Welcome to Porchside Pet Life, {displayName}. Stitch is
                        ready to help you care for {dogNamesText}, keep the
                        important things organized, and make room for all the
                        memories still ahead.
                      </p>
                    </div>

                    <div className="mx-auto max-w-md rounded-[24px] border border-[#CBD3C3] bg-[#EEF1E9] p-5 text-left shadow-[0_12px_28px_rgba(45,42,39,0.07)]">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#6F7250]">
                        Once You're Inside
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-[#2D2A27]/70">
                        Add photos, complete the Health Center, set reminders,
                        build an emergency plan, and start capturing everyday
                        moments whenever you're ready.
                      </p>
                    </div>
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
                    onClick={step === 5 ? completeOnboarding : nextStep}
                    disabled={!isCurrentStepValid()}
                    className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-xl bg-[#B55D3B] px-4 py-2 text-xs font-black text-white shadow-md transition-all hover:bg-[#9C4E30] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 sm:px-6 sm:text-sm"
                  >
                    {getPrimaryButtonLabel()}

                    {step === 5 ? (
                      <Home size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}
                  </button>
                </div>

                <p className="text-center text-[10px] leading-normal text-[#2D2A27]/50">
                  Need a break? No worries. We'll save your progress as you go.
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