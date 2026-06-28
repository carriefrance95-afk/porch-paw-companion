import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  ClipboardList, 
  File,           
  FileHeart,      
  HelpCircle, 
  Plus, 
  Printer, 
  Download, 
  Phone, 
  Heart, 
  Save, 
  Upload 
} from 'lucide-react';

type SubTab = 'contacts' | 'sitter' | 'lost' | 'packet' | 'resources';

const Emergency: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('contacts');
  
  // Local flyer preview inputs state
  const [lastSeenDate, setLastSeenDate] = useState('2026-06-28');
  const [rewardAmount, setRewardAmount] = useState('$500');
  const [lastSeenLocation, setLastSeenLocation] = useState('Central Park West Entrance');
  const [contactPhone, setContactPhone] = useState('(555) 123-4567');

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen text-left">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[#2D2A27]">
            <ShieldAlert size={26} className="text-[#B55D3B]" />
            <h1 className="text-3xl font-bold font-serif">Emergency Planning Center</h1>
          </div>
          <p className="text-sm text-[#2D2A27]/60 mt-1">Be prepared for the unexpected and ensure your dog's safety.</p>
        </div>
        
        <button className="bg-white border border-[#B6A799]/40 hover:border-[#B55D3B] text-xs font-bold text-[#2D2A27] px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm">
          <Printer size={14} /> Print Full Packet
        </button>
      </div>

      {/* 2. Brand Nav-Tabs Switcher (All Lucide element components now match imports exactly) */}
      <div className="bg-white border border-[#B6A799]/30 rounded-2xl p-1.5 flex flex-wrap gap-1 mb-8 shadow-sm">
        <button onClick={() => setActiveTab('contacts')} className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border-none cursor-pointer transition-all ${activeTab === 'contacts' ? 'bg-[#7A7A59] text-white shadow-sm' : 'text-[#2D2A27]/60 hover:bg-[#FDFBF7]'}`}>
          <Users size={14} /> Contacts
        </button>
        <button onClick={() => setActiveTab('sitter')} className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border-none cursor-pointer transition-all ${activeTab === 'sitter' ? 'bg-[#7A7A59] text-white shadow-sm' : 'text-[#2D2A27]/60 hover:bg-[#FDFBF7]'}`}>
          <ClipboardList size={14} /> Sitter Info
        </button>
        <button onClick={() => setActiveTab('lost')} className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border-none cursor-pointer transition-all ${activeTab === 'lost' ? 'bg-[#7A7A59] text-white shadow-sm' : 'text-[#2D2A27]/60 hover:bg-[#FDFBF7]'}`}>
          <File size={14} /> Lost Flyer
        </button>
        <button onClick={() => setActiveTab('packet')} className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border-none cursor-pointer transition-all ${activeTab === 'packet' ? 'bg-[#7A7A59] text-white shadow-sm' : 'text-[#2D2A27]/60 hover:bg-[#FDFBF7]'}`}>
          <FileHeart size={14} /> Full Packet
        </button>
        <button onClick={() => setActiveTab('resources')} className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border-none cursor-pointer transition-all ${activeTab === 'resources' ? 'bg-[#7A7A59] text-white shadow-sm' : 'text-[#2D2A27]/60 hover:bg-[#FDFBF7]'}`}>
          <HelpCircle size={14} /> Resources
        </button>
      </div>

      {/* 3. Tab Rendering Context */}
      
      {/* TAB A: TRUSTED CONTACTS */}
      {activeTab === 'contacts' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-serif text-[#2D2A27]">Trusted Contacts</h2>
            <button className="bg-[#B55D3B] hover:bg-[#9E5033] text-white font-bold text-xs px-4 py-2 rounded-full border-none flex items-center gap-1.5 cursor-pointer shadow-sm">
              <Plus size={14} /> Add Contact
            </button>
          </div>
          <div className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-16 flex flex-col items-center justify-center text-center shadow-sm min-h-[300px]">
            <p className="text-sm text-[#2D2A27]/50">No emergency contacts added yet.</p>
          </div>
        </div>
      )}

      {/* TAB B: SITTER INFORMATION */}
      {activeTab === 'sitter' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#7A7A59]/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="text-sm font-bold text-[#2D2A27]/80">
              Plan for: <span className="ml-2 bg-[#7A7A59] text-white px-3 py-1 rounded-full text-xs font-bold">Stitch</span>
            </div>
            <button type="button" className="bg-[#B55D3B] hover:bg-[#9E5033] text-white font-bold text-xs px-5 py-2 rounded-xl border-none shadow-sm flex items-center gap-1.5 cursor-pointer">
              <Save size={14} /> Save Changes
            </button>
          </div>

          <div className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-2xl font-bold font-serif text-[#2D2A27] mb-1">Instructions for Stitch</h2>
            <p className="text-xs text-[#2D2A27]/60 mb-6">Details for when someone else is caring for your dog.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#2D2A27] uppercase tracking-wide block">Feeding Schedule & Diet</label>
                <textarea rows={3} placeholder="e.g. 1 cup kibble at 7am and 6pm. Mix with 1 spoon of wet food." className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl p-3 focus:outline-none focus:border-[#B55D3B] text-sm" />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#2D2A27] uppercase tracking-wide block">Behavioral Notes</label>
                <textarea rows={3} placeholder="e.g. Scared of thunder. Loves belly rubs. Do not approach other dogs on walks." className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl p-3 focus:outline-none focus:border-[#B55D3B] text-sm" />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#2D2A27] uppercase tracking-wide block">Medication Guide</label>
                <textarea rows={3} placeholder="e.g. 1 heartworm pill on the 1st of every month." className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl p-3 focus:outline-none focus:border-[#B55D3B] text-sm" />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#2D2A27] uppercase tracking-wide block">Favorite Toys & Routines</label>
                <textarea rows={3} placeholder="e.g. Favorite ball is the blue one. Loves the 3pm walk around the lake." className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl p-3 focus:outline-none focus:border-[#B55D3B] text-sm" />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#2D2A27] uppercase tracking-wide block">Emergency Notes</label>
                <textarea rows={3} placeholder="Critical information: Vet name, hospital location, major health risks." className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl p-3 focus:outline-none focus:border-[#B55D3B] text-sm" />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-[#2D2A27] uppercase tracking-wide block">Walk Routine & Outdoor Safety</label>
                <textarea rows={3} placeholder="e.g. Wakes up at 7am, walks on leash only, avoids busy crosswalks." className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl p-3 focus:outline-none focus:border-[#B55D3B] text-sm" />
              </div>
            </div>

            <div className="mt-6 bg-[#7A7A59]/10 rounded-2xl p-4 text-left flex gap-3 items-start border-none">
              <Info size={18} className="text-[#7A7A59] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#2D2A27]">Tip for Pet Parents</h4>
                <p className="text-xs text-[#2D2A27]/70 leading-relaxed mt-0.5">Keep these instructions updated regularly, especially if your dog's medication or diet changes. You can print this section separately for your sitter!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB C: LOST DOG FLYER BUILDER */}
      {activeTab === 'lost' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-150">
          
          {/* Builder Options Form */}
          <div className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-6 shadow-sm space-y-5">
            <h3 className="text-xl font-bold font-serif text-[#2D2A27]">Flyer Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1">Last Seen Date</label>
                <input type="date" value={lastSeenDate} onChange={(e) => setLastSeenDate(e.target.value)} className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[38px] px-3 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1">Reward</label>
                <input type="text" value={rewardAmount} onChange={(e) => setRewardAmount(e.target.value)} className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[38px] px-3 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1">Last Seen Location</label>
              <input type="text" value={lastSeenLocation} onChange={(e) => setLastSeenLocation(e.target.value)} className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[38px] px-3 focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1">Contact Phone Number</label>
              <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[38px] px-3 focus:outline-none" />
            </div>

            {/* Premium Local Image Picker Segment */}
            <div>
              <label className="block text-xs font-bold text-[#2D2A27]/70 mb-1.5">Flyer Image Selection</label>
              <button type="button" className="w-full bg-[#FDFBF7] hover:bg-[#F5EEDC] border border-dashed border-[#B6A799]/60 rounded-xl py-4 flex flex-col items-center justify-center gap-1 text-[#2D2A27]/60 transition-colors cursor-pointer">
                <Upload size={16} className="text-[#7A7A59]" />
                <span className="text-xs font-bold">Upload Local Photo Asset</span>
                <span className="text-[10px] opacity-70">Supports PNG, JPG up to 5MB</span>
              </button>
            </div>
          </div>

          {/* Premium Visual Flyer Preview Board */}
          <div className="bg-white border-4 border-[#B55D3B] rounded-2xl p-6 shadow-md text-center space-y-4 max-w-md mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#B55D3B] font-serif">LOST DOG</h1>
            
            <div className="w-full h-64 bg-[#E6E1DA] rounded-xl overflow-hidden flex items-center justify-center relative">
              <span className="text-xs text-[#2D2A27]/40 font-medium">Dog Photo Preview Matrix</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-wide text-[#2D2A27] font-serif uppercase">STITCH</h2>
              <p className="text-sm font-bold text-[#7A7A59]">Frenchie • Microchipped</p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#B6A799]/30 rounded-xl p-4 text-left space-y-2">
              <p className="text-xs text-[#2D2A27]"><span className="font-bold text-[#B55D3B]">Last Seen:</span> {lastSeenDate} at {lastSeenLocation}</p>
              <p className="text-xs text-[#2D2A27]"><span className="font-bold text-[#2D2A27]">Contact Info:</span> {contactPhone}</p>
            </div>

            <div className="bg-[#B55D3B] text-white py-3 rounded-xl font-black text-xl tracking-wide shadow-sm">
              REWARD: {rewardAmount}
            </div>
          </div>

        </div>
      )}

      {/* TAB D: EMERGENCY PACKET PREVIEW */}
      {activeTab === 'packet' && (
        <div className="space-y-6 text-center animate-in fade-in duration-150">
          <div>
            <h3 className="text-xl font-bold font-serif text-[#2D2A27]">Emergency Care Packet Preview</h3>
            <p className="text-xs text-[#2D2A27]/60 mt-0.5">This packet includes all vital health records, contacts, and instructions in one place.</p>
          </div>

          <div className="flex justify-center gap-3">
            <button className="bg-[#B55D3B] hover:bg-[#9E5033] text-white font-bold text-xs px-6 py-2.5 rounded-full border-none shadow-sm flex items-center gap-1.5 cursor-pointer">
              <Printer size={14} /> Print Packet Now
            </button>
            <button className="bg-white border border-[#B6A799]/40 hover:border-[#B55D3B] text-[#2D2A27] font-bold text-xs px-6 py-2.5 rounded-full shadow-sm flex items-center gap-1.5 cursor-pointer">
              <Download size={14} /> Download PDF
            </button>
          </div>

          {/* Premium Printed Frame Mockup Sheet */}
          <div className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-8 shadow-sm max-w-2xl mx-auto text-left space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#B6A799]/20">
              <div>
                <h2 className="text-2xl font-black font-serif text-[#2D2A27] tracking-wide">EMERGENCY CARE PACKET</h2>
                <p className="text-sm font-bold text-[#B55D3B] mt-0.5">Essential info for Stitch</p>
              </div>
              <div className="bg-[#B55D3B] text-white text-xs font-black px-4 py-2 rounded-xl tracking-wide uppercase">
                Ready For Action
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#E6E1DA] rounded-2xl h-44 flex items-center justify-center">
                <span className="text-xs text-[#2D2A27]/40">Profile Image</span>
              </div>
              <div className="sm:col-span-2 space-y-4">
                <div className="bg-[#FDFBF7] border border-[#B6A799]/30 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-[#2D2A27] uppercase tracking-wider flex items-center gap-1.5"><Phone size={12} className="text-[#7A7A59]" /> Emergency Contacts</h4>
                  <p className="text-xs text-[#2D2A27]/50 mt-2 italic">No contacts listed.</p>
                </div>
                <div className="bg-[#FDFBF7] border border-[#B6A799]/30 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-[#2D2A27] uppercase tracking-wider flex items-center gap-1.5"><Heart size={12} className="text-[#B55D3B]" /> Recent Vaccinations</h4>
                  <p className="text-xs text-[#2D2A27]/50 mt-2 italic">No vaccine records available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB E: HEALTH RESOURCES */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start animate-in fade-in duration-150">
          
          <div className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-6 shadow-sm text-left">
            <h3 className="text-lg font-bold font-serif text-[#2D2A27] mb-4 flex items-center gap-2">
              <ShieldAlert size={18} className="text-[#B55D3B]" /> Emergency Preparedness Tips
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-lg bg-[#B55D3B]/10 text-[#B55D3B] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">01</span>
                <div>
                  <h4 className="text-sm font-bold text-[#2D2A27]">Emergency Kit</h4>
                  <p className="text-xs text-[#2D2A27]/60 leading-relaxed mt-0.5">Keep a 7-day supply of food, water, and medications in a waterproof container.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-lg bg-[#B55D3B]/10 text-[#B55D3B] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">02</span>
                <div>
                  <h4 className="text-sm font-bold text-[#2D2A27]">ID Tags</h4>
                  <p className="text-xs text-[#2D2A27]/60 leading-relaxed mt-0.5">Ensure your dog's ID tags and microchip info are current with your latest phone number.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-lg bg-[#B55D3B]/10 text-[#B55D3B] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">03</span>
                <div>
                  <h4 className="text-sm font-bold text-[#2D2A27]">First Aid</h4>
                  <p className="text-xs text-[#2D2A27]/60 leading-relaxed mt-0.5">Learn basic pet CPR and have a pet-specific first aid kit at home and in your car.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-lg bg-[#B55D3B]/10 text-[#B55D3B] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">04</span>
                <div>
                  <h4 className="text-sm font-bold text-[#2D2A27]">Documentation</h4>
                  <p className="text-xs text-[#2D2A27]/60 leading-relaxed mt-0.5">Keep digital and physical copies of vaccination records, especially Rabies.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#7A7A59]/10 border border-[#7A7A59]/20 rounded-[2rem] p-6 text-left space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#2D2A27] flex items-center gap-2">
              <Heart size={18} className="text-[#7A7A59]" /> Community & Help
            </h3>
            <div className="space-y-3">
              <div className="bg-white border border-[#B6A799]/20 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-[#2D2A27]">ASPCA Poison Control</h4>
                  <p className="text-xs font-medium text-[#7A7A59] mt-0.5">(888) 426-4435</p>
                </div>
                <a href="tel:8884264435" className="w-9 h-9 rounded-xl bg-[#7A7A59]/10 text-[#7A7A59] hover:bg-[#7A7A59] hover:text-white transition-all flex items-center justify-center"><Phone size={14} /></a>
              </div>
              <div className="bg-white border border-[#B6A799]/20 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-[#2D2A27]">Pet Poison Helpline</h4>
                  <p className="text-xs font-medium text-[#7A7A59] mt-0.5">(855) 764-7661</p>
                </div>
                <a href="tel:8557647661" className="w-9 h-9 rounded-xl bg-[#7A7A59]/10 text-[#7A7A59] hover:bg-[#7A7A59] hover:text-white transition-all flex items-center justify-center"><Phone size={14} /></a>
              </div>
            </div>
            <p className="text-[11px] text-[#2D2A27]/50 text-center leading-relaxed italic">Keep these numbers saved in your phone contacts as well for instant access during a crisis.</p>
          </div>

        </div>
      )}

    </div>
  );
};

const Info: React.FC<{ size?: number; className?: string }> = ({ size = 16, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
);

export default Emergency;