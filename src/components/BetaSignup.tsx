import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2 } from 'lucide-react';

const BetaSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    // Mock API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-success/10 border border-success/20 rounded-[2rem] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-success text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-xl font-bold text-success mb-2">You're on the list!</h3>
        <p className="text-sm opacity-70">We'll notify you as soon as our beta program launches.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-secondary/10 to-primary/10 border border-base-200 rounded-[2.5rem] p-8 relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-secondary animate-pulse" size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Beta Program</span>
        </div>
        <h3 className="text-2xl font-black mb-3">Join the Beta Parent 100</h3>
        <p className="text-sm opacity-70 mb-6 leading-relaxed font-medium">
          Be one of the first 100 dog parents to shape the future of Porch & Paw. Get exclusive early access and lifetime perks.
        </p>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="input input-bordered flex-1 rounded-2xl bg-base-100/50 border-base-300 focus:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting'}
            required
          />
          <button 
            type="submit"
            className={`btn btn-secondary rounded-2xl px-6 ${status === 'submitting' ? 'loading' : ''}`}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? '' : <Send size={18} />}
          </button>
        </form>
      </div>
      <Sparkles className="absolute -top-10 -right-10 w-40 h-40 opacity-5 group-hover:rotate-12 transition-transform duration-1000" />
    </div>
  );
};

export default BetaSignup;
