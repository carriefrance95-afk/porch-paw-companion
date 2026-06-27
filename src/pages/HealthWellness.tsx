import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { 
  Plus, 
  FileText, 
  ChevronDown, 
  Syringe, 
  Pill, 
  Stethoscope, 
  AlertTriangle, 
  Activity 
} from 'lucide-react';

const Wellness: React.FC = () => {
  const { profiles } = usePets();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Grab the active dog profile (defaulting to the first profile if available)
  const activeProfile = profiles[0] || {
    name: "Stitch",
    breed: "Frenchie",
    currentWeight: 58,
    photoUrl: ""
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-left">
      {/* Header Profile Summary Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full ring-2 ring-[#B55D3B] ring-offset-2 overflow-hidden bg-[#E6E1DA] flex items-center justify-center">
            {activeProfile.photoUrl ? (
              <img src={activeProfile.photoUrl} alt={activeProfile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-[#A2A795] font-serif">{activeProfile.name[0]}</span>
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#2D2A27] font-serif">{activeProfile.name}'s Wellness</h1>
            <p className="text-sm opacity-70 mt-0.5 font-medium">{activeProfile.breed} • {activeProfile.currentWeight} lb</p>
          </div>
        </div>
        
        {/* Top Control Actions: No more purples */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="btn btn-sm rounded-full bg-white border-brandTaupe/40 text-[#2D2A27] hover:bg-neutral-50 shadow-sm px-4 py-2 h-auto min-h-0 gap-2 font-bold">
            <FileText size={16} className="text-[#A2A795]" />
            Wellness Report
          </button>
          <button className="btn btn-sm rounded-full bg-[#2D2A27] border-[#2D2A27] text-white hover:bg-[#3D2A1C] shadow-sm px-4 py-2 h-auto min-h-0 gap-2 font-bold">
            Switch Profile
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Tab Selector Segment */}
      <div className="flex border-b border-brandTaupe/20 gap-2 mb-8">
        {['overview', 'history', 'weight'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-bold text-sm capitalize border-b-2 transition-all ${
              activeTab === tab 
                ? 'border-[#B55D3B] text-[#B55D3B]' 
                : 'border-transparent opacity-50 hover:opacity-80 text-[#2D2A27]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle Content: Wellness Tracking Categories */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Vaccinations Card */}
          <div className="bg-white border border-brandTaupe/20 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[180px]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A2A795]/10 flex items-center justify-center">
                  <Syringe size={20} className="text-[#A2A795]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Vaccinations</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/70 hover:border-[#B55D3B] hover:text-[#B55D3B] transition-colors font-bold">+</button>
            </div>
            <p className="text-sm opacity-50 my-6 text-center">No vaccine records found.</p>
          </div>

          {/* Medications Card */}
          <div className="bg-white border border-brandTaupe/20 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[180px]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A2A795]/10 flex items-center justify-center">
                  <Pill size={20} className="text-[#A2A795]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Medications</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/70 hover:border-[#B55D3B] hover:text-[#B55D3B] transition-colors font-bold">+</button>
            </div>
            <p className="text-sm opacity-50 my-6 text-center">No current medications.</p>
          </div>

          {/* Vet Visits Card */}
          <div className="bg-white border border-brandTaupe/20 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[180px]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A2A795]/10 flex items-center justify-center">
                  <Stethoscope size={20} className="text-[#A2A795]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Vet Visits</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/70 hover:border-[#B55D3B] hover:text-[#B55D3B] transition-colors font-bold">+</button>
            </div>
            <p className="text-sm opacity-50 my-6 text-center">No vet visits logged.</p>
          </div>

          {/* Allergies Card */}
          <div className="bg-white border border-brandTaupe/20 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[180px]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B55D3B]/10 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-[#B55D3B]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Allergies</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/70 hover:border-[#B55D3B] hover:text-[#B55D3B] transition-colors font-bold">+</button>
            </div>
            <p className="text-sm opacity-50 my-6 text-center">No known allergies.</p>
          </div>

          {/* Surgeries Card */}
          <div className="bg-white border border-brandTaupe/20 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[180px] md:col-span-2 lg:col-span-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A2A795]/10 flex items-center justify-center">
                  <Activity size={20} className="text-[#A2A795]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Surgeries</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/70 hover:border-[#B55D3B] hover:text-[#B55D3B] transition-colors font-bold">+</button>
            </div>
            <p className="text-sm opacity-50 my-6 text-center">No surgery records.</p>
          </div>

        </div>

        {/* Right Content Panel: Rebranded Health Tips Block */}
        <div className="bg-[#FDFBF7] border border-brandTaupe/30 shadow-md rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
          <div className="relative z-10">
            <span className="text-xs font-bold tracking-wider text-[#A2A795] uppercase bg-[#A2A795]/10 px-3 py-1 rounded-full">Pro Tip</span>
            <h3 className="text-2xl font-bold text-[#2D2A27] font-serif mt-4 mb-3">Health Tip</h3>
            <p className="text-[#2D2A27]/80 text-sm leading-relaxed font-medium">
              Keep a digital copy of all medical records. It makes emergency vet visits much smoother!
            </p>
          </div>
          
          {/* Action Trigger Button: Using your beautiful crisp Terracotta accent */}
          <button className="btn w-full rounded-2xl bg-[#B55D3B] border-[#B55D3B] text-white hover:bg-[#9E5033] shadow-md font-bold mt-8 relative z-10 py-3 h-auto min-h-0">
            Generate Report
          </button>

          {/* Abstract stylized background accent element instead of medical outline icons */}
          <div className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-[#E6E1DA]/30 pointer-events-none" />
        </div>

      </div>
    </div>
  );
};

export default Wellness;