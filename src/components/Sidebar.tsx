import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LegalModal from './LegalModal.tsx';
import { 
  LayoutDashboard, Users, Heart, Bell, BookOpen, 
  ChefHat, Briefcase, ShoppingBag, ShieldAlert, 
  ChevronDown, ChevronUp, Scale, FileText
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [legalOpen, setLegalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState<{ url: string; title: string } | null>(null);

  // Exact paths matched perfectly to your Dashboard.tsx routing requirements
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={18} className="text-[#B55D3B]" /> },
    { path: '/profiles', name: 'Dog Profiles', icon: <Users size={18} className="text-[#4A7A96]" /> },
    { path: '/health', name: 'Health Center', icon: <Heart size={18} className="text-[#9C4E6A]" /> },
    { path: '/reminders', name: 'Reminders', icon: <Bell size={18} className="text-[#D19A66]" /> },
    { path: '/journal', name: 'Pet Journal', icon: <BookOpen size={18} className="text-[#608B66]" /> },
    { path: '/content', name: 'Paw Kitchen', icon: <ChefHat size={18} className="text-[#7A7A59]" /> },
    { path: '/travel', name: 'Travel Kit', icon: <Briefcase size={18} className="text-[#8C6D53]" /> },
    { path: '/store', name: 'Boutique Shop', icon: <ShoppingBag size={18} className="text-[#A260B5]" /> },
    { path: '/emergency', name: 'Emergency Hub', icon: <ShieldAlert size={18} className="text-[#D94E4E]" />, highlight: true },
  ];

  const legalLinks = [
    { name: '🌿 Legal Center Home', url: 'https://legal.porch-and-paw.com/legal-page' },
    { name: '📄 Terms of Use', url: 'https://legal.porch-and-paw.com/terms-page' },
    { name: '🔒 Privacy Policy', url: 'https://legal.porch-and-paw.com/privacy-page' },
    { name: '⚖️ Legal Disclaimer', url: 'https://legal.porch-and-paw.com/legal_disclaimer-page' },
    { name: '💳 Subscription & Cancellation Policy', url: 'https://legal.porch-and-paw.com/subscription-page' },
    { name: '🐾 Community Guidelines', url: 'https://legal.porch-and-paw.com/community-guidelines-page' },
    { name: '©️ Copyright & Intellectual Property Policy', url: 'https://legal.porch-and-paw.com/copyright-page' },
    { name: '🗑️ Account Deletion & Data Retention Policy', url: 'https://legal.porch-and-paw.com/deletion-retention-page' },
    { name: '🤝 Affiliate Disclosure', url: 'https://legal.porch-and-paw.com/affiliate-disclosure-page' },
    { name: '🍪 Cookie Policy', url: 'https://legal.porch-and-paw.com/cookie-policy-page' },
    { name: '📬 Contact & Legal Requests', url: 'https://legal.porch-and-paw.com/contact-legal-requests' },
  ];

  return (
    <>
      <div className="w-64 bg-[#F4F0EA] border-r border-[#B6A799]/30 min-h-[calc(100vh-41px)] flex flex-col justify-between p-4 text-left select-none flex-shrink-0">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A7A59] px-3 mb-4">Navigation</p>
          
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left no-underline ${
                    item.highlight 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : isActive
                        ? 'bg-[#B55D3B] text-white shadow-sm'
                        : 'text-[#2D2A27]/80 hover:bg-[#EAE4DA] hover:text-[#2D2A27]'
                  }`}
                >
                  {isActive && !item.highlight ? <span className="text-white brightness-200">{item.icon}</span> : item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Legal Suite Dropdown Section */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setLegalOpen(!legalOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-[#2D2A27]/80 hover:bg-[#EAE4DA] transition-colors text-left border-0 cursor-pointer"
            >
              <div className="flex items-center gap-3 text-[#7A7A59]">
                <Scale size={18} />
                <span>Legal Suite</span>
              </div>
              {legalOpen ? <ChevronUp size={16} className="text-[#7A7A59]" /> : <ChevronDown size={16} className="text-[#7A7A59]" />}
            </button>

            {legalOpen && (
              <div className="mt-1 ml-4 pl-2 border-l border-[#B6A799]/40 space-y-0.5 max-h-56 overflow-y-auto custom-scrollbar">
                {legalLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalTarget({ url: link.url, title: link.name });
                    }}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-semibold text-[#2D2A27]/70 hover:bg-[#EAE4DA] hover:text-[#B55D3B] transition-all text-left border-0 bg-transparent cursor-pointer"
                  >
                    <FileText size={12} className="opacity-40 flex-shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Human User Profile Node */}
        <div className="pt-3 border-t border-[#B6A799]/30 mt-4">
          <div className="flex items-center gap-3 p-2 bg-[#EAE4DA]/50 rounded-xl border border-[#B6A799]/20">
            <div className="h-9 w-9 rounded-full bg-[#B55D3B] text-white flex items-center justify-center font-bold font-serif text-sm shadow-sm flex-shrink-0">
              {user?.email ? user.email.charAt(0).toUpperCase() : '🐾'}
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-xs font-bold text-[#2D2A27] truncate">
                {user?.email ? user.email.split('@')[0] : 'Dominique'}
              </p>
              <p className="text-[10px] font-bold tracking-wide uppercase text-[#7A7A59] mt-0.5">
                Beta Access Tier
              </p>
            </div>
          </div>
        </div>
      </div>

      <LegalModal 
        isOpen={modalTarget !== null}
        onClose={() => setModalTarget(null)}
        url={modalTarget?.url || ''}
        title={modalTarget?.title || ''}
      />
    </>
  );
};

export default Sidebar;