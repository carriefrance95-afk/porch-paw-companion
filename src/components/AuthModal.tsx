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
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-100 max-w-md border-2 border-primary/10 shadow-premium rounded-3xl">
        <button 
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >✕</button>
        
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🐾</div>
          <h3 className="text-2xl font-serif font-bold text-neutral">
            {isSignUp ? 'Join the Family' : 'Welcome Back'}
          </h3>
          <p className="text-accent mt-2">
            {isSignUp 
              ? 'Start your dog\'s digital home today.' 
              : 'Sign in to access your dog\'s records.'}
          </p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">📧</div>
            <h4 className="text-xl font-bold text-secondary mb-2">Check your email!</h4>
            <p className="text-accent mb-6"> We've sent a confirmation link to {email}.</p>
            <button className="btn btn-primary btn-block rounded-xl" onClick={onClose}>
              Got it
            </button>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-neutral">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder="dogparent@example.com" 
                className="input input-bordered w-full rounded-xl bg-white/50 focus:border-primary" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-neutral">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input input-bordered w-full rounded-xl bg-white/50 focus:border-primary" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="alert alert-error rounded-xl py-2 text-sm">
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className={`btn btn-primary btn-block rounded-xl h-12 text-lg shadow-md hover:shadow-lg transition-all ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>

            <div className="text-center mt-6">
              <p className="text-accent text-sm">
                {isSignUp ? 'Already have an account?' : 'New to Porch & Paw?'}
                <button 
                  type="button"
                  className="ml-2 text-primary font-bold hover:underline"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Sign In' : 'Create an Account'}
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
      <div className="modal-backdrop bg-neutral/20 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};

export default AuthModal;
