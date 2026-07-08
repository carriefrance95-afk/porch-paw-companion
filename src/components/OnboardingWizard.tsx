import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { supabase } from '../utils/supabaseClient';
import {
  PawPrint, Camera, Heart, Activity,
  ChevronRight, ChevronLeft, Check,
  User, Sparkles, Stethoscope, Mail, Phone, MapPin, Shield
} from 'lucide-react';

const OnboardingWizard: React.FC = () => {
  const { addProfile, addWeightEntry, addDirectoryEntry, setPlan } = usePets();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [selectedOwnerPhotoFile, setSelectedOwnerPhotoFile] = useState<File | null>(null);

  const [ownerData, setOwnerData] = useState({
    name: '',
    phone: '',
    address: '',
    emergencyContact: '',
    photo: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    birthDate: '',
    photoUrl: '',
    weight: '',
    vetName: '',
    vetContact: '',
    allergies: '',
    medications: '',
    microchipId: '',
    insuranceProvider: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleOwnerPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedOwnerPhotoFile(file);
    const localPreviewUrl = URL.createObjectURL(file);
    setOwnerData({ ...ownerData, photo: localPreviewUrl });
  };

  const handleDogPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPhotoFile(file);
    const localPreviewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, photoUrl: localPreviewUrl });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const { data: { session } }: any = await supabase.auth.getSession();

    if (!session?.user?.id) {
      setLoading(false);
      alert('Your session expired. Please sign in again.');
      return;
    }

    const selectedPlan = localStorage.getItem('pending_selected_plan') || 'Premium';
    setPlan(selectedPlan as any);
    localStorage.setItem(`selected_plan_${session.user.id}`, selectedPlan);

    localStorage.setItem(`owner_profile_${session.user.id}`, JSON.stringify({
      ...ownerData,
      name: ownerData.name || 'Beta Tester'
    }));

    const dogId = Math.random().toString(36).substr(2, 9);

    addProfile({
      id: dogId,
      name: formData.name,
      breed: formData.breed,
      birthDate: formData.birthDate,
      currentWeight: parseFloat(formData.weight) || 0,
      goalWeight: undefined,
      microchipId: formData.microchipId || undefined,
      insuranceProvider: formData.insuranceProvider || undefined,
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

    localStorage.setItem(`onboarding_complete_${session.user.id}`, 'true');
    window.dispatchEvent(new Event('porchside:onboarding-complete'));

    setLoading(false);
    nextStep();
  };

  const branding = {
    ivory: 'bg-[#F4F0EA]',
    terracotta: 'bg-[#B55D3B]',
    charcoal: 'text-[#2D2A27]',
    taupe: 'text-[#B6A799]',
    taupeLight: 'text-[#B6A799]/80',
    sage: 'bg-[#7A7A59]'
  };

  return (
    <div className={`min-h-screen ${branding.ivory} flex items-center justify-center p-4 font-sans`}>
      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-[#B6A799]/20">
        {step < 5 && (
          <div className="absolute top-0 left-0 w-full h-2 bg-[#B6A799]/20 flex">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`flex-1 transition-all duration-500 ${step >= i ? branding.sage : 'bg-transparent'}`} />
            ))}
          </div>
        )}

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#B55D3B] rounded-2xl flex items-center justify-center text-white">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#7A7A59] font-bold">Step 1</p>
                  <h2 className={`text-3xl font-bold ${branding.charcoal}`}>Your Profile</h2>
                  <p className={branding.taupeLight}>Tell us who is caring for this furry family member.</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-8 border-[#F4F0EA] shadow-xl bg-[#B6A799]/10 flex items-center justify-center">
                  {ownerData.photo ? (
                    <img src={ownerData.photo} alt="Owner preview" className="w-full h-full object-cover" />
                  ) : (
                    <User size={54} className="text-[#B6A799]" />
                  )}
                </div>
                <input type="file" accept="image/*" className="hidden" id="owner-photo-upload" onChange={handleOwnerPhotoUpload} />
                <label htmlFor="owner-photo-upload" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#B55D3B] bg-[#F4F0EA] px-5 py-3 font-bold text-[#2D2A27] hover:bg-[#EFE8DE] transition-colors">
                  📸 Upload Your Photo
                </label>
                {selectedOwnerPhotoFile && <p className="text-xs text-[#B6A799]">Selected: {selectedOwnerPhotoFile.name}</p>}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Carrie"
                    className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none px-4"
                    value={ownerData.name}
                    onChange={e => setOwnerData({ ...ownerData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                      <input
                        type="text"
                        placeholder="Phone number"
                        className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none pl-12"
                        value={ownerData.phone}
                        onChange={e => setOwnerData({ ...ownerData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Emergency Contact</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                      <input
                        type="text"
                        placeholder="Name + phone"
                        className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none pl-12"
                        value={ownerData.emergencyContact}
                        onChange={e => setOwnerData({ ...ownerData, emergencyContact: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                    <input
                      type="text"
                      placeholder="Home address"
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none pl-12"
                      value={ownerData.address}
                      onChange={e => setOwnerData({ ...ownerData, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={nextStep}
                  disabled={!ownerData.name}
                  style={ownerData.name ? { backgroundColor: '#B55D3B', color: '#FFFFFF' } : { backgroundColor: '#B55D3B', color: '#FFFFFF', opacity: 0.4 }}
                  className="font-bold rounded-2xl h-14 px-10 inline-flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  Continue <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#B55D3B] rounded-2xl flex items-center justify-center text-white">
                  <PawPrint size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#7A7A59] font-bold">Step 2</p>
                  <h2 className={`text-3xl font-bold ${branding.charcoal}`}>Dog Profile</h2>
                  <p className={branding.taupeLight}>Tell us the basics about your companion.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Dog's Name</label>
                  <input
                    type="text"
                    placeholder="Buddy, Bella, Max..."
                    className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none px-4"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Breed</label>
                    <input
                      type="text"
                      placeholder="Cocker Spaniel..."
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none px-4"
                      value={formData.breed}
                      onChange={e => setFormData({ ...formData, breed: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Birthday</label>
                    <input
                      type="date"
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none px-4"
                      value={formData.birthDate}
                      onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Current Weight (lbs)</label>
                  <div className="relative">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
                    <input
                      type="number"
                      placeholder="0.0"
                      className="input input-bordered w-full rounded-2xl h-14 bg-[#F4F0EA] border-none pl-12"
                      value={formData.weight}
                      onChange={e => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <button onClick={prevStep} style={{ color: '#2D2A27' }} className="inline-flex items-center gap-2 font-bold opacity-60 hover:opacity-100 bg-transparent border-none">
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

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7A7A59] rounded-2xl flex items-center justify-center text-white">
                  <Camera size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#7A7A59] font-bold">Step 3</p>
                  <h2 className={`text-3xl font-bold ${branding.charcoal}`}>Profile Photo</h2>
                  <p className={branding.taupeLight}>Add a photo to personalize their profile.</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-8 py-4">
                <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-[#F4F0EA] shadow-xl bg-[#B6A799]/10 flex items-center justify-center">
                  {formData.photoUrl ? (
                    <img src={formData.photoUrl} alt="Dog preview" className="w-full h-full object-cover" />
                  ) : (
                    <PawPrint size={80} className="text-[#B6A799]" />
                  )}
                </div>

                <input type="file" accept="image/*" className="hidden" id="dog-photo-upload-onboarding" onChange={handleDogPhotoUpload} />
                <label htmlFor="dog-photo-upload-onboarding" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#B55D3B] bg-[#F4F0EA] px-5 py-4 font-bold text-[#2D2A27] hover:bg-[#EFE8DE] transition-colors">
                  📸 Upload Dog Photo
                </label>
                {selectedPhotoFile && <p className="text-xs text-[#B6A799]">Selected: {selectedPhotoFile.name}</p>}
              </div>

              <div className="flex justify-between items-center pt-6">
                <button onClick={prevStep} style={{ color: '#2D2A27' }} className="inline-flex items-center gap-2 font-bold opacity-60 hover:opacity-100 bg-transparent border-none">
                  <ChevronLeft size={20} /> Back
                </button>
                <button onClick={nextStep} style={{ backgroundColor: '#B55D3B', color: '#FFFFFF' }} className="font-bold rounded-2xl h-14 px-10 inline-flex items-center justify-center gap-2 shadow-lg transition-all">
                  Continue <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#B55D3B] rounded-2xl flex items-center justify-center text-white">
                  <Heart size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#7A7A59] font-bold">Step 4</p>
                  <h2 className={`text-3xl font-bold ${branding.charcoal}`}>Health Basics</h2>
                  <p className={branding.taupeLight}>Start with the most important care details.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Vet Name</label>
                    <input
                      type="text"
                      placeholder="Dr. Smith"
                      className="input input-bordered w-full rounded-xl h-12 bg-[#F4F0EA] border-none px-3"
                      value={formData.vetName}
                      onChange={e => setFormData({ ...formData, vetName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Vet Contact</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                      <input
                        type="text"
                        placeholder="Phone or Email"
                        className="input input-bordered w-full rounded-xl h-12 bg-[#F4F0EA] border-none pl-10"
                        value={formData.vetContact}
                        onChange={e => setFormData({ ...formData, vetContact: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Microchip ID</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    className="input input-bordered w-full rounded-xl h-12 bg-[#F4F0EA] border-none px-3"
                    value={formData.microchipId}
                    onChange={e => setFormData({ ...formData, microchipId: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Allergies</label>
                  <textarea
                    placeholder="Optional"
                    className="textarea textarea-bordered w-full rounded-xl bg-[#F4F0EA] border-none p-3"
                    value={formData.allergies}
                    onChange={e => setFormData({ ...formData, allergies: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Medications</label>
                  <textarea
                    placeholder="Optional"
                    className="textarea textarea-bordered w-full rounded-xl bg-[#F4F0EA] border-none p-3"
                    value={formData.medications}
                    onChange={e => setFormData({ ...formData, medications: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2A27] mb-1">Insurance Provider</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    className="input input-bordered w-full rounded-xl h-12 bg-[#F4F0EA] border-none px-3"
                    value={formData.insuranceProvider}
                    onChange={e => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                <button onClick={prevStep} style={{ color: '#2D2A27' }} className="inline-flex items-center gap-2 font-bold opacity-60 hover:opacity-100 bg-transparent border-none">
                  <ChevronLeft size={20} /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ backgroundColor: '#B55D3B', color: '#FFFFFF' }}
                  className="font-bold rounded-2xl h-14 px-10 inline-flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  {loading ? <span className="loading loading-spinner h-5 w-5"></span> : <>Finish Setup <Sparkles size={20} className="ml-1" /></>}
                </button>
              </div>
            </div>
          )}

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
