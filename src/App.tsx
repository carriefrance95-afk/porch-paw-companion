import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import logoImg from '../Porch & Paw Logo (6).png';

import { PetProvider } from './context/PetContext';
import PorchSidebar from './pages/YourPorch/components/PorchSidebar';
import OnboardingWizard from './components/OnboardingWizard';
import WelcomeScreen from './components/arrival/WelcomeScreen';

import YourPorch from './pages/YourPorch';
import Profiles from './pages/Profiles';
import HealthWellness from './pages/HealthWellness';
import Reminders from './pages/Reminders';
import JournalMemories from './pages/JournalMemories';
import Kitchen from './pages/Kitchen';
import Travel from './pages/Travel';
import Store from './pages/Store';
import Emergency from './pages/Emergency';
import Directory from './pages/Directory';

interface OwnerProfile {
  name: string;
  address: string;
  phone: string;
  emergencyContact: string;
  photo: string;
}

interface OnboardingGateProps {
  session: any;
  children: React.ReactNode;
}

const PublicEntryFlow: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7]">
      <WelcomeScreen onStart={() => {}} onSignIn={() => {}} />
    </div>
  );
};

const OnboardingGate: React.FC<OnboardingGateProps> = ({
  session,
  children,
}) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userId = session?.user?.id;

    if (!userId) {
      setHasCompletedOnboarding(false);
      setLoading(false);
      return;
    }

    const completionKey = `onboarding_complete_${userId}`;
    const legacyKey = `onboarding_${userId}`;

    const checkOnboardingStatus = () => {
      const completed =
        localStorage.getItem(completionKey) === 'true' ||
        Boolean(localStorage.getItem(legacyKey));

      setHasCompletedOnboarding(completed);
      setLoading(false);
    };

    checkOnboardingStatus();

    window.addEventListener(
      'porchside:onboarding-complete',
      checkOnboardingStatus,
    );

    return () => {
      window.removeEventListener(
        'porchside:onboarding-complete',
        checkOnboardingStatus,
      );
    };
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <div className="text-sm font-medium text-[#2D2A27]/60">
          Loading your porch...
        </div>
      </div>
    );
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingWizard />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const [humanProfile, setHumanProfile] = useState<OwnerProfile>({
    name: 'Beta Tester',
    address: '',
    phone: '',
    emergencyContact: '',
    photo: '',
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: currentSession } }: any) => {
        setSession(currentSession);
        setLoading(false);
      });

    const { data } = supabase.auth.onAuthStateChange(
      (_event: any, currentSession: any) => {
        setSession(currentSession);
        setLoading(false);
      },
    );

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      data?.subscription?.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userId = session?.user?.id;

    if (!userId) {
      return;
    }

    const storedProfile = localStorage.getItem(`owner_profile_${userId}`);

    if (!storedProfile) {
      return;
    }

    try {
      setHumanProfile(JSON.parse(storedProfile));
    } catch {
      setHumanProfile({
        name: 'Beta Tester',
        address: '',
        phone: '',
        emergencyContact: '',
        photo: '',
      });
    }
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <div className="text-sm font-medium text-[#2D2A27]/60">
          🐾 Connecting...
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#FDFBF7]">
      {!session ? (
        <PublicEntryFlow />
      ) : (
        <PetProvider>
          <OnboardingGate session={session}>
            <div className="flex min-h-screen w-full flex-col">
              <nav className="relative z-40 flex min-h-[76px] items-center justify-between border-b border-[#B6A799]/20 bg-[#F4F0EA] px-6 py-4 shadow-sm lg:px-8">
                <div className="flex items-center gap-4">
                  <img
                    src={logoImg}
                    alt="Porch & Paw Logo"
                    className="h-10 w-auto object-contain"
                  />

                  <span className="hidden font-serif text-xl font-semibold text-[#2D2A27] sm:inline">
                    Porchside Pet Life
                  </span>
                </div>

                <div
                  ref={dropdownRef}
                  className="relative flex items-center gap-5"
                >
                  <span className="hidden text-sm font-medium text-[#2D2A27]/70 md:inline">
                    Logged in as:{' '}
                    <strong className="text-[#2D2A27]">
                      {session.user?.email}
                    </strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => setProfileOpen((current) => !current)}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#BF6A43] text-base font-bold text-white shadow-sm ring-2 ring-[#BF6A43] ring-offset-2 transition-transform hover:scale-105 active:scale-95"
                    aria-label="Open profile menu"
                    aria-expanded={profileOpen}
                  >
                    {humanProfile.photo ? (
                      <img
                        src={humanProfile.photo}
                        alt="Owner profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {humanProfile.name?.charAt(0).toUpperCase() ||
                          session.user?.email?.charAt(0).toUpperCase() ||
                          '👤'}
                      </span>
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-[#E8E1D8] bg-white p-5 text-left shadow-xl">
                      <p className="font-serif text-xl font-semibold text-[#2D2A27]">
                        {humanProfile.name || 'Your Profile'}
                      </p>

                      <p className="mt-1 break-all text-xs text-[#2D2A27]/60">
                        {session.user?.email}
                      </p>

                      <button
                        type="button"
                        onClick={async () => {
                          setProfileOpen(false);
                          await supabase.auth.signOut();
                        }}
                        className="mt-5 w-full rounded-full border border-[#BF6A43] px-4 py-2 text-sm font-semibold text-[#BF6A43] transition hover:bg-[#BF6A43] hover:text-white"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </nav>

              <div className="flex min-h-0 flex-1 items-stretch">
                <PorchSidebar />

                <main className="min-w-0 flex-1 overflow-y-auto bg-[#FDFBF7]">
                  <Routes>
                    <Route path="/" element={<YourPorch />} />
                    <Route path="/profiles" element={<Profiles />} />
                    <Route path="/health" element={<HealthWellness />} />
                    <Route path="/reminders" element={<Reminders />} />
                    <Route
                      path="/journal"
                      element={<JournalMemories />}
                    />
                    <Route path="/content" element={<Kitchen />} />
                    <Route path="/travel" element={<Travel />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/emergency" element={<Emergency />} />
                    <Route path="/directory" element={<Directory />} />
                    <Route
                      path="*"
                      element={<Navigate to="/" replace />}
                    />
                  </Routes>
                </main>
              </div>
            </div>
          </OnboardingGate>
        </PetProvider>
      )}
    </div>
  );
};

export default App;