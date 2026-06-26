import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import { useAuth } from '../context/AuthContext';
import { useMigration } from '../hooks/useMigration';
import OnboardingWizard from '../components/OnboardingWizard';
import AuthModal from '../components/AuthModal';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { profiles, plan, setPlan } = usePets();
  const { user, signOut } = useAuth();
  const { isMigrating } = useMigration();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Dog Profiles', path: '/profiles', icon: '🐕' },
    { name: 'Health & Wellness', path: '/health', icon: '🏥' },
    { name: 'Vet Prep', path: '/vet-visit-prep', icon: '📋' },
    { name: 'Reminders', path: '/reminders', icon: '⏰' },
    { name: 'Emergency', path: '/emergency', icon: '🆘' },
    { name: 'Care Directory', path: '/directory', icon: '📚' },
    { name: 'Journal & Memories', path: '/journal', icon: '📖' },
    { name: 'Travel & Adventure', path: '/travel', icon: '⛺' },
    { name: 'From The Porch & Paw Kitchen', path: '/content', icon: '🍳' },
    { name: 'Store', path: '/store', icon: '🛒' },
    { name: 'Partner Perks', path: '/partners', icon: '🎁' },
  ];

  // Interception Logic: Show onboarding wizard if no dogs exist
  if (profiles.length === 0) {
    return <OnboardingWizard />;
  }

  return (
    <div className="drawer lg:drawer-open">
      {isMigrating && (
        <div className="fixed inset-0 bg-brandCream/80 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 mb-6">
            <span className="text-6xl animate-bounce inline-block">🚚</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-brandCharcoal mb-4">Moving into your Cloud Home...</h2>
          <p className="text-brandTerracotta max-w-md mx-auto">
            We're securely syncing your local dog records and memories to our secure cloud. 
            This will only take a moment.
          </p>
          <div className="mt-8">
            <span className="loading loading-spinner loading-lg text-brandTerracotta"></span>
          </div>
        </div>
      )}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar bg-brandCream lg:hidden shadow-sm">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-brandTaupe/30 bg-white shadow-sm flex items-center justify-center">
              <img src="/logo.png" alt="Porchside Pet Life Logo" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <a className="block text-sm font-bold text-brandTerracotta">Porchside Pet Life</a>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-brandSage">by Porch & Paw</span>
            </div>
          </div>
        </div>
        
        {/* Page Content */}
        <main className="flex-grow">
          <Outlet />
        </main>
      </div> 
      
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <div className="menu p-4 w-80 min-h-full bg-brandCream text-brandCharcoal border-r border-brandTaupe/40">
          <div className="mb-10 px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden border border-brandTaupe/30 bg-white shadow-sm flex items-center justify-center">
                <img src="/logo.png" alt="Porchside Pet Life Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-brandTerracotta leading-tight">Porchside Pet Life</h1>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brandSage">by Porch & Paw</p>
              </div>
            </div>
          </div>
          
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path 
                      ? 'bg-brandTaupe text-brandCharcoal font-bold shadow-md scale-[1.02]' 
                      : 'hover:bg-brandTaupe/20 text-brandCharcoal opacity-80 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 space-y-4">
            {/* Account Section */}
            <div className="p-4 bg-brandTaupe/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar placeholder">
                  <div className="bg-brandTerracotta text-white rounded-full w-8">
                    <span>{user ? user.email?.charAt(0).toUpperCase() : '?'}</span>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate">
                    {user ? user.email : 'Guest Mode'}
                  </p>
                  <p className="text-xs opacity-60">
                    {user ? 'Cloud Synced' : 'Local Storage Only'}
                  </p>
                </div>
              </div>
              
              {user ? (
                <button 
                  className="btn btn-xs btn-ghost btn-block text-error"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              ) : (
                <button 
                  className="btn btn-sm btn-primary btn-block rounded-lg"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In / Register
                </button>
              )}
            </div>

            {/* Plan Section */}
            <div className="p-4 bg-brandTerracotta/10 rounded-xl border border-brandTerracotta/20">
              <p className="text-sm font-semibold mb-1">Plan: {plan}</p>
              <p className="text-xs mb-3">
                {plan === 'Premium' ? 'Full access unlocked!' : 'Unlock unlimited profiles and memory vault.'}
              </p>
              <button 
                className={`btn btn-sm btn-block ${plan === 'Premium' ? 'btn-outline' : 'bg-brandTerracotta text-white border-brandTerracotta hover:bg-brandTerracotta/90'}`}
                onClick={() => setPlan(plan === 'Premium' ? 'Free' : 'Premium')}
              >
                {plan === 'Premium' ? 'Downgrade (Debug)' : 'Upgrade to Premium'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default MainLayout;
