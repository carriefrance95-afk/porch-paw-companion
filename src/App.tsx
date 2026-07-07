import React, { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import Kitchen from './pages/Kitchen';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [authMessage, setAuthMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);

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
        <div className="text-[#2D2A27]/60 font-medium text-sm">🐾 Connecting to Kitchen...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between">
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow">
        {!session ? (
          /* AUTHENTICATION PORTAL */
          <div className="min-h-[75vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-[#B6A799]/30 rounded-2xl p-8 shadow-md">
              <div className="text-center mb-6">
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
                    className="w-full px-4 py-2 bg-white border-2 border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
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
                    className="w-full px-4 py-2 bg-white border-2 border-[#B6A799]/40 rounded-xl text-sm focus:outline-none focus:border-[#B55D3B]"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

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
                  className="w-full py-2.5 bg-[#B55D3B] hover:bg-[#9C4E30] text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
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
          /* AUTHENTICATED PLATFORM WORKSPACE */
          <div>
            <nav className="bg-[#F4F0EA] border-b border-[#B6A799]/20 px-4 py-2.5 flex justify-between items-center text-xs">
              <span className="text-[#2D2A27]/70 font-medium">
                Authorized Session: <strong className="text-[#2D2A27]">{session.user.email}</strong>
              </span>
              <button 
                onClick={async () => await supabase.auth.signOut()}
                className="px-3 py-1 bg-white border-2 border-[#B6A799]/40 rounded-lg font-bold text-[#7A7A59] hover:text-[#B55D3B] transition-colors shadow-sm"
              >
                Sign Out
              </button>
            </nav>
            <Kitchen />
          </div>
        )}
      </div>

      {/* FIXED LEGAL PROTECTION & CONTACT FOOTER */}
      <footer className="w-full bg-[#2D2A27] text-[#F4F0EA]/80 border-t-4 border-[#B55D3B] py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-xs leading-relaxed">
          
          {/* Disclaimer Column */}
          <div className="md:w-2/3 space-y-2">
            <span className="text-[#B55D3B] font-bold uppercase tracking-wider block text-[10px]">VETERINARY & NUTRITION DISCLAIMER</span>
            <p>
              The information, culinary concepts, and nutritional recipes shared within the Porch & Paw platform are intended solely for educational, informational, and home-kitchen preservation purposes. 
              <strong> We are not licensed veterinarians, certified animal nutritionists, or clinical veterinary practitioners.</strong>
            </p>
            <p>
              Dietary requirements vary drastically based on an individual animal’s breed, weight, medical history, and specific lifecycle health conditions. Always consult with your primary care veterinarian or a certified veterinary professional before modifying your pet’s diet, introducing new hero ingredients, or responding to suspected toxic health emergencies.
            </p>
          </div>

          {/* Copyright & Support Column */}
          <div className="md:w-1/3 flex flex-col md:items-end justify-between gap-4 md:text-right">
            <div>
              <span className="text-[#B55D3B] font-bold uppercase tracking-wider block text-[10px] mb-1">CONTACT & SUPPORT</span>
              <p className="font-medium text-[#F4F0EA]">Porch & Paw Ecosystem Business Network</p>
              <p className="text-[#F4F0EA]/60">Beta Support Email: <a href="mailto:support@porchandpaw.com" className="underline hover:text-white">support@porchandpaw.com</a></p>
            </div>
            
            <div className="text-[11px] text-[#F4F0EA]/50 pt-2 border-t border-[#B6A799]/20 w-full md:w-auto">
              &copy; {new Date().getFullYear()} Porch & Paw. All Rights Reserved. Confidential Beta Platform.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default App;
