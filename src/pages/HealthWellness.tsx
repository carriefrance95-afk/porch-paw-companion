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
  Sparkles,
  X,
  Save,
  Paperclip,
  Camera
} from 'lucide-react';

const Wellness: React.FC = () => {
  const { profiles } = usePets();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Modal tracking states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(''); 
  
  // Form input states
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [attachedDoc, setAttachedDoc] = useState<string>(''); // Base64 document cache
  const [attachedDocName, setAttachedDocName] = useState<string>('');

  const activeProfile = profiles[0] || {
    name: "Stitch",
    breed: "Frenchie",
    currentWeight: 58,
    photoUrl: ""
  };

  const openAddModal = (category: string) => {
    setModalCategory(category);
    setFormTitle('');
    setFormDate('');
    setFormNotes('');
    setAttachedDoc('');
    setAttachedDocName('');
    setIsModalOpen(true);
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedDocName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachedDoc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully added new ${modalCategory} entry with records for ${activeProfile.name}!`);
    setIsModalOpen(false);
  };

  const getCategoryHeader = () => {
    switch(modalCategory) {
      case 'vaccine': return 'Add new vaccination record';
      case 'medication': return 'Log active medication';
      case 'visit': return 'Record clinical vet visit';
      case 'allergy': return 'Log profile allergy or sensitivity';
      case 'surgery': return 'Archive surgical procedure';
      default: return 'Log wellness update';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-left bg-[#FDFBF7] relative">
      
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
              <button onClick={() => openAddModal('vaccine')} className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
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
              <button onClick={() => openAddModal('medication')} className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
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
              <button onClick={() => openAddModal('visit')} className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
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
              <button onClick={() => openAddModal('allergy')} className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
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
              <button onClick={() => openAddModal('surgery')} className="w-8 h-8 rounded-full border border-brandTaupe/30 flex items-center justify-center text-neutral/50 group-hover:border-[#B55D3B] group-hover:text-[#B55D3B] group-hover:bg-[#B55D3B]/5 transition-all font-bold">+</button>
            </div>
            <p className="text-xs font-medium text-neutral/40 my-6 text-center italic">No historic operational log entries or complex rehabilitation timelines archived.</p>
          </div>
        </div>

        {/* Right Content Panel: Rebranded Health Tips Block */}
        <div className="bg-[#F5EEDC] border border-brandTaupe/20 shadow-sm rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[360px] group">
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
          
          {/* Dual Action Stack */}
          <div className="mt-6 space-y-3 relative z-10">
            <button 
              onClick={() => alert(`Generating printable PDF document for ${activeProfile.name}...`)}
              className="btn w-full rounded-2xl bg-[#B55D3B] text-white hover:bg-[#9E5033] shadow-md font-bold py-3 h-auto min-h-0 border-none transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FileText size={16} />
              Download PDF Report
            </button>
            
            <button 
              onClick={() => alert(`Sending complete wellness summary email to your inbox...`)}
              className="btn w-full rounded-2xl bg-white border border-brandTaupe/40 text-[#2D2A27] hover:bg-brandChocolate/5 shadow-sm font-bold py-3 h-auto min-h-0 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span className="text-lg leading-none">📩</span>
              Email Report to Inbox
            </button>
          </div>

          <div className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
        </div>
      </div>

      {/* Slide-Up Overlay Pop-up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2D2A27]/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] border border-brandTaupe/40 w-full max-w-lg p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 w-8 h-8 rounded-full bg-[#FDFBF7] border border-brandTaupe/30 flex items-center justify-center text-[#2D2A27] hover:bg-brandChocolate/5 transition-all"
            >
              <X size={16} />
            </button>

            <h3 className="text-2xl font-bold font-serif text-brandCharcoal mb-1 pr-6">{getCategoryHeader()}</h3>
            <p className="text-xs text-neutral/50 mb-6">Updating medical metadata logs for {activeProfile.name}.</p>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-brandCharcoal/70 mb-2 uppercase tracking-wide">Record / Title name</label>
                <input 
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="input w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm"
                  placeholder="e.g., Rabies Booster, Apoquel, Annual Checkup"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brandCharcoal/70 mb-2 uppercase tracking-wide">Log date</label>
                  <input 
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="input w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm"
                    required
                  />
                </div>
                
                {/* Dynamic Camera & File Document Slot */}
                <div>
                  <label className="block text-xs font-bold text-brandCharcoal/70 mb-2 uppercase tracking-wide">Clinic receipt / Document</label>
                  <div className="relative flex items-center h-[38px]">
                    {attachedDoc ? (
                      <div className="flex items-center justify-between w-full bg-[#A2A795]/10 border border-dashed border-[#A2A795] text-xs px-3 py-1.5 rounded-xl h-full overflow-hidden">
                        <span className="truncate text-brandCharcoal font-medium max-w-[130px]">📎 {attachedDocName}</span>
                        <button type="button" onClick={() => { setAttachedDoc(''); setAttachedDocName(''); }} className="text-[#B55D3B] font-bold hover:underline">Clear</button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-1.5 w-full bg-[#FDFBF7] border border-dashed border-brandTaupe/50 hover:border-[#B55D3B] rounded-xl h-full cursor-pointer transition-colors text-xs font-bold text-[#B55D3B]">
                        <Camera size={14} />
                        Snap or upload file
                        <input 
                          type="file" 
                          accept="image/*,application/pdf" 
                          capture="environment" 
                          onChange={handleDocUpload} 
                          className="hidden" 
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brandCharcoal/70 mb-2 uppercase tracking-wide">Additional clinical notes</label>
                <textarea 
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="textarea w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm min-h-[80px] pt-3"
                  placeholder="Dosage details, treating veterinarian info, or next renewal intervals..."
                />
              </div>

              <div className="pt-4 border-t border-brandTaupe/20 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm px-5 rounded-xl bg-[#E6E1DA] text-brandCharcoal border-none hover:bg-[#DCD7CE] font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-sm bg-[#B55D3B] text-white border-none hover:bg-brandCharcoal px-5 rounded-xl font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save size={14} />
                  Save entry
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Wellness;