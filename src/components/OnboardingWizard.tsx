import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import {
  PawPrint, Camera, Heart, Activity,
  ChevronRight, ChevronLeft, Check,
  User, Sparkles, Stethoscope, Mail
} from 'lucide-react';
import AuthModal from './AuthModal';

const OnboardingWizard: React.FC = () => {
  const { addProfile, addWeightEntry, addDirectoryEntry } = usePets();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPhotoFile(file);
    const localPreviewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, photoUrl: localPreviewUrl });
  };

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
      photoUrl: formData.photoUrl || '',
      weightHistory: []
    });

    if (formData.weight) {
      addWeightEntry(dogId, {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(formData.weight)
      });
    }

    if (formData.vetName) {
      addDirectoryEntry({
        id: Math.random().toString(36).substr(2, 9),
        name: formData.vetName,
        category: 'Vet',
        phone: formData.vetContact || 'Not provided',
        notes: `Primary vet for ${formData.name}`
      });
    }

    setLoading(false);
    nextStep(); // Move to success step
  };

  const branding = {
    ivory: 'bg-[#F4F0EA]',
    terracotta: 'bg-[#B55D3B]',
    terracottaText: 'text-[#B55D3B]',
    terracottaBorder: 'border-[#B55D3B]',
    sage: 'bg-[#7A7A59]',
    sageText: 'text-[#7A7A59]',
    charcoal: 'text-[#2D2A27]',
    taupe: 'text-[#B6A799]',
    taupeLight: 'text-[#B6A799]/80'
  };

  return (
    <div className={`min-h-screen ${branding.ivory} flex items-center justify-center p-4 font-sans`}>
      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-[#B6A799]/20">
        
        {/* Progress Bar */}
        {step < 5 && (
          <div className="absolute top-0 left-0 w-full h-2 bg-[#B6A799]/20 flex">
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
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#B6A799]/20 overflow-hidden mx-auto">
                  <img src="/logo.png" alt="Porchside Pet Life Logo" className="h-16 w-16 mx-auto object-contain" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-[#7A7A59] font-semibold">by Porch & Paw</p>
                <h1 className={`text-4xl md:text-5xl font-black ${branding.charcoal}`}>Porchside Pet Life</h1>
                <p className={`text-xl ${branding.taupe} max-w-md mx-auto leading-relaxed`}>
                  The all-in-one guide for devoted dog parents. Cookbooks, health, travel, and journals.
                </p>
              </div>
              <button
                onClick={nextStep}
                style={{ backgroundColor: '#B55D3B', color: '#FFFFFF' }}
                className="font-bold text-lg rounded-2xl h-14 px-12 inline-flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Let's Begin <ChevronRight size={20} />
              </button>

              <div className="pt-6 border-t border-[#B6A799]/20 w-full mt-4">
                <p className={`text-sm ${branding.taupe}`}>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    style={{ color: '#B55D3B' }}
                    className="font-bold hover:underline transition-all bg-transparent border-none p-0"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#B55D3B] rounded-2xl flex items-center justify-center text-white">
                  <User size={24} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${branding.charcoal}`}>Your Dog's Profile</h2>
                  <p className={branding.taupeLight}>Tell us the basics about your companion.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="form-control">
                  <label className="label"><span className={`label-text font-bold ${branding.taupe}`}>What's their name?</span></label>
                  <input 
                    type="text" 
                    placeholder="Buddy, Bella, Max..." 
                    className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none focus:ring-2 ring-[#B55D3B]/20 px-4"
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
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none focus:ring-2 ring-[#B55D3B]/20 px-4"
                      value={formData.breed}
                      onChange={e => setFormData({...formData, breed: e.target.value})}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className={`label-text font-bold ${branding.taupe}`}>Their Birthday?</span></label>
                    <input 
                      type="date" 
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none focus:ring-2 ring-[#B55D3B]/20 px-4"
                      value={formData.birthDate}
                      onChange={e => setFormData({...formData, birthDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <button onClick={prevStep} style={{ color: '#2D2A27' }} className="inline-flex items-center gap-2 font-bold opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none">
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={nextStep} 
                  disabled={!formData.name}
                  style={formData.name ? { backgroundColor: '#B55D3B', color: '#FFFFFF' } : { backgroundColor: '#B55D3B', color: '#FFFFFF', opacity: 0.4 }}
                  className="font-bold rounded-2xl h-14 px-10 inline-flex items-center justify-center gap-2 shadow-lg transition-all"
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
                <div className="w-12 h-12 bg-[#7A7A59] rounded-2xl flex items-center justify-center text-white">
                  <Camera size={24} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${branding.charcoal}`}>Capture the Cuteness</h2>
                  <p className={branding.taupeLight}>A profile isn't complete without a photo.</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-8 py-4">
                <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-[#F4F0EA] shadow-xl bg-[#B6A799]/10 flex items-center justify-center relative group">
                  {formData.photoUrl ? (
                    <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[#B6A799]"><PawPrint size={80} /></div>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="label"><span className={`label-text font-bold ${branding.taupe}`}>Profile Photo</span></label>
                  <input type="file" accept="image/*" className="hidden" id="dog-photo-upload-onboarding" onChange={handlePhotoUpload} />
                  <label htmlFor="dog-photo-upload-onboarding" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#B55D3B] bg-[#F4F0EA] px-5 py-4 font-bold text-[#2D2A27] hover:bg-[#EFE8DE] transition-colors">
                    📸 Upload Profile Photo
                  </label>
                  {selectedPhotoFile && (
                    <p className="mt-2 text-center text-xs text-[#B6A799]">Selected: {selectedPhotoFile.name}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <button onClick={prevStep} style={{ color: '#2D2A27' }} className="inline-flex items-center gap-2 font-bold opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none">
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={nextStep}
                  style={{ backgroundColor: '#B55D3B', color: '#FFFFFF' }}
                  className="font-bold rounded-2xl h-14 px-10 inline-flex items-center justify-center gap-2 shadow-lg transition-all"
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
                <div className="w-12 h-12 bg-[#B55D3B] rounded-2xl flex items-center justify-center text-white">
                  <Heart size={24} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${branding.charcoal}`}>Initial Wellness</h2>
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
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none pl-12 focus:ring-2 ring-[#B55D3B]/20"
                      value={formData.weight}
                      onChange={e => setFormData({...formData, weight: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#B6A799]/20">
                  <div className="flex items-center gap-2">
                    <Stethoscope size={20} className="text-[#B55D3B]" />
                    <h3 className={`font-bold ${branding.charcoal}`}>Veterinarian Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label"><span className={`label-text font-bold text-xs ${branding.taupe}`}>Vet Name</span></label>
                      <input 
                        type="text" 
                        placeholder="Dr. Paws..." 
                        className="input input-bordered w-full rounded-xl h-12 bg-[#F4F0EA] border-none px-3"
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
                          className="input input-bordered w-full rounded-xl h-12 bg-[#F4F0EA] border-none pl-10"
                          value={formData.vetContact}
                          onChange={e => setFormData({...formData, vetContact: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <button onClick={prevStep} style={{ color: '#2D2A27' }} className="inline-flex items-center gap-2 font-bold opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none">
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  style={{ backgroundColor: '#B55D3B', color: '#FFFFFF' }}
                  className="font-bold rounded-2xl h-14 px-10 inline-flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  {loading ? (
                    <span className="loading loading-spinner h-5 w-5"></span>
                  ) : (
                    <>Finish & Start Tracking <Sparkles size={20} className="ml-1" /></>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center space-y-8 py-10 animate-in zoom-in duration-700">
              <div className="flex justify-center relative">
                <div className="w-32 h-32 bg-[#7A7A59] rounded-full flex items-center justify-center text-white shadow-2xl relative z-10">
                  <Check size={64} />
                </div>
                <div className="absolute inset-0 scale-150 opacity-20 animate-ping">
                   <div className="w-32 h-32 bg-[#7A7A59] rounded-full mx-auto" />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className={`text-4xl font-black ${branding.charcoal}`}>All Set! 🐶</h1>
                <p className={`text-xl ${branding.taupe} max-w-md mx-auto leading-relaxed`}>
                  {formData.name}'s profile is ready. You're all set to start tracking wellness, preserving memories, and planning adventures.
                </p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                style={{ backgroundColor: '#B55D3B', color: '#FFFFFF' }}
                className="font-bold text-lg rounded-2xl h-14 px-12 inline-flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-105 active:scale-95 mt-4"
              >
                Start Tracking
              </button>
            </div>
          )}
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default OnboardingWizard;