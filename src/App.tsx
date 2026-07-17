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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7]">
      <WelcomeScreen onStart={() => {}} onSignIn={() => {}} />
    </div>
  );
};

const OnboardingGate: React.FC<{ session: any; children: React.ReactNode }> = ({ session, children }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    const checkOnboarding = async () => {
      const stored = localStorage.getItem(`onboarding_${session.user.id}`);
      setHasCompletedOnboarding(!!stored);
      setLoading(false);
    };

    checkOnboarding();
  }, [session?.user?.id]);

  if (loading) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">Loading...</div>;

  if (!hasCompletedOnboarding) {
    return <OnboardingWizard />;
  }

  return <>{children}</>;
};

const YourPorch: React.FC = () => {
  return <div className="p-6"><h1>Your Porch</h1></div>;
};

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [planManagementOpen, setPlanManagementOpen] = useState<boolean>(false);
  const [humanProfile, setHumanProfile] = useState<OwnerProfile>({
    name: 'Beta Tester',
    address: '',
    phone: '',
    emergencyContact: '',
    photo: ''
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }: any) => {
      setSession(currentSession);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event: any, currentSession: any) => {
      setSession(currentSession);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    if (!session?.user?.id) return;

    const storedProfile = localStorage.getItem(`owner_profile_${session.user.id}`);
    if (storedProfile) {
      try {
        setHumanProfile(JSON.parse(storedProfile));
      } catch {
        setHumanProfile({
          name: 'Beta Tester',
          address: '',
          phone: '',
          emergencyContact: '',
          photo: ''
        });
      }
    }
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-[#2D2A27]/60 font-medium text-sm">🐾 Connecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between relative">
      <div className="flex-grow flex flex-col">
        {!session ? (
          <PublicEntryFlow />
        ) : (
          <PetProvider>
            <OnboardingGate session={session}>
              <div className="w-full flex-grow flex flex-col">
                <nav className="bg-[#F4F0EA] border-b border-[#B6A799]/20 px-4 py-3 flex justify-between items-center relative z-40 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={logoImg} alt="Porch & Paw Logo" className="h-7 w-auto object-contain" />
                    <span className="text-[#2D2A27] font-serif font-bold text-sm hidden sm:inline">Porch & Paw Portal</span>
                  </div>

                  <div className="flex items-center gap-4" ref={dropdownRef}>
                    <span className="text-[#2D2A27]/70 text-xs font-medium hidden md:inline">
                      Logged in as: <strong className="text-[#2D2A27]">{session.user?.email}</strong>
                    </span>

                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      type="button"
                      className="h-9 w-9 rounded-full ring-2 ring-[#B55D3B] ring-offset-2 bg-[#B55D3B] text-white flex items-center justify-center font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-all overflow-hidden cursor-pointer"
                    >
                      {humanProfile.photo ? (
                        <img src={humanProfile.photo} alt="Owner Pic" className="w-full h-full object-cover" />
                      ) : (
                        <span>{humanProfile.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || '👤'}</span>
                      )}
                    </button>

                    {profileOpen && (
                      <div className="absolute right-4 top-14 w-80 md:w-96 bg-white border border-[#B6A799]/40 rounded-2xl shadow-xl p-5 text-left animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-4">
                        {/* ... [Profile Dropdown Content remains the same] */}
                      </div>
                    )}
                  </div>
                </nav>

                <div className="flex flex-1 items-stretch">
                  <Sidebar />

                  <div className="flex-1 overflow-y-auto">
                    <Routes>
                      {/* UPDATED: Root path now loads YourPorch */}
                      <Route path="/" element={<YourPorch />} />
                      <Route path="/profiles" element={<Profiles />} />
                      <Route path="/health" element={<HealthWellness />} />
                      <Route path="/reminders" element={<Reminders />} />
                      <Route path="/journal" element={<JournalMemories />} />
                      <Route path="/content" element={<Kitchen />} />
                      <Route path="/travel" element={<Travel />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/emergency" element={<Emergency />} />
                      <Route path="/directory" element={<Directory />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
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