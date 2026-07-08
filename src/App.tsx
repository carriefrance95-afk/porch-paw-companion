import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import logoImg from '../Porch & Paw Logo (6).png';
import { PetProvider } from './context/PetContext';
import Sidebar from './components/Sidebar.tsx';
import OnboardingWizard from './components/OnboardingWizard';

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

type PlanId = 'Free' | 'Wellness' | 'Memory' | 'Premium';

interface AuthMessage {
  type: 'success' | 'error';
  text: string;
}

interface OwnerProfile {
  name: string;
  address: string;
  phone: string;
  emergencyContact: string;
  photo: string;
}

const plans: Array<{
  id: PlanId;
  name: string;
  price: string;
  description: string;
  features: string[];
}> = [
  {
    id: 'Free',
    name: 'Free',
    price: '$0',
    description: 'A simple starting point for one dog.',
    features: ['1 dog profile', 'Basic journal', 'Basic reminders']
  },
  {
    id: 'Wellness',
    name: 'Wellness',
    price: '$4.99/mo',
    description: 'For health records, routines, and care tracking.',
    features: ['Health records', 'Vaccines & medications', 'Vet prep tools']
  },
  {
    id: 'Memory',
    name: 'Memory',
    price: '$4.99/mo',
    description: 'For photos, stories, milestones, and memory keeping.',
    features: ['Memory vault', 'Albums', 'Timeline journal']
  },
  {
    id: 'Premium',
    name: 'Premium',
    price: '$9.99/mo',
    description: 'The complete Porchside Pet Life experience.',
    features: ['Everything included', 'Travel tools', 'Kitchen + premium features']
  }
];

const OnboardingGate: React.FC<{ session: any; children: React.ReactNode }> = ({ session, children }) => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) {
      setOnboardingComplete(false);
      return;
    }

    const key = `onboarding_complete_${session.user.id}`;
    setOnboardingComplete(localStorage.getItem(key) === 'true');

    const handleOnboardingComplete = () => {
      setOnboardingComplete(localStorage.getItem(key) === 'true');
    };

    window.addEventListener('porchside:onboarding-complete', handleOnboardingComplete);

    return () => {
      window.removeEventListener('porchside:onboarding-complete', handleOnboardingComplete);
    };
  }, [session?.user?.id]);

  if (!onboardingComplete) {
    return <OnboardingWizard />;
  }

  return <>{children}</>;
};

const PublicEntryFlow: React.FC = () => {
  const [screen, setScreen] = useState<'welcome' | 'plan' | 'signup' | 'signin' | 'verify'>('welcome');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('Premium');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resetAuthFields = () => {
    setAuthMessage(null);
    setPassword('');
    setConfirmPassword('');
    setAgreedToTerms(false);
    setAgreedToPrivacy(false);
  };

  const handlePlanContinue = (plan: PlanId) => {
    setSelectedPlan(plan);
    localStorage.setItem('pending_selected_plan', plan);
    resetAuthFields();
    setScreen('signup');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);

    if (!firstName.trim() || !lastName.trim()) {
      setAuthMessage({ type: 'error', text: 'Please enter your first and last name.' });
      return;
    }

    if (!agreedToTerms || !agreedToPrivacy) {
      setAuthMessage({ type: 'error', text: 'You must accept the Terms of Use and Privacy Policy before creating an account.' });
      return;
    }

    if (password !== confirmPassword) {
      setAuthMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setSubmitting(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          full_name: `${firstName.trim()} ${lastName.trim()}`,
          selected_plan: selectedPlan,
          beta_status: 'Beta Tester',
          billing_status: 'Beta Access - Billing Disabled'
        }
      }
    });

    setSubmitting(false);

    if (error) {
      setAuthMessage({ type: 'error', text: error.message });
      return;
    }

    localStorage.setItem('pending_selected_plan', selectedPlan);
    localStorage.setItem('pending_beta_status', 'Beta Tester');
    localStorage.setItem('pending_billing_status', 'Beta Access - Billing Disabled');
    localStorage.setItem('pending_owner_profile', JSON.stringify({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      email
    }));

    if (data.session) {
      setAuthMessage({ type: 'success', text: 'Account created successfully. Continue setup to finish your profile.' });
    } else {
      setAuthMessage({ type: 'success', text: 'Account created. Please check your email for the verification link.' });
      setScreen('verify');
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);

    if (error) {
      setAuthMessage({ type: 'error', text: error.message });
    }
  };

  const cardClass = 'bg-white border border-[#B6A799]/30 rounded-[2rem] shadow-xl p-8 w-full max-w-4xl mx-auto';

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      {screen === 'welcome' && (
        <div className={cardClass}>
          <div className="text-center max-w-2xl mx-auto py-8">
            <div className="mx-auto mb-6 w-32 h-32 rounded-full bg-white border border-[#B6A799]/30 shadow-lg flex items-center justify-center overflow-hidden">
              <img src={logoImg} alt="Porch & Paw Logo" className="w-28 h-28 object-contain" />
            </div>

            <p className="text-xs uppercase tracking-[0.35em] text-[#7A7A59] font-bold mb-4">by Porch & Paw</p>
            <h1 className="text-5xl md:text-6xl font-serif font-black text-[#2D2A27] mb-5">Porchside Pet Life</h1>
            <p className="text-lg md:text-xl text-[#8C8275] leading-relaxed mb-8">
              The all-in-one guide for devoted dog parents. Cookbooks, health, travel, and journals.
            </p>

            <button
              onClick={() => setScreen('plan')}
              className="px-10 py-4 rounded-2xl bg-[#B55D3B] hover:bg-[#9C4E30] text-white font-black text-lg shadow-lg transition-all"
            >
              Start Your Journey
            </button>

            <div className="mt-8 pt-6 border-t border-[#B6A799]/20">
              <button
                onClick={() => {
                  resetAuthFields();
                  setScreen('signin');
                }}
                className="text-sm font-bold text-[#B55D3B] underline"
              >
                Already a member? Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === 'plan' && (
        <div className={cardClass}>
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A7A59] font-bold mb-2">Step 1</p>
            <h2 className="text-4xl font-serif font-black text-[#2D2A27]">Choose Your Plan</h2>
            <p className="text-[#8C8275] mt-2">Beta testers can explore plan value before public billing is turned on.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map(plan => (
              <button
                key={plan.id}
                onClick={() => handlePlanContinue(plan.id)}
                className={`text-left p-6 rounded-2xl border-2 transition-all hover:shadow-md ${
                  selectedPlan === plan.id ? 'border-[#B55D3B] bg-[#FDFBF7]' : 'border-[#B6A799]/25 bg-white'
                }`}
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-2xl font-serif font-black text-[#2D2A27]">{plan.name}</h3>
                    <p className="text-sm text-[#8C8275]">{plan.description}</p>
                  </div>
                  <span className="font-black text-[#B55D3B]">{plan.price}</span>
                </div>
                <ul className="space-y-1 text-sm text-[#2D2A27]/75">
                  {plan.features.map(feature => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => setScreen('welcome')} className="text-sm font-bold text-[#8C8275] underline">
              Back
            </button>
          </div>
        </div>
      )}

      {screen === 'signup' && (
        <div className="w-full max-w-md bg-white border border-[#B6A799]/30 rounded-2xl p-8 shadow-md my-8 mx-4">
          <div className="text-center mb-6 flex flex-col items-center">
            <img src={logoImg} alt="Porch & Paw Logo" className="h-24 w-24 object-contain mb-3" />
            <h1 className="text-3xl font-serif font-bold text-[#2D2A27] mb-1">Create Your Account</h1>
            <p className="text-xs uppercase tracking-wider text-[#7A7A59] font-bold">
              Selected Plan: {selectedPlan} Beta · Billing Disabled
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">First Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-white border border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                  placeholder="Carrie"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-white border border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                  placeholder="France"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 bg-white border border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 bg-white border border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Confirm Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-2 bg-white border border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-[#2D2A27]/80 leading-normal">
              <input
                type="checkbox"
                required
                className="mt-1 accent-[#B55D3B] h-4 w-4 rounded"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
              />
              <span>
                I agree to the{' '}
                <a href="https://legal.porch-and-paw.com/terms-page" target="_blank" rel="noreferrer" className="text-[#B55D3B] font-bold underline">
                  Terms of Use
                </a>.
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-[#2D2A27]/80 leading-normal">
              <input
                type="checkbox"
                required
                className="mt-1 accent-[#B55D3B] h-4 w-4 rounded"
                checked={agreedToPrivacy}
                onChange={e => setAgreedToPrivacy(e.target.checked)}
              />
              <span>
                I agree to the{' '}
                <a href="https://legal.porch-and-paw.com/privacy-page" target="_blank" rel="noreferrer" className="text-[#B55D3B] font-bold underline">
                  Privacy Policy
                </a>.
              </span>
            </label>

            {authMessage && (
              <p className={`text-xs font-semibold p-3 rounded-lg border ${
                authMessage.type === 'error' ? 'text-red-600 bg-red-50 border-red-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'
              }`}>
                {authMessage.type === 'error' ? '⚠️ ' : '✅ '} {authMessage.text}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !firstName.trim() || !lastName.trim() || !agreedToTerms || !agreedToPrivacy}
              className="w-full py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm bg-[#B55D3B] hover:bg-[#9C4E30] disabled:opacity-50"
            >
              {submitting ? 'Creating Account...' : 'Create Beta Account'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#B6A799]/20 text-center flex flex-col gap-3">
            <button onClick={() => setScreen('plan')} className="text-xs font-semibold text-[#7A7A59] underline">
              Back to Plans
            </button>
            <button
              onClick={() => {
                resetAuthFields();
                setScreen('signin');
              }}
              className="text-xs font-semibold text-[#B55D3B] underline"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      )}

      {screen === 'signin' && (
        <div className="w-full max-w-md bg-white border border-[#B6A799]/30 rounded-2xl p-8 shadow-md my-8 mx-4">
          <div className="text-center mb-6 flex flex-col items-center">
            <img src={logoImg} alt="Porch & Paw Logo" className="h-24 w-24 object-contain mb-3" />
            <h1 className="text-3xl font-serif font-bold text-[#2D2A27] mb-1">Welcome Back</h1>
            <p className="text-xs uppercase tracking-wider text-[#7A7A59] font-bold">Sign in to your account</p>
          </div>

          <form onSubmit={handleSignin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 bg-white border border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {authMessage && (
              <p className={`text-xs font-semibold p-3 rounded-lg border ${
                authMessage.type === 'error' ? 'text-red-600 bg-red-50 border-red-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'
              }`}>
                {authMessage.type === 'error' ? '⚠️ ' : '✅ '} {authMessage.text}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm bg-[#B55D3B] hover:bg-[#9C4E30] disabled:opacity-50"
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#B6A799]/20 text-center flex flex-col gap-3">
            <button onClick={() => setScreen('welcome')} className="text-xs font-semibold text-[#7A7A59] underline">
              Back to Welcome
            </button>
            <button onClick={() => setScreen('plan')} className="text-xs font-semibold text-[#B55D3B] underline">
              Need an account? Choose a plan
            </button>
          </div>
        </div>
      )}

      {screen === 'verify' && (
        <div className={cardClass}>
          <div className="text-center max-w-xl mx-auto py-8">
            <img src={logoImg} alt="Porch & Paw Logo" className="h-28 w-28 object-contain mx-auto mb-6" />
            <h2 className="text-4xl font-serif font-black text-[#2D2A27] mb-4">Check Your Email</h2>
            <p className="text-[#8C8275] leading-relaxed mb-8">
              We sent a verification link to <strong>{email}</strong>. After verifying your email, come back and sign in to finish setup.
            </p>
            <button
              onClick={() => {
                resetAuthFields();
                setScreen('signin');
              }}
              className="px-8 py-3 rounded-2xl bg-[#B55D3B] hover:bg-[#9C4E30] text-white font-black shadow-lg"
            >
              I Verified — Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
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
                    <div>
                      <h4 className="text-xs uppercase font-black tracking-widest text-[#7A7A59] mb-2">👤 Personal Information</h4>
                      <div className="bg-[#F4F0EA]/40 p-3 rounded-xl border border-[#B6A799]/10 text-xs space-y-1.5">
                        <p className="text-[#2D2A27]"><strong>Name:</strong> {humanProfile.name || 'Not completed'}</p>
                        <p className="text-[#2D2A27] truncate"><strong>Email:</strong> {session.user?.email}</p>
                        <p className="text-[#2D2A27]"><strong>Phone:</strong> {humanProfile.phone || 'Not provided'}</p>
                        <p className="text-[#2D2A27]"><strong>Address:</strong> {humanProfile.address || 'Not provided'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-black tracking-widest text-[#7A7A59] mb-2">💳 Membership & Subscription</h4>
                      <div className="bg-[#F4F0EA]/60 p-3 rounded-xl border border-[#B6A799]/20 text-xs flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-[#2D2A27]">Current Plan:</span>
                          <span className="badge bg-[#B55D3B] text-white font-bold rounded-md px-2 py-0.5 text-[10px]">
                            {localStorage.getItem(`selected_plan_${session.user.id}`) || 'Premium'}
                          </span>
                        </div>
                        <p className="text-[#2D2A27]/60 text-[10px]">Beta access is currently unlocked for testing.</p>
                      </div>
                    </div>

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
              <OnboardingGate session={session}>
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
              </OnboardingGate>
            </PetProvider>
          </div>
        )}
      </div>

      {planManagementOpen && session?.user?.id && (
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

            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#7A7A59] uppercase tracking-wider">Available Plan Tiers</p>

              {plans.map(plan => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => {
                    localStorage.setItem(`selected_plan_${session.user.id}`, plan.id);
                    setPlanManagementOpen(false);
                  }}
                  className="w-full text-left p-4 border border-[#B6A799]/30 hover:border-[#B55D3B] bg-white rounded-xl flex justify-between items-center transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-sm text-[#2D2A27] block">{plan.name}</span>
                    <span className="text-xs text-[#7A7A59]/60">{plan.description}</span>
                  </div>
                  <span className="text-sm font-bold text-[#B55D3B]">{plan.price}</span>
                </button>
              ))}
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
  );
};

export default App;
