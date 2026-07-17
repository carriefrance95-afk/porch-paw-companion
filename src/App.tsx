import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import logoImg from '../Porch & Paw Logo (6).png';
import { PetProvider } from './context/PetContext';
import Sidebar from './components/Sidebar.tsx';
import OnboardingWizard from './components/OnboardingWizard';
import WelcomeScreen from './components/arrival/WelcomeScreen';
import PlanSelection from './components/arrival/PlanSelection';

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

interface AuthMessage {
  type: 'success' | 'error';
  message: string;
}

const PublicEntryFlow: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7]">
      <WelcomeScreen onStart={() => {}} onSignIn={() => {}} />
    </div>
  );
};

interface OnboardingGateProps {
  session: any;
  children: React.ReactNode;
}

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

const YourPorch: React.FC = () => {
  return (
    <div className="p-6">
      <h1>Your Porch</h1>
    </div>
  );
};

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [planManagementOpen, setPlanManagementOpen] =
    useState<boolean>(false);

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
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }

      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }

    const storedProfile = localStorage.getItem(
      `owner_profile_${session.user.id}`,
    );

    if (storedProfile) {
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
    <div className="relative flex min-h-screen flex-col justify-between bg-[#FDFBF7]">
      <div className="flex flex-grow flex-col">
        {!session ? (
          <PublicEntryFlow />
        ) : (
          <PetProvider>
            <OnboardingGate session={session}>
              <div className="flex w-full flex-grow flex-col">
                <nav className="relative z-40 flex items-center justify-between border-b border-[#B6A799]/20 bg-[#F4F0EA] px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoImg}
                      alt="Porch & Paw Logo"
                      className="h-7 w-auto object-contain"
                    />

                    <span className="hidden font-serif text-sm font-bold text-[#2D2A27] sm:inline">
                      Porch & Paw Portal
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-4"
                    ref={dropdownRef}
                  >
                    <span className="hidden text-xs font-medium text-[#2D2A27]/70 md:inline">
                      Logged in as:{' '}
                      <strong className="text-[#2D2A27]">
                        {session.user?.email}
                      </strong>
                    </span>

                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      type="button"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#B55D3B] text-sm font-bold text-white shadow-sm ring-2 ring-[#B55D3B] ring-offset-2 transition-all hover:scale-105 active:scale-95"
                      aria-label="Open profile menu"
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
                            session.user?.email
                              ?.charAt(0)
                              .toUpperCase() ||
                            '👤'}
                        </span>
                      )}
                    </button>

                    {profileOpen && (
                      <div className="absolute right-4 top-14 flex w-80 flex-col gap-4 rounded-2xl border border-[#B6A799]/40 bg-white p-5 text-left shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 md:w-96">
                        {/* ... [Profile Dropdown Content remains the same] */}
                      </div>
                    )}
                  </div>
                </nav>

                <div className="flex flex-1 items-stretch">
                  <Sidebar />

                  <div className="flex-1 overflow-y-auto">
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
                  </div>
                </div>
              </div>
            </OnboardingGate>
          </PetProvider>
        )}
      </div>

      {/* ... [Rest of the file remains identical] */}
    </div>
  );
};

export default App;