import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import logoImg from '../Porch & Paw Logo (6).png';
import { PetProvider } from './context/PetContext';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar.tsx';

// Import all exact pages from your project's file structure
import Dashboard from './pages/Dashboard';
import Profiles from './pages/Profiles';
import HealthWellness from './pages/HealthWellness';
import Reminders from './pages/Reminders';
import JournalMemories from './pages/JournalMemories';
import Kitchen from './pages/Kitchen';
import Travel from './pages/Travel';
import Store from './pages/Store';
import Emergency from './pages/Emergency';
import Directory from './pages/Directory';

interface AuthMessage {
  type: 'success' | 'error';
  text: string;
}

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  // States for Profile Dropdown & Modal Panel views
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [planManagementOpen, setPlanManagementOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Human Profile State placeholders (populated via onboarding fields)
  const [humanProfile, setHumanProfile] = useState({
    name: 'Beta Tester',
    address: '123 Porchside Lane',
    phone: '(555) 123-4567',
    photo: '' // Base64 string or image URL from onboarding upload field
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }: any) => {
      setSession(currentSession);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event: any, currentSession: any) => {
      setSession(currentSession);
    });

    // Close profile dropdown when clicking outside of it
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

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);

    if (isSignUp && !agreedToTerms) {
      setAuthMessage({ type: 'error', text: 'You must agree to the Terms of Use and Privacy Policy to register.' });
      return;
    }

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setAuthMessage({ type: 'error', text: error.message });
      } else if (data.user && data.session === null) {
        setAuthMessage({ 
          type: 'success', 
          text: 'Account created! Please check your email inbox for a verification link.' 
        });
        setIsSignUp(false);
      } else {
        setAuthMessage({ type: 'success', text: 'Account created successfully!' });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthMessage({ type: 'error', text: error.message });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-[#2D2A27]/60 font-medium text-sm">🐾 Connecting...</div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between relative">
        <div className="flex-grow flex flex-col">
          {!session ? (
            <div className="flex-grow flex items-center justify-center">
              <div className="w-full max-w-md bg-white border border-[#B6A799]/30 rounded-2xl p-8 shadow-md my-8 mx-4">
                <div className="text-center mb-6 flex flex-col items-center">
                  <img src={logoImg} alt="Porch & Paw Logo" className="h-20 w-auto object-contain mb-3" />
                  <h1 className="text-3xl font-serif font-bold text-[#2D2A27] mb-1">Porch & Paw</h1>
                  <p className="text-xs uppercase tracking-wider text-[#7A7A59] font-bold">
                    {isSignUp ? 'Beta Registration' : 'Beta Tester Portal'}
                  </p>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 bg-white border border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                      placeholder="tester@porchandpaw.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Password</label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-2 bg-white border border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {isSignUp && (
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        id="legal-checkbox"
                        type="checkbox"
                        required
                        className="mt-1 accent-[#B55D3B] h-4 w-4 rounded"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                      />
                      <label htmlFor="legal-checkbox" className="text-xs text-[#2D2A27]/80 leading-normal">
                        I explicitly agree to the{' '}
                        <a href="https://legal.porch-and-paw.com/terms-page" target="_blank" rel="noreferrer" className="text-[#B55D3B] font-bold underline hover:text-[#9C4E6A]">
                          Terms of Use
                        </a>{' '}
                        and{' '}
                        <a href="https://legal.porch-and-paw.com/privacy-page" target="_blank" rel="noreferrer" className="text-[#B55D3B] font-bold underline hover:text-[#9C4E6A]">
                          Privacy Policy
                        </a>.
                      </label>
                    </div>
                  )}

                  {authMessage && (
                    <p className={`text-xs font-semibold p-3 rounded-lg border ${
                      authMessage.type === 'error' 
                        ? 'text-red-600 bg-red-50 border-red-100' 
                        : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                    }`}>
                      {authMessage.type === 'error' ? '⚠️ ' : '✅ '} {authMessage.text}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSignUp && !agreedToTerms}
                    className="w-full py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm bg-[#B55D3B] hover:bg-[#9C3030]"
                  >
                    {isSignUp ? 'Register Account' : 'Sign In'}
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-[#B6A799]/20 text-center">
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setAuthMessage(null);
                    }}
                    className="text-xs font-semibold text-[#7A7A59] hover:text-[#B55D3B] transition-colors underline"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account yet? Create one"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex-grow flex flex-col">
              {/* GLOBAL TOP NAVIGATION BAR BAR (STAYS CLEAN ON MOBILE) */}
              <nav className="bg-[#F4F0EA] border-b border-[#B6A799]/20 px-4 py-3 flex justify-between items-center relative z-40 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={logoImg} alt="Porch & Paw Logo" className="h-7 w-auto object-contain" />
                  <span className="text-[#2D2A27] font-serif font-bold text-sm hidden sm:inline">Porch & Paw Portal</span>
                </div>
                
                {/* Upper Right-Hand Profile Node Section */}
                <div className="flex items-center gap-4" ref={dropdownRef}>
                  <span className="text-[#2D2A27]/70 text-xs font-medium hidden md:inline">
                    Logged in as: <strong className="text-[#2D2A27]">{session.user?.email}</strong>
                  </span>
                  
                  {/* Human User Avatar Toggle Trigger Button */}
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    type="button"
                    className="h-9 w-9 rounded-full ring-2 ring-[#B55D3B] ring-offset-2 bg-[#B55D3B] text-white flex items-center justify-center font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-all overflow-hidden cursor-pointer"
                  >
                    {humanProfile.photo ? (
                      <img src={humanProfile.photo} alt="Owner Pic" className="w-full h-full object-cover" />
                    ) : (
                      <span>{session.user?.email?.charAt(0).toUpperCase() || '👤'}</span>
                    )}
                  </button>

                  {/* TRANSPARENT ACCOUNT DROPDOWN HUB (TOUCH FRIENDLY OVERLAY) */}
                  {profileOpen && (
                    <div className="absolute right-4 top-14 w-80 md:w-96 bg-white border border-[#B6A799]/40 rounded-2xl shadow-xl p-5 text-left animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-4">
                      {/* Section 1: Human Personal Data */}
                      <div>
                        <h4 className="text-xs uppercase font-black tracking-widest text-[#7A7A59] mb-2">👤 Personal Information</h4>
                        <div className="bg-[#F4F0EA]/40 p-3 rounded-xl border border-[#B6A799]/10 text-xs space-y-1.5">
                          <p className="text-[#2D2A27]"><strong>Name:</strong> {humanProfile.name}</p>
                          <p className="text-[#2D2A27] truncate"><strong>Email:</strong> {session.user?.email}</p>
                          <p className="text-[#2D2A27]"><strong>Phone:</strong> {humanProfile.phone}</p>
                          <p className="text-[#2D2A27]"><strong>Address:</strong> {humanProfile.address}</p>
                        </div>
                      </div>

                      {/* Section 2: Account Tier & Billing Transparency */}
                      <div>
                        <h4 className="text-xs uppercase font-black tracking-widest text-[#7A7A59] mb-2">💳 Membership & Subscription</h4>
                        <div className="bg-[#F4F0EA]/60 p-3 rounded-xl border border-[#B6A799]/20 text-xs flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[#2D2A27]">Current Plan:</span>
                            <span className="badge bg-[#B55D3B] text-white font-bold rounded-md px-2 py-0.5 text-[10px]">PREMIUM PLAN</span>
                          </div>
                          <p className="text-[#2D2A27] mt-1"><strong>Rate:</strong> $9.99 / month</p>
                          <p className="text-[#2D2A27]/60 text-[10px]">Next renewal auto-draft runs automatically via secure vault.</p>
                        </div>
                      </div>

                      {/* Section 3: Clean Navigation Controls */}
                      <div className="flex gap-2 pt-1 border-t border-[#B6A799]/20">
                        <button 
                          type="button" 
                          onClick={() => {
                            setProfileOpen(false);
                            setPlanManagementOpen(true);
                          }}
                          className="flex-1 py-2 bg-[#F4F0EA] hover:bg-[#EAE4DA] text-[#2D2A27] font-bold text-xs rounded-xl transition-all border-0 cursor-pointer text-center"
                        >
                          Change Plan
                        </button>
                        <button 
                          type="button" 
                          onClick={async () => {
                            setProfileOpen(false);
                            await supabase.auth.signOut();
                          }}
                          className="flex-1 py-2 bg-[#2D2A27] hover:bg-black text-white font-bold text-xs rounded-xl transition-all border-0 cursor-pointer text-center"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              <PetProvider>
                <div className="flex flex-1 items-stretch">
                  <Sidebar />
                  
                  <div className="flex-1 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
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
              </PetProvider>
            </div>
          )}
        </div>

        {/* 📱 TOUCH-FRIENDLY BOTTOM MANAGEMENT DRAWER / DIALOG SHEET */}
        {planManagementOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="w-full sm:max-w-md bg-white rounded-t-[2rem] sm:rounded-2xl p-6 shadow-2xl text-left flex flex-col gap-5 animate-in slide-in-from-bottom-8 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-2 border-b border-[#B6A799]/20">
                <h3 className="text-lg font-serif font-bold text-[#2D2A27]">Membership Dashboard</h3>
                <button 
                  onClick={() => setPlanManagementOpen(false)}
                  className="bg-transparent border-0 font-bold text-sm text-[#7A7A59] hover:text-[#2D2A27] cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Plan Tiers Layout Selection */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#7A7A59] uppercase tracking-wider">Available Plan Tiers</p>
                
                {/* Active Premium Plan Card */}
                <div className="p-4 border-2 border-[#B55D3B] bg-[#FDFBF7] rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold text-sm text-[#2D2A27] block">Premium Ecosystem Plan</span>
                    <span className="text-xs text-[#7A7A59]">Complete safety & health features</span>
                  </div>
                  <span className="text-sm font-black text-[#B55D3B]">$9.99/mo</span>
                </div>

                {/* Free Tier Card */}
                <button 
                  type="button"
                  onClick={() => alert("Downgrading logic triggers here")}
                  className="w-full text-left p-4 border border-[#B6A799]/30 hover:border-[#B6A799] bg-white rounded-xl flex justify-between items-center transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-sm text-[#2D2A27] block">Basic Companion Plan</span>
                    <span className="text-xs text-[#7A7A59]/60">Standard metrics tracking</span>
                  </div>
                  <span className="text-sm font-bold text-[#2D2A27]/60">Free</span>
                </button>
              </div>

              {/* Direct, Unhidden Cancellation Sub-tier - Safely Protected inside settings */}
              <div className="pt-4 border-t border-[#B6A799]/20 mt-2">
                <p className="text-[11px] text-[#7A7A59] mb-3 leading-relaxed font-medium">
                  Need to step away? Canceling your active subscription stops recurring drafts instantly. Your saved dog logs and journal timelines remain secure in read-only access.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to cancel your $9.99 subscription? Your core records remain safe, but advanced platform features will freeze at the end of the current cycle.")) {
                      alert("Subscription cancelled successfully.");
                      setPlanManagementOpen(false);
                    }
                  }}
                  className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition-all border border-red-200/60 cursor-pointer text-center"
                >
                  👋 Cancel Subscription Membership
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="w-full bg-[#2D2A27] text-[#F4F0EA]/80 border-t-4 border-[#B55D3B] py-6 px-6 text-center text-xs z-20">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-[#F4F0EA]/60 text-[11px]">&copy; 2026 Porch & Paw. All Rights Reserved. Confidential Beta Platform.</div>
            <div>
              <a href="https://legal.porch-and-paw.com/legal-page" target="_blank" rel="noreferrer" className="font-bold text-[#B55D3B] hover:text-[#9C4E30] underline tracking-wide text-[11px]">🌿 Go to Porch & Paw Legal Center</a>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;