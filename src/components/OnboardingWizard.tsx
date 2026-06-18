import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { 
  PawPrint, Camera, Heart, Activity, 
  ChevronRight, ChevronLeft, Check, 
  User, Sparkles, Stethoscope, Mail
} from 'lucide-react';

const OnboardingWizard: React.FC = () => {
  const { addProfile, addWeightEntry } = usePets();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    birthDate: '',
    photoUrl: '',
    weight: '',
    vetName: '',
    vetContact: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate slight delay for "cozy" feeling
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const dogId = Math.random().toString(36).substr(2, 9);
    
    addProfile({
      id: dogId,
      name: formData.name,
      breed: formData.breed,
      birthDate: formData.birthDate,
      currentWeight: parseFloat(formData.weight) || 0,
      photoUrl: formData.photoUrl || 'https://images.unsplash.com/photo-1543466835-00a732f3804c',
      weightHistory: []
    });

    if (formData.weight) {
      addWeightEntry(dogId, {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(formData.weight)
      });
    }

    setLoading(false);
    nextStep(); // Move to success step
  };

  const branding = {
    ivory: 'bg-[#FDFCF0]',
    terracotta: 'bg-[#E2725B]',
    terracottaText: 'text-[#E2725B]',
    terracottaBorder: 'border-[#E2725B]',
    sage: 'bg-[#8F9779]',
    sageText: 'text-[#8F9779]',
    taupe: 'text-[#8D7A6D]',
    taupeLight: 'text-[#8D7A6D]/70'
  };

  return (
    <div className={`min-h-screen ${branding.ivory} flex items-center justify-center p-4 font-sans`}>
      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-[#8D7A6D]/10">
        
        {/* Progress Bar */}
        {step < 5 && (
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 flex">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`flex-1 transition-all duration-500 ${step >= i ? branding.sage : 'bg-transparent'}`} 
              />
            ))}
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-center">
                <div className={`w-24 h-24 ${branding.terracotta} rounded-full flex items-center justify-center text-white shadow-lg`}>
                  <PawPrint size={48} />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-[#8b5a2b]">Welcome to Porch & Paw</h1>
                <p className={`text-xl ${branding.taupe} max-w-md mx-auto leading-relaxed`}>
                  We're so glad you're here. Let's start building a beautiful life story for your furry best friend.
                </p>
              </div>
              <button 
                onClick={nextStep}
                className={`${branding.terracotta} hover:opacity-90 text-white btn btn-lg rounded-2xl px-12 border-none shadow-xl transition-all hover:scale-105 active:scale-95`}
              >
                Let's Begin <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${branding.terracotta} rounded-2xl flex items-center justify-center text-white`}>
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#8b5a2b]">Your Dog's Profile</h2>
                  <p className={branding.taupeLight}>Tell us the basics about your companion.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${branding.taupe}`}>What's their name?</span></label>
                  <input 
                    type="text" 
                    placeholder="Buddy, Bella, Max..." 
                    className="input input-bordered w-full rounded-2xl h-14 bg-[#faf7f2] border-none focus:ring-2 ring-[#E2725B]/20"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label"><span className={`label-text font-bold ${branding.taupe}`}>What breed are they?</span></label>
                    <input 
                      type="text" 
                      placeholder="Golden Retriever..." 
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#faf7f2] border-none focus:ring-2 ring-[#E2725B]/20"
                      value={formData.breed}
                      onChange={e => setFormData({...formData, breed: e.target.value})}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className={`label-text font-bold ${branding.taupe}`}>Their Birthday?</span></label>
                    <input 
                      type="date" 
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#faf7f2] border-none focus:ring-2 ring-[#E2725B]/20"
                      value={formData.birthDate}
                      onChange={e => setFormData({...formData, birthDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button onClick={prevStep} className="btn btn-ghost rounded-2xl gap-2 font-bold opacity-60">
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={nextStep} 
                  disabled={!formData.name}
                  className={`${branding.terracotta} text-white btn rounded-2xl px-10 border-none shadow-lg disabled:opacity-30`}
                >
                  Continue <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Photo */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${branding.sage} rounded-2xl flex items-center justify-center text-white`}>
                  <Camera size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#8b5a2b]">Capture the Cuteness</h2>
                  <p className={branding.taupeLight}>A profile isn't complete without a photo.</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-8 py-4">
                <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-[#faf7f2] shadow-xl bg-gray-100 flex items-center justify-center relative group">
                  {formData.photoUrl ? (
                    <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-300"><PawPrint size={80} /></div>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label"><span className={`label-text font-bold ${branding.taupe}`}>Photo URL</span></label>
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..." 
                    className="input input-bordered w-full rounded-2xl h-14 bg-[#faf7f2] border-none focus:ring-2 ring-[#E2725B]/20"
                    value={formData.photoUrl}
                    onChange={e => setFormData({...formData, photoUrl: e.target.value})}
                  />
                  <label className="label">
                    <span className="label-text-alt opacity-50">Hint: Try an Unsplash dog photo URL!</span>
                  </label>
                </div>

                <div className="grid grid-cols-4 gap-3 w-full">
                  {[
                    'https://images.unsplash.com/photo-1517849845537-4d257902454a',
                    'https://images.unsplash.com/photo-1543466835-00a732f3804c',
                    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
                    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d'
                  ].map((url, i) => (
                    <button 
                      key={i} 
                      onClick={() => setFormData({...formData, photoUrl: url})}
                      className="aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform"
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button onClick={prevStep} className="btn btn-ghost rounded-2xl gap-2 font-bold opacity-60">
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={nextStep}
                  className={`${branding.terracotta} text-white btn rounded-2xl px-10 border-none shadow-lg`}
                >
                  Continue <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Health Metrics */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${branding.terracotta} rounded-2xl flex items-center justify-center text-white`}>
                  <Heart size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#8b5a2b]">Initial Wellness</h2>
                  <p className={branding.taupeLight}>Let's record some starting health metrics.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${branding.taupe}`}>Current Weight (lbs)</span></label>
                  <div className="relative">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
                    <input 
                      type="number" 
                      placeholder="0.0" 
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#faf7f2] border-none pl-12 focus:ring-2 ring-[#E2725B]/20"
                      value={formData.weight}
                      onChange={e => setFormData({...formData, weight: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Stethoscope size={20} className={branding.terracottaText} />
                    <h3 className="font-bold text-[#8b5a2b]">Veterinarian Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label"><span className={`label-text font-bold text-xs ${branding.taupe}`}>Vet Name</span></label>
                      <input 
                        type="text" 
                        placeholder="Dr. Paws..." 
                        className="input input-bordered w-full rounded-xl h-12 bg-[#faf7f2] border-none"
                        value={formData.vetName}
                        onChange={e => setFormData({...formData, vetName: e.target.value})}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className={`label-text font-bold text-xs ${branding.taupe}`}>Contact Info</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                        <input 
                          type="text" 
                          placeholder="Phone or Email" 
                          className="input input-bordered w-full rounded-xl h-12 bg-[#faf7f2] border-none pl-10"
                          value={formData.vetContact}
                          onChange={e => setFormData({...formData, vetContact: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button onClick={prevStep} className="btn btn-ghost rounded-2xl gap-2 font-bold opacity-60">
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={handleSubmit} 
                  className={`${branding.terracotta} text-white btn rounded-2xl px-10 border-none shadow-lg h-auto py-4`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>Finish & Start Tracking <Sparkles size={20} className="ml-2" /></>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center space-y-8 py-10 animate-in zoom-in duration-700">
              <div className="flex justify-center relative">
                <div className={`w-32 h-32 ${branding.sage} rounded-full flex items-center justify-center text-white shadow-2xl relative z-10`}>
                  <Check size={64} />
                </div>
                <div className="absolute inset-0 scale-150 opacity-20 animate-ping">
                   <div className={`w-32 h-32 ${branding.sage} rounded-full mx-auto`} />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-black text-[#8b5a2b]">All Set! 🐶</h1>
                <p className={`text-xl ${branding.taupe} max-w-md mx-auto leading-relaxed`}>
                  {formData.name}'s profile is ready. You're all set to start tracking wellness, preserving memories, and planning adventures.
                </p>
              </div>
              <button 
                onClick={() => window.location.reload()} // Quickest way to clear interceptor
                className={`${branding.terracotta} hover:opacity-90 text-white btn btn-lg rounded-2xl px-12 border-none shadow-xl transition-all hover:scale-105 active:scale-95 mt-4`}
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
