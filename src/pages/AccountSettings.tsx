import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Camera, Save, CreditCard } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const [ownerName, setOwnerName] = useState('Pet Parent');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [ownerAvatar, setOwnerAvatar] = useState('');
  const [planTier, setPlanTier] = useState('Premium'); 
  const [isSaving, setIsSaving] = useState(false);

  // Load baseline profile preferences on mount
  useEffect(() => {
    const savedName = localStorage.getItem('owner_name');
    const savedPhone = localStorage.getItem('owner_phone');
    const savedAddress = localStorage.getItem('owner_address');
    const savedPhoto = localStorage.getItem('dashboard_user_photo');
    
    if (savedName) setOwnerName(savedName);
    if (savedPhone) setOwnerPhone(savedPhone);
    if (savedAddress) setOwnerAddress(savedAddress);
    if (savedPhoto) setOwnerAvatar(savedPhoto);
  }, []);

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setOwnerAvatar(base64String);
      localStorage.setItem('dashboard_user_photo', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveData = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    localStorage.setItem('owner_name', ownerName);
    localStorage.setItem('owner_phone', ownerPhone);
    localStorage.setItem('owner_address', ownerAddress);

    // GHL integration connection checkpoint
    setTimeout(() => {
      setIsSaving(false);
      alert('Account updates successfully saved!');
    }, 800);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#FDFBF7] text-left">
      <div className="mb-8 border-b border-brandTaupe/20 pb-4">
        <h1 className="text-3xl font-bold text-brandCharcoal font-serif">Account settings</h1>
        <p className="opacity-70 text-sm mt-1">Manage your pet parent credentials, contact parameters, and subscription plan tiers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Avatar Panel */}
        <div className="bg-white p-6 rounded-[2rem] border border-brandTaupe/30 flex flex-col items-center text-center shadow-sm h-fit">
          <div className="relative group w-32 h-32 rounded-full ring-4 ring-[#B55D3B] ring-offset-4 bg-[#E6E1DA] flex items-center justify-center overflow-hidden mb-4">
            {ownerAvatar ? (
              <img src={ownerAvatar} alt="Owner Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-[#A2A795]" />
            )}
            <input type="file" accept="image/*" id="owner-avatar-input" className="hidden" onChange={handleAvatarFile} />
          </div>
          
          <label htmlFor="owner-avatar-input" className="btn btn-sm px-4 rounded-xl bg-[#A2A795] text-white border-[#A2A795] hover:bg-[#8F9483] font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all mb-2">
            <Camera size={14} />
            Upload picture
          </label>
          <p className="text-[11px] text-neutral/50 leading-relaxed px-4">Upload a custom square profile icon matching your dashboard display window setup.</p>
          
          <div className="w-full border-t border-brandTaupe/20 my-5 pt-4">
            <div className="flex items-center justify-between px-2 text-xs">
              <span className="font-bold opacity-60 flex items-center gap-1"><CreditCard size={14} /> Tier level:</span>
              <span className="badge font-bold bg-[#B55D3B]/10 text-[#B55D3B] border-none px-3 py-1 rounded-full">{planTier} plan</span>
            </div>
          </div>
        </div>

        {/* Input Fields Panel */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-brandTaupe/30 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-brandCharcoal mb-6">Owner metadata details</h3>
          
          <form onSubmit={handleSaveData} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-brandCharcoal/70 mb-2 uppercase tracking-wide">Primary name</label>
              <div className="relative flex items-center">
                <User size={18} className="absolute left-4 text-[#A2A795]" />
                <input 
                  type="text" 
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="input pl-11 w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brandCharcoal/70 mb-2 uppercase tracking-wide">Contact phone number</label>
              <div className="relative flex items-center">
                <Phone size={18} className="absolute left-4 text-[#A2A795]" />
                <input 
                  type="tel" 
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="input pl-11 w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm"
                  placeholder="(555) 000-0000"
                />
              </div>
              <p className="text-[11px] opacity-50 mt-1 pl-1">Essential synchronization anchor for validation loops on the Emergency Hub card arrays.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-brandCharcoal/70 mb-2 uppercase tracking-wide">Mailing address</label>
              <div className="relative flex items-start">
                <MapPin size={18} className="absolute left-4 top-3.5 text-[#A2A795]" />
                <textarea 
                  value={ownerAddress}
                  onChange={(e) => setOwnerAddress(e.target.value)}
                  className="textarea pl-11 w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm min-h-[80px] pt-3"
                  placeholder="Street address, City, State, ZIP code"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-brandTaupe/20 flex justify-end">
              <button 
                type="submit" 
                disabled={isSaving}
                className="btn bg-[#B55D3B] text-white border-[#B55D3B] hover:bg-brandCharcoal hover:border-brandCharcoal px-6 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Save size={16} />
                {isSaving ? 'Updating system...' : 'Save credentials'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;