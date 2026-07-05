import React, { useState } from 'react';
import { X, Check, Ticket, Sparkles } from 'lucide-react';
import { usePets } from '../context/PetContext';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose }) => {
  const { setPlan } = usePets();
  const [modalStep, setModalStep] = useState(1); // 1 = Selection Grid, 2 = Promo Checkout
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSelectPlan = (name: string, price: number) => {
    setSelectedPlan({ name, price });
    setModalStep(2);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'BETAPACK100') {
      setIsDiscounted(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid discount code. Please check and try again.');
      setIsDiscounted(false);
    }
  };

  const handleCloseModal = () => {
    setModalStep(1);
    setSelectedPlan(null);
    setPromoCode('');
    setIsDiscounted(false);
    setErrorMessage('');
    onClose();
  };

  const handleActivatePlan = () => {
    if (selectedPlan) {
      // Use any to clear the strict string type-checking barrier smoothly
      const tierMapping: Record<string, any> = {
        'Memory Tracker': 'Memory Tracker',
        'Total Pack Hub': 'Premium'
      };
      
      setPlan(tierMapping[selectedPlan.name] || 'Free');
    }
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#FFFDF9] text-[#2D2A27] w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-[#2D2A27]/10 max-h-[90vh] flex flex-col">
        
        <button 
          onClick={handleCloseModal}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#2D2A27]/5 text-[#2D2A27]/60 hover:text-[#2D2A27] transition-all"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10 overflow-y-auto flex-1">
          {/* STEP 1: CHOOSE A PLAN GRID */}
          {modalStep === 1 && (
            <div className="space-y-8">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <h2 className="text-3xl font-black tracking-tight">Choose Your Journey</h2>
                <p className="text-[#2D2A27]/70 leading-relaxed">
                  From custom daily tracking to our signature culinary library, select the perfect framework for your home.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Free Card */}
                <div className="bg-white p-6 rounded-3xl border border-[#2D2A27]/10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold opacity-60">Free Plan</h3>
                    <div className="text-4xl font-black">$0.00</div>
                    <ul className="space-y-3 text-sm opacity-80 pt-2">
                      <li className="flex items-center gap-2"><Check size={16} className="text-[#6E8E7A]" /> 1 Dog Profile</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-[#6E8E7A]" /> Basic Dashboard Access</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-[#6E8E7A]" /> Health & Reminder Logs</li>
                    </ul>
                  </div>
                  <button disabled className="w-full py-3 bg-[#2D2A27]/5 text-[#2D2A27]/50 font-bold rounded-xl text-sm">
                    Current Baseline
                  </button>
                </div>

                {/* Mid-Tier Card */}
                <div className="bg-white p-6 rounded-3xl border-2 border-[#6E8E7A]/20 shadow-sm flex flex-col justify-between space-y-6 relative">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#6E8E7A]">Memory Tracker</h3>
                    <div className="text-4xl font-black">$4.99<span className="text-sm font-normal text-[#2D2A27]/60">/mo</span></div>
                    <ul className="space-y-3 text-sm opacity-80 pt-2">
                      <li className="flex items-center gap-2 font-semibold text-[#6E8E7A]">• Everything in Free</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-[#6E8E7A]" /> Full Memory Vault & Journal</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-[#6E8E7A]" /> Media Storage Allocation</li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleSelectPlan('Memory Tracker', 4.99)}
                    className="w-full py-3 bg-[#6E8E7A] text-white hover:bg-[#5C7A67] font-bold rounded-xl text-sm shadow-md transition-all active:scale-95"
                  >
                    Unlock Memories
                  </button>
                </div>

                {/* Premium Card */}
                <div className="bg-white p-6 rounded-3xl border-2 border-[#C1694F] shadow-md flex flex-col justify-between space-y-6 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C1694F] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#C1694F]">Total Pack Hub</h3>
                    <div className="text-4xl font-black">$9.99<span className="text-sm font-normal text-[#2D2A27]/60">/mo</span></div>
                    <ul className="space-y-3 text-sm opacity-80 pt-2">
                      <li className="flex items-center gap-2 font-semibold text-[#C1694F]">• Everything in Memory</li>
                      <li className="flex items-center gap-2 font-bold"><Check size={16} className="text-[#C1694F]" /> 200+ Recipe Culinary Vault</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-[#C1694F]" /> Unique AI Breed Imagery</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-[#C1694F]" /> Unlimited Dog Profiles</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-[#C1694F]" /> Live Household Syncing</li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleSelectPlan('Total Pack Hub', 9.99)}
                    className="w-full py-3 bg-[#C1694F] text-white hover:bg-[#A8583F] font-bold rounded-xl text-sm shadow-md transition-all active:scale-95"
                  >
                    Get Total Pack Hub
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CHECKOUT SUMMARY WITH PROMO LOGIC */}
          {modalStep === 2 && selectedPlan && (
            <div className="max-w-md mx-auto space-y-8 py-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-black">Review Order Details</h2>
                <p className="text-sm text-[#2D2A27]/60">Confirm your tier preference to establish tracking parameters.</p>
              </div>

              <div className="bg-white border border-[#2D2A27]/10 p-6 rounded-2xl flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-bold text-lg">{selectedPlan.name}</h4>
                  <p className="text-xs text-[#2D2A27]/50">Subscription Access (Monthly Recurring)</p>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-black ${isDiscounted ? 'line-through text-[#2D2A27]/40 text-sm' : ''}`}>
                    ${selectedPlan.price.toFixed(2)}
                  </div>
                  {isDiscounted && (
                    <div className="text-xl font-black text-[#6E8E7A] animate-pulse">$0.00</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2D2A27]/60 block">Promo or Tester Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D2A27]/30" size={18} />
                    <input 
                      type="text"
                      placeholder="Enter code here..."
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={isDiscounted}
                      className="w-full h-12 pl-11 pr-4 bg-[#F4F0EA] border-none rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 ring-[#C1694F]/20 disabled:opacity-50"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    disabled={isDiscounted || !promoCode}
                    className="px-5 bg-[#2D2A27] text-white font-bold text-sm rounded-xl hover:bg-[#2D2A27]/90 transition-colors disabled:opacity-30"
                  >
                    Apply
                  </button>
                </div>
                
                {errorMessage && <p className="text-xs text-red-600 font-medium pl-1">{errorMessage}</p>}
                {isDiscounted && <p className="text-xs text-[#6E8E7A] font-bold pl-1 flex items-center gap-1">✨ Beta Access Verified (100% Discount Applied)</p>}
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={handleActivatePlan}
                  className={`w-full h-14 font-black rounded-xl text-base shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-white ${
                    isDiscounted ? 'bg-[#6E8E7A] hover:bg-[#5C7A67]' : 'bg-[#C1694F] hover:bg-[#A8583F]'
                  }`}
                >
                  {isDiscounted ? (
                    <>Activate Beta Access <Sparkles size={18} /></>
                  ) : (
                    <>Confirm Payment Setup</>
                  )}
                </button>
                
                <button
                  onClick={() => setModalStep(1)}
                  className="w-full text-center text-xs font-bold opacity-50 hover:opacity-100 transition-opacity"
                >
                  Change Selected Tier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanModal;