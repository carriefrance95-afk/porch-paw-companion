import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import OnboardingWizard from '../components/OnboardingWizard';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { profiles, plan, setPlan } = usePets();

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
  ];

  // Interception Logic: Show onboarding wizard if no dogs exist
  if (profiles.length === 0) {
    return <OnboardingWizard />;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar bg-base-100 lg:hidden shadow-sm">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost text-xl font-bold text-primary">Porch & Paw</a>
          </div>
        </div>
        
        {/* Page Content */}
        <main className="flex-grow">
          <Outlet />
        </main>
      </div> 
      
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content border-r border-base-300">
          <div className="mb-10 px-4 py-2">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <span>🐾</span> Porch & Paw
            </h1>
            <p className="text-xs opacity-60">Companion App</p>
          </div>
          
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path 
                    ? 'bg-secondary text-secondary-content font-bold shadow-md scale-[1.02]' 
                    : 'hover:bg-base-200 text-neutral opacity-80 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto p-4 bg-base-200 rounded-xl mt-8">
            <p className="text-sm font-semibold mb-1">Plan: {plan}</p>
            <p className="text-xs mb-3">
              {plan === 'Premium' ? 'Full access unlocked!' : 'Unlock unlimited profiles and memory vault.'}
            </p>
            <button 
              className={`btn btn-sm btn-block ${plan === 'Premium' ? 'btn-outline' : 'btn-primary'}`}
              onClick={() => setPlan(plan === 'Premium' ? 'Free' : 'Premium')}
            >
              {plan === 'Premium' ? 'Downgrade (Debug)' : 'Upgrade to Premium'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
