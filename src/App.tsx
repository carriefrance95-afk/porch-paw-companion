import React, { useEffect, useState } from 'react';
import './index.css';
import { supabase } from './utils/supabaseClient';
import Dashboard from './pages/Dashboard';
import logoImg from './Porch & Paw Logo (6).png';

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
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }: any) => {
      setSession(currentSession);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event: any, currentSession: any) => {
      setSession(currentSession);
    });

    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }
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
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
        {!session ? (
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
                    <a href="https://legal.porch-and-paw.com/terms-page" target="_blank" rel="noreferrer" className="text-[#B55D3B] font-bold underline hover:text-[#9C4E30]">
                      Terms of Use
                    </a>{' '}
                    and{' '}
                    <a href="https://legal.porch-and-paw.com/privacy-page" target="_blank" rel="noreferrer" className="text-[#B55D3B] font-bold underline hover:text-[#9C4E30]">
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
                className={`w-full py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm ${
                  isSignUp && !agreedToTerms 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#B55D3B] hover:bg-[#9C4E30]'
                }`}
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
        ) : (
          <div className="w-full h-full flex flex-col">
            <nav className="bg-[#F4F0EA] border-b border-[#B6A799]/20 px-4 py-2.5 flex justify-between items-center text-xs">
              <span className="text-[#2D2A27]/70 font-medium">
                Authorized Session: <strong className="text-[#2D2A27]">{session.user?.email}</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-3 py-1 bg-white border-2 border-[#B6A799]/40 rounded-lg font-bold text-[#7A7A59] hover:text-[#B55D3B] transition-colors shadow-sm"
                >
                  {showSettings ? 'Back to Dashboard 🐾' : '⚙️ Settings'}
                </button>
                <button 
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setShowSettings(false);
                  }}
                  className="px-3 py-1 bg-[#2D2A27] text-white rounded-lg font-bold hover:bg-black transition-colors shadow-sm"
                >
                  Sign Out
                </button>
              </div>
            </nav>

            {showSettings ? (
              <div className="p-6 max-w-xl mx-auto bg-white mt-8 rounded-2xl border border-[#B6A799]/30 shadow-md">
                <div className="border-b border-[#B6A799]/20 pb-3 mb-4">
                  <h2 className="text-xl font-serif font-bold text-[#2D2A27]">⚙️ Account Settings</h2>
                  <p className="text-xs text-[#7A7A59] font-medium">Porchside Pet Life Platform Controls</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D2A27]/60 mb-2">Legal Suite & Documentation</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a href="https://legal.porch-and-paw.com/legal-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">🌿 Legal Center Home</a>
                      <a href="https://legal.porch-and-paw.com/terms-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">📄 Terms of Use</a>
                      <a href="https://legal.porch-and-paw.com/privacy-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">🔒 Privacy Policy</a>
                      <a href="https://legal.porch-and-paw.com/legal_disclaimer-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">⚖️ Legal Disclaimer</a>
                      <a href="https://legal.porch-and-paw.com/subscription-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">💳 Subscription & Cancellation</a>
                      <a href="https://legal.porch-and-paw.com/community-guidelines-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">🐾 Community Guidelines</a>
                      <a href="https://legal.porch-and-paw.com/copyright-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">©️ Copyright & IP Policy</a>
                      <a href="https://legal.porch-and-paw.com/deletion-retention-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">🗑️ Data Retention Policy</a>
                      <a href="https://legal.porch-and-paw.com/affiliate-disclosure-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">🤝 Affiliate Disclosure</a>
                      <a href="https://legal.porch-and-paw.com/cookie-policy-page" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F4F0EA]/40 border border-[#B6A799]/20 rounded-xl text-xs font-semibold text-[#2D2A27] hover:border-[#B55D3B] flex items-center gap-2">🍪 Cookie Policy</a>
                    </div>
                    <a href="https://legal.porch-and-paw.com/contact-legal-requests" target="_blank" rel="noreferrer" className="mt-2 block text-center p-2.5 bg-[#F4F0EA]/70 border border-[#B6A799]/30 rounded-xl text-xs font-bold text-[#B55D3B] hover:bg-[#B55D3B] hover:text-white transition-colors">📬 Contact & Official Legal Requests</a>
                  </div>

                  <div className="pt-4 border-t border-[#B6A799]/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#2D2A27]">Profile Erasure</p>
                      <p className="text-[11px] text-[#2D2A27]/60">Permanently drop your beta account and wipe all metadata.</p>
                    </div>
                    <button 
                      onClick={() => alert("Account deletion request logged.")}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-lg transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Dashboard />
            )}
          </div>
        )}
      </div>

      <footer className="w-full bg-[#2D2A27] text-[#F4F0EA]/80 border-t-4 border-[#B55D3B] py-6 px-6 text-center text-xs">
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