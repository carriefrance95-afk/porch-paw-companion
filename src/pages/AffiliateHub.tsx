import React, { useState } from 'react';
import { 
  ShieldCheck, Pill, MapPin, BookOpen, 
  ExternalLink, ArrowRight, Calculator,
  Heart, Sparkles, Star, CheckCircle2
} from 'lucide-react';

const AffiliateHub: React.FC = () => {
  const [quoteStep, setQuoteStep] = useState<'start' | 'calculating' | 'result'>('start');
  const [mockQuote, setMockQuote] = useState<number | null>(null);

  const calculateQuote = () => {
    setQuoteStep('calculating');
    setTimeout(() => {
      setMockQuote(Math.floor(Math.random() * (45 - 25 + 1)) + 25);
      setQuoteStep('result');
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mb-20">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Star size={24} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black text-neutral tracking-tight">Partner Perks</h1>
        </div>
        <p className="text-xl text-neutral/60 font-medium max-w-2xl">
          Exclusive discounts and trusted resources from our hand-picked partners, curated just for the Porch & Paw family.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Fetch Pet Insurance - Interactive */}
        <div className="card bg-white shadow-premium overflow-hidden border-none flex flex-col">
          <div className="bg-primary p-10 text-primary-content relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="badge badge-secondary font-bold px-4 py-3">TOP PARTNER</span>
                <ShieldCheck size={48} className="opacity-20" />
              </div>
              <h2 className="text-3xl font-serif font-black mb-4">Fetch Pet Insurance</h2>
              <p className="text-lg opacity-90 font-medium mb-8">Comprehensive coverage that treats your dog like family. Get a quick quote below.</p>
            </div>
            <Sparkles className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10" />
          </div>
          
          <div className="p-10 flex-1 flex flex-col">
            <div className="bg-base-100 rounded-[2rem] p-8 border border-base-200">
              {quoteStep === 'start' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    <Calculator size={20} className="text-primary" />
                    Instant Quote Estimator
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase opacity-40">Dog Age</label>
                      <select className="select select-bordered w-full rounded-xl">
                        <option>Puppy (&lt; 1yr)</option>
                        <option>Adult (1-7yrs)</option>
                        <option>Senior (7+ yrs)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase opacity-40">Size</label>
                      <select className="select select-bordered w-full rounded-xl">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={calculateQuote}
                    className="btn btn-primary btn-block rounded-2xl h-14 text-lg shadow-lg shadow-primary/20"
                  >
                    Calculate Estimate
                  </button>
                </div>
              )}

              {quoteStep === 'calculating' && (
                <div className="text-center py-10 space-y-4">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="font-bold text-neutral/60">Fetching best rates...</p>
                </div>
              )}

              {quoteStep === 'result' && (
                <div className="text-center py-4 space-y-6">
                  <div className="bg-primary/5 rounded-3xl p-6 border-2 border-dashed border-primary/20">
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">Estimated Monthly Premium</p>
                    <div className="text-5xl font-black text-primary">${mockQuote}</div>
                    <p className="text-xs opacity-50 mt-2">*Based on medium adult dog. Subject to enrollment.</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="btn btn-primary flex-1 rounded-2xl">Enroll with Fetch</button>
                    <button onClick={() => setQuoteStep('start')} className="btn btn-ghost rounded-2xl underline">Recalculate</button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 pt-8 border-t border-base-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-secondary">
                <CheckCircle2 size={16} />
                Exclusive 10% Discount
              </div>
              <button className="btn btn-ghost btn-sm gap-2">
                Plan Details <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* PetMeds Pharmacy */}
        <div className="card bg-white shadow-premium border-none flex flex-col group">
          <div className="h-64 relative overflow-hidden rounded-t-[2.5rem]">
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="PetMeds"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Pill size={24} className="text-secondary" />
                <span className="font-black text-xs uppercase tracking-widest opacity-80 text-secondary">Pharmacy Partner</span>
              </div>
              <h2 className="text-3xl font-serif font-black">PetMeds Pharmacy</h2>
            </div>
          </div>
          <div className="p-10 flex-1 flex flex-col">
            <p className="text-lg text-neutral/60 font-medium mb-8 leading-relaxed">
              Never miss a dose. Get prescription meds, heartworm prevention, and wellness essentials delivered to your porch.
            </p>
            <div className="bg-secondary/5 rounded-3xl p-6 border border-secondary/10 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-secondary text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                  $20
                </div>
                <div>
                  <h4 className="font-bold text-lg">Member Promo Code</h4>
                  <p className="text-sm opacity-60">Use <strong>PORCHPAW20</strong> for $20 off your first order over $100.</p>
                </div>
              </div>
            </div>
            <div className="mt-auto flex gap-4">
              <button className="btn btn-secondary flex-1 rounded-2xl h-14 text-lg">Shop PetMeds</button>
              <button className="btn btn-ghost btn-square h-14 w-14 border border-base-200 rounded-2xl">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* BringFido Travel */}
        <div className="card bg-white shadow-premium border-none flex flex-col group">
          <div className="h-64 relative overflow-hidden rounded-t-[2.5rem]">
            <img 
              src="https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="BringFido"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={24} className="text-accent" />
                <span className="font-black text-xs uppercase tracking-widest opacity-80 text-accent">Adventure Partner</span>
              </div>
              <h2 className="text-3xl font-serif font-black">Travel with BringFido</h2>
            </div>
          </div>
          <div className="p-10 flex-1 flex flex-col">
            <p className="text-lg text-neutral/60 font-medium mb-8 leading-relaxed">
              Find dog-friendly hotels, restaurants, and attractions. No matter where the adventure leads, Porch & Paw and BringFido have you covered.
            </p>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Where are you going?" 
                className="input input-bordered w-full pl-12 h-14 rounded-2xl bg-base-100 border-base-200 focus:border-accent shadow-sm"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
              <button className="btn btn-accent btn-sm absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-4">Search</button>
            </div>
            <div className="mt-8 pt-8 border-t border-base-100 flex items-center justify-between">
              <p className="text-xs font-bold text-neutral/40 uppercase tracking-widest">Powered by BringFido</p>
              <ArrowRight size={20} className="text-accent group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>

        {/* Keepsake Memory Books */}
        <div className="card bg-white shadow-premium border-none flex flex-col group lg:col-span-1">
          <div className="bg-accent p-10 text-accent-content relative overflow-hidden rounded-t-[2.5rem]">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="badge bg-white/20 text-white font-bold px-4 py-3 border-none">PREMIUM KEEPSAKE</span>
                <BookOpen size={48} className="opacity-20" />
              </div>
              <h2 className="text-3xl font-serif font-black mb-4">The Keepsake Library</h2>
              <p className="text-lg opacity-90 font-medium leading-relaxed">Turn your digital journal and photo vault into a high-quality, professional-grade printed memory book.</p>
            </div>
            <BookOpen className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10" />
          </div>
          <div className="p-10 flex-1 flex flex-col bg-white rounded-b-[2.5rem]">
            <ul className="space-y-4 mb-8">
              {[
                'Lay-flat professional binding',
                'Custom linen or leather covers',
                'Premium archival-quality paper',
                'Automatic journal & photo syncing'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral/70 font-medium">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex gap-4 pt-8 border-t border-base-100">
               <button className="btn bg-accent text-white hover:bg-accent/90 flex-1 h-14 rounded-2xl text-lg shadow-lg shadow-accent/20">
                  Build Your Book
               </button>
               <button className="btn btn-ghost btn-square h-14 w-14 border border-base-200 rounded-2xl">
                  <Info size={20} />
               </button>
            </div>
          </div>
        </div>

      </div>

      {/* Trust Banner */}
      <div className="mt-20 p-12 bg-base-200 rounded-[3rem] text-center border border-base-300/30">
        <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
          <ShieldCheck className="text-secondary" size={28} />
          Porch & Paw Partner Promise
        </h3>
        <p className="text-neutral/60 font-medium max-w-3xl mx-auto leading-relaxed">
          We only partner with companies that share our "Dogs are Family" philosophy. Every partner listed here has been vetted by our team for safety, quality, and service excellence. If you have any feedback on a partner experience, please let us know.
        </p>
      </div>
    </div>
  );
};

const Info: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default AffiliateHub;
