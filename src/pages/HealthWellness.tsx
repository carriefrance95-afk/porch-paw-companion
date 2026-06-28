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
  Activity,
  Sparkles
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
    <div className="p-6 max-w-6xl mx-auto text-left bg-[#FDFBF7]">
      
      {/* Header Profile Summary Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-brandTaupe/20 pb-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full ring-2 ring-[#B55D3B] ring-offset-2 overflow-hidden bg-[#E6E1DA] flex items-center justify-center shadow-sm">
            {activeProfile.photoUrl ? (
              <img src={activeProfile.photoUrl} alt={activeProfile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-[#A2A795] font-serif">{activeProfile.name[0]}</span>
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#2D2A27] font-serif">{activeProfile.name}'s Wellness</h1>
            <p className="text-sm opacity-70 mt-1 font-medium">{activeProfile.breed} • {activeProfile.currentWeight} lb</p>
          </div>
        </div>
        
        {/* Top Control Actions */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="btn btn-sm rounded-full bg-white border-brandTaupe/40 text-[#2D2A27] hover:bg-brandChocolate/5 hover:border-brandTaupe/60 shadow-sm px-5 py-2.5 h-auto min-h-0 gap-2 font-bold transition-all text-xs">
            <FileText size={14} className="text-[#A2A795]" />
            Wellness Report
          </button>
          <button className="btn btn-sm rounded-full bg-[#2D2A27] border-[#2D2A27] text-white hover:bg-[#1C1A18] shadow-sm px-5 py-2.5 h-auto min-h-0 gap-2 font-bold transition-all text-xs">
            Switch Profile
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Tab Selector Segment */}
      <div className="flex border-b border-brandTaupe/20 gap-4 mb-8">
        {['overview', 'history', 'weight'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-bold text-sm capitalize border-b-2 transition-all relative ${
              activeTab === tab 
                ? 'border-[#B55D3B] text-[#B55D3B]' 
                : 'border-transparent text-[#B6A799] hover:text-[#2D2A27]'
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
          <div className="bg-white border border-brandTaupe/30 hover:border-brandTerracotta/30 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[190px] transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A2A795]/10 flex items-center justify-center">
                  <Syringe size={20} className="text-[#A2A795]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Vaccinations</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
            </div>
            <p className="text-xs font-medium text-neutral/40 my-6 text-center italic">No preventative booster or core immunization records found.</p>
          </div>

          {/* Medications Card */}
          <div className="bg-white border border-brandTaupe/30 hover:border-brandTerracotta/30 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[190px] transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A2A795]/10 flex items-center justify-center">
                  <Pill size={20} className="text-[#A2A795]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Medications</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
            </div>
            <p className="text-xs font-medium text-neutral/40 my-6 text-center italic">No prescription histories, supplements, or active medications logged.</p>
          </div>

          {/* Vet Visits Card */}
          <div className="bg-white border border-brandTaupe/30 hover:border-brandTerracotta/30 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[190px] transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A2A795]/10 flex items-center justify-center">
                  <Stethoscope size={20} className="text-[#A2A795]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Vet Visits</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
            </div>
            <p className="text-xs font-medium text-neutral/40 my-6 text-center italic">No clinical checkups or specialized vet visits registered.</p>
          </div>

          {/* Allergies Card */}
          <div className="bg-white border border-brandTaupe/30 hover:border-brandTerracotta/30 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[190px] transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B55D3B]/10 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-[#B55D3B]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Allergies</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
            </div>
            <p className="text-xs font-medium text-neutral/40 my-6 text-center italic">Clear medical profile. No food, environmental, or medical sensitivities reported.</p>
          </div>

          {/* Surgeries Card */}
          <div className="bg-white border border-brandTaupe/30 hover:border-brandTerracotta/30 shadow-sm rounded-[2rem] p-6 flex flex-col justify-between min-h-[190px] md:col-span-2 lg:col-span-2 transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A2A795]/10 flex items-center justify-center">
                  <Activity size={20} className="text-[#A2A795]" />
                </div>
                <h3 className="font-bold text-xl text-[#2D2A27] font-serif">Surgeries & Procedures</h3>
              </div>
              <button className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
            </div>
            <p className="text-xs font-medium text-neutral/40 my-6 text-center italic">No historic operational log entries or complex rehabilitation timelines archived.</p>
          </div>

        </div>

        {/* Right Content Panel: Rebranded Health Tips Block */}
        <div className="bg-[#F5EEDC] border border-brandTaupe/20 shadow-sm rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[320px] group">
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-[#A2A795] uppercase bg-white/60 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles size={12} className="text-[#B55D3B]" /> Health tip
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#2D2A27] font-serif mt-5 mb-3">Keep digital records</h3>
            <p className="text-[#2D2A27]/80 text-sm leading-relaxed font-medium">
              Snap photos of paper clinical receipts and vaccine booklets directly into your portal profiles. Having immediate digital references ready makes critical emergency vet updates much faster.
            </p>
          </div>
          
          {/* Action Trigger Button */}
          <button className="btn w-full rounded-2xl bg-[#B55D3B] border-[#B55D3B] text-white hover:bg-[#9E5033] shadow-md font-bold mt-8 relative z-10 py-3.5 h-auto min-h-0 border-none transition-all">
            Generate Report
          </button>

          {/* Abstract background accent */}
          <div className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
        </div>

      </div>
    </div>
  );
};

export default Wellness;