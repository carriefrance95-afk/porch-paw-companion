import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      loading && setLoading(false);
    }
  };

  return (
    <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-box bg-[#F4F0EA] max-w-md w-full border-2 border-[#B6A799]/30 p-8 rounded-[2rem] shadow-2xl relative z-10">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-[#2D2A27] font-bold text-lg hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer"
        >✕</button>
        
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Porch & Paw" className="h-24 w-24 mx-auto mb-4 rounded-full object-contain" />
          <h3 className="text-2xl font-serif font-bold text-[#2D2A27]">
            Porchside Pet Life
          </h3>
          <p className="mt-2 text-xs tracking-[0.35em] text-[#7A7A59] font-semibold">by Porch & Paw</p>
          <p className="text-[#2D2A27] mt-3 text-sm leading-relaxed max-w-sm mx-auto opacity-80">
            The all-in-one guide for devoted dog parents. Cookbooks, health, travel, and journals.
          </p>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-5xl">📧</div>
            <h4 className="text-xl font-bold text-[#7A7A59]">Check your email!</h4>
            <p className="text-[#2D2A27] text-sm opacity-90">We've sent a confirmation link to <span className="font-bold">{email}</span>.</p>
            <button 
              style={{ backgroundColor: '#B55D3B', borderColor: '#B55D3B', color: '#FFFFFF' }} 
              className="w-full h-12 font-bold rounded-xl transition-all shadow-md active:scale-95 border cursor-pointer mt-4" 
              onClick={onClose}
            >
              Got it
            </button>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="form-control w-full flex flex-col">
              <label className="mb-1.5 pl-1">
                <span className="text-sm font-bold text-[#2D2A27]">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder="dogparent@example.com" 
                className="w-full h-12 px-4 rounded-xl bg-white border border-[#B6A799]/40 text-[#2D2A27] focus:outline-none focus:ring-2 ring-[#B55D3B]/20" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control w-full flex flex-col">
              <label className="mb-1.5 pl-1">
                <span className="text-sm font-bold text-[#2D2A27]">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full h-12 px-4 rounded-xl bg-white border border-[#B6A799]/40 text-[#2D2A27] focus:outline-none focus:ring-2 ring-[#B55D3B]/20" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="rounded-xl p-3 text-xs bg-[#B55D3B]/10 text-[#2D2A27] border border-[#B55D3B]/20 font-medium leading-relaxed">
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: '#B55D3B', borderColor: '#B55D3B', color: '#FFFFFF' }}
              className="w-full h-12 text-base font-bold rounded-xl shadow-md transition-all active:scale-95 border cursor-pointer mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>

            <div className="text-center pt-4 border-t border-[#B6A799]/20 mt-6">
              <p className="text-[#2D2A27] text-xs opacity-80">
                {isSignUp ? 'Already have an account?' : 'New to Porchside Pet Life?'}
                <button 
                  type="button"
                  style={{ color: '#B55D3B' }}
                  className="ml-1.5 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Sign In' : 'Create an Account'}
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
      <div className="modal-backdrop fixed inset-0 bg-[#2D2A27]/40 backdrop-blur-sm z-0" onClick={onClose}></div>
    </div>
  );
};

export default AuthModal;