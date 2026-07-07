import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import { useAuth } from '../context/AuthContext';
import { useMigration } from '../hooks/useMigration';
import OnboardingWizard from '../components/OnboardingWizard';
import AuthModal from '../components/AuthModal';
import PlanModal from '../components/PlanModal';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { profiles, plan } = usePets();
  const { user, signOut } = useAuth();
  const { isMigrating } = useMigration();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [ownerAvatar, setOwnerAvatar] = useState('');

  // Dynamically watch for local owner image updates
  useEffect(() => {
    const savedPhoto = localStorage.getItem('dashboard_user_photo');
    if (savedPhoto) setOwnerAvatar(savedPhoto);

    const interval = setInterval(() => {
      const currentPhoto = localStorage.getItem('dashboard_user_photo');
      if (currentPhoto !== ownerAvatar) {
        setOwnerAvatar(currentPhoto || '');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ownerAvatar]);

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
    { name: 'Account Settings', path: '/account', icon: '⚙️' }, 
  ];

  // Interception Logic: Show onboarding wizard if no dogs exist
  if (profiles.length === 0) {
    return <OnboardingWizard />;
  }

  return (
    <div className="drawer lg:drawer-open">
      {isMigrating && (
        <div className="fixed inset-0 bg-[#F4F0EA]/80 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 mb-6">
            <span className="text-6xl animate-bounce inline-block">🚚</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#2D2A27] mb-4">Moving into your Cloud Home...</h2>
          <p className="text-[#B55D3B] max-w-md mx-auto">
            We're securely syncing your local dog records and memories to our secure cloud. 
            This will only take a moment.
          </p>
          <div className="mt-8">
            <span className="loading loading-spinner loading-lg text-[#B55D3B]"></span>
          </div>
        </div>
      )}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar bg-[#2D2A27] text-[#F4F0EA] lg:hidden shadow-sm border-b border-[#B6A799]/30">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-[#B6A799]/40 bg-[#F4F0EA] shadow-sm flex items-center justify-center">
              <img src="/logo.png" alt="Porchside Pet Life Logo" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <a className="block text-sm font-bold text-[#F4F0EA]">Porchside Pet Life</a>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#7A7A59]">by Porch & Paw</span>
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
        <div className="menu p-4 w-80 min-h-full bg-[#F4F0EA] text-[#2D2A27] border-r border-[#B6A799]/30 flex flex-col justify-between">
          <div>
            <div className="mb-10 px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full overflow-hidden border border-[#2D2A27]/20 bg-white shadow-sm flex items-center justify-center p-0">
                  <img src="/logo.png" alt="Porchside Pet Life Logo" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#2D2A27] leading-tight">Porchside Pet Life</h1>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A7A59] font-semibold">by Porch & Paw</p>
                </div>
              </div>
            </div>
            
            {/* Rendered Menu Items */}
            <ul className="space-y-1 overflow-y-auto max-h-[50vh]">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-[#B55D3B] text-[#F4F0EA] font-bold' 
                          : 'hover:bg-[#2D2A27]/5 text-[#2D2A27]'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="mt-auto pt-4 space-y-4">
            {/* Account Section */}
            <Link to="/account" className="block p-4 bg-[#2D2A27]/5 rounded-xl border border-[#B6A799]/20 hover:bg-[#2D2A27]/10 transition-all no-underline">
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar">
                  <div className="bg-[#B55D3B] text-[#F4F0EA] rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                    {ownerAvatar ? (
                      <img src={ownerAvatar} alt="Owner Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-sm">{user ? user.email?.charAt(0).toUpperCase() : '?'}</span>
                    )}
                  </div>
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-bold truncate text-[#2D2A27] m-0">
                    {user ? user.email : 'Guest Mode'}
                  </p>
                  <p className="text-[11px] text-[#7A7A59] font-medium m-0">
                    {user ? 'Cloud Synced' : 'Local Storage Only'}
                  </p>
                </div>
              </div>

              {user && (
                <button 
                  className="btn btn-xs btn-ghost btn-block text-[#2D2A27] hover:bg-[#2D2A27]/20 mt-1 font-bold"
                  onClick={(e) => {
                    e.preventDefault(); 
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              )}
            </Link>

            {/* Plan Section */}
            <div className="p-4 bg-[#B55D3B]/10 rounded-xl border border-[#B6A799]/20">
              <p className="text-sm font-semibold mb-1 text-[#2D2A27]">Plan: {plan}</p>
              <p className="text-xs mb-3 text-[#7A7A59] font-medium">
                {plan === 'Premium' 
                  ? 'Full access unlocked!' 
                  : plan === 'Memory' 
                    ? 'Memory Vault access active.' 
                    : 'Unlock unlimited profiles and memory vault.'}
              </p>
              <button 
                className="btn btn-sm btn-block rounded-lg bg-[#B55D3B] text-[#F4F0EA] border-[#B55D3B] hover:bg-[#B55D3B]/90"
                onClick={() => setIsPlanModalOpen(true)}
              >
                Manage Access
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      <PlanModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;