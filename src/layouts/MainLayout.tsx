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

  if (profiles.length === 0) {
    return <OnboardingWizard />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#F4F0EA' }}>
      {isMigrating && (
        <div className="fixed inset-0 bg-[#F4F0EA]/80 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 mb-6">
            <span className="text-6xl animate-bounce inline-block">🚚</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#2D2A27] mb-4">Moving into your Cloud Home...</h2>
          <p className="text-[#B55D3B] max-w-md mx-auto">
            We're securely syncing your local dog records and memories to our secure cloud. This will only take a moment.
          </p>
          <div className="mt-8">
            <span className="loading loading-spinner loading-lg text-[#B55D3B]"></span>
          </div>
        </div>
      )}

      {/* FIXED SIDEBAR LEFT MENU */}
      <aside style={{ width: '320px', minHeight: '100vh', backgroundColor: '#F4F0EA', borderRight: '1px solid rgba(182, 167, 153, 0.3)', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0 }}>
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
          
          <ul className="space-y-1 overflow-y-auto max-h-[50vh] list-none p-0">
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
                    style={{ textDecoration: 'none' }}
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
          <Link to="/account" className="block p-4 bg-[#2D2A27]/5 rounded-xl border border-[#B6A799]/20 hover:bg-[#2D2A27]/10 transition-all no-underline" style={{ textDecoration: 'none' }}>
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
                onClick={(e) => { e.preventDefault(); signOut(); }}
              >
                Sign Out
              </button>
            )}
          </Link>

          <div className="p-4 bg-[#B55D3B]/10 rounded-xl border border-[#B6A799]/20">
            <p className="text-sm font-semibold mb-1 text-[#2D2A27]">Plan: {plan}</p>
            <p className="text-xs mb-3 text-[#7A7A59] font-medium">
              {plan === 'Premium' ? 'Full access unlocked!' : plan === 'Memory' ? 'Memory Vault access active.' : 'Unlock unlimited profiles and memory vault.'}
            </p>
            <button 
              className="btn btn-sm btn-block rounded-lg bg-[#B55D3B] text-[#F4F0EA] border-[#B55D3B] hover:bg-[#B55D3B]/90"
              onClick={() => setIsPlanModalOpen(true)}
            >
              Manage Access
            </button>
          </div>
        </div>
      </aside>
      
      {/* MAIN VIEW AREA */}
      <main style={{ flexGrow: 1, backgroundColor: '#FDFBF7', padding: '1.5rem' }}>
        <Outlet />
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <PlanModal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} />
    </div>
  );
};

export default MainLayout;