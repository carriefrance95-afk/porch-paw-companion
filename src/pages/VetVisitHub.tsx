import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  X, 
  Calendar, 
  Stethoscope, 
  HelpCircle, 
  Camera, 
  Video, 
  FileText, 
  ChevronRight,
  Save,
  User,
  Trash2
} from 'lucide-react';

interface PrepVisit {
  id: string;
  dogName: string;
  date: string;
  purpose: string;
  symptomsCount: number;
  questionsCount: number;
  hasMedia: boolean;
}

const VetVisitHub: React.FC = () => {
  // Page view state: 'hub' = main list/empty state, 'create' = show form
  const [viewMode, setViewMode] = useState<'hub' | 'create'>('hub');
  
  // Empty array by default so it displays your exact empty state image initially!
  const [savedPreps, setSavedPreps] = useState<PrepVisit[]>([]);
  
  // Dynamic form field state arrays
  const [symptoms, setSymptoms] = useState<string[]>(['']);
  const [questions, setQuestions] = useState<string[]>(['']);
  const [purposeInput, setPurposeInput] = useState('');
  const [visitDate, setVisitDate] = useState('2026-06-28');

  const handleAddSymptom = () => setSymptoms([...symptoms, '']);
  const handleSymptomChange = (index: number, value: string) => {
    const updated = [...symptoms];
    updated[index] = value;
    setSymptoms(updated);
  };
  const handleRemoveSymptom = (index: number) => {
    if (symptoms.length > 1) setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleAddQuestion = () => setQuestions([...questions, '']);
  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };
  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Package up the form elements into a saved item card
    const newPrep: PrepVisit = {
      id: Date.now().toString(),
      dogName: 'Stitch',
      date: visitDate,
      purpose: purposeInput || 'General Consultation',
      symptomsCount: symptoms.filter(s => s.trim() !== '').length,
      questionsCount: questions.filter(q => q.trim() !== '').length,
      hasMedia: false
    };

    setSavedPreps([newPrep, ...savedPreps]);
    setViewMode('hub');
    
    // Clear form inputs
    setSymptoms(['']);
    setQuestions(['']);
    setPurposeInput('');
  };

  const handleDeletePrep = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPreps(savedPreps.filter(prep => prep.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-left bg-[#FDFBF7] min-h-screen">
      
      {/* Top Main Heading Row */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2D2A27]/5 flex items-center justify-center text-[#2D2A27]">
            <ClipboardList size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#2D2A27] font-serif">Vet Discussion Hub</h1>
            <p className="text-sm opacity-60 mt-0.5">Prepare questions and summaries for your next vet visit.</p>
          </div>
        </div>
        
        {viewMode === 'hub' && (
          <button 
            onClick={() => setViewMode('create')}
            className="rounded-full bg-[#B55D3B] text-white hover:bg-[#9E5033] shadow-md px-6 py-2.5 flex items-center gap-2 font-bold transition-all text-sm border-none cursor-pointer"
          >
            <Plus size={16} />
            Create New Prep
          </button>
        )}
      </div>

      <hr className="border-brandTaupe/20 my-6" />

      {/* VIEW 1: Main Hub View */}
      {viewMode === 'hub' && (
        <>
          {savedPreps.length === 0 ? (
            /* Empty State Container (Matches image_0a065c.png perfectly now) */
            <div className="bg-white border border-brandTaupe/30 rounded-[2rem] p-16 flex flex-col items-center justify-center text-center shadow-sm min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-[#F5EEDC] flex items-center justify-center mb-4 text-[#B6A799]">
                <ClipboardList size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#2D2A27] font-serif mb-1">No visit preparations yet.</h3>
              <p className="text-sm text-neutral/50 max-w-sm leading-relaxed">
                Click the button above to get ready for your next vet appointment.
              </p>
            </div>
          ) : (
            /* Populated Saved List View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              {savedPreps.map((prep) => (
                <div 
                  key={prep.id}
                  className="bg-white border border-brandTaupe/30 hover:border-brandTerracotta/40 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-all group relative cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold bg-[#7A7A59]/10 text-[#7A7A59] px-3 py-1 rounded-full flex items-center gap-1.5">
                        <User size={12} /> {prep.dogName}
                      </span>
                      <span className="text-xs font-medium text-[#B6A799] flex items-center gap-1">
                        <Calendar size={12} /> {prep.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#2D2A27] font-serif group-hover:text-[#B55D3B] transition-colors pr-8">
                      {prep.purpose}
                    </h3>

                    <div className="flex flex-wrap gap-4 mt-4 text-xs font-medium text-[#2D2A27]/70">
                      <span className="flex items-center gap-1 bg-[#FDFBF7] border border-brandTaupe/20 px-2.5 py-1 rounded-lg">
                        <Stethoscope size={13} className="text-[#A2A795]" /> {prep.symptomsCount} Symptoms
                      </span>
                      <span className="flex items-center gap-1 bg-[#FDFBF7] border border-brandTaupe/20 px-2.5 py-1 rounded-lg">
                        <HelpCircle size={13} className="text-[#A2A795]" /> {prep.questionsCount} Questions
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-brandTaupe/10">
                    <span className="text-xs font-bold text-[#B55D3B] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Open Sheet <ChevronRight size={14} />
                    </span>
                    <button 
                      onClick={(e) => handleDeletePrep(prep.id, e)}
                      className="text-neutral/30 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* VIEW 2: Form Creator Interface */}
      {viewMode === 'create' && (
        <form onSubmit={handleFormSubmit} className="bg-white border border-brandTaupe/30 rounded-[2rem] p-8 shadow-sm space-y-8 animate-in fade-in-50 duration-200">
          
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#2D2A27] font-serif">New Preparation</h2>
            <button 
              type="button" 
              onClick={() => setViewMode('hub')}
              className="px-5 py-2 rounded-xl bg-[#E6E1DA] hover:bg-[#DCD7CE] text-[#2D2A27] font-bold text-xs transition-colors border-none cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#2D2A27]/70 mb-2 uppercase tracking-wide">Select Dog</label>
              <select className="select w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm h-[42px] px-3">
                <option>Stitch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D2A27]/70 mb-2 uppercase tracking-wide">Visit Date</label>
              <input 
                type="date" 
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="input w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm h-[42px] px-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#2D2A27]/70 mb-2 uppercase tracking-wide">Purpose of Visit</label>
              <input 
                type="text"
                value={purposeInput}
                onChange={(e) => setPurposeInput(e.target.value)}
                placeholder="e.g., Annual Checkup, Limping, Allergy check"
                className="input w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm h-[42px] px-3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-brandTaupe/10">
            
            {/* Symptoms Input Group */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#2D2A27] flex items-center gap-2">
                <Stethoscope size={16} className="text-[#7A7A59]" /> Symptoms & Observations
              </label>
              
              {symptoms.map((symptom, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input 
                    type="text"
                    value={symptom}
                    onChange={(e) => handleSymptomChange(idx, e.target.value)}
                    placeholder={`Symptom ${idx + 1}`}
                    className="input flex-1 bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm h-[40px] px-3"
                  />
                  {symptoms.length > 1 && (
                    <button type="button" onClick={() => handleRemoveSymptom(idx)} className="text-neutral/40 hover:text-[#B55D3B] border-none bg-transparent cursor-pointer">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={handleAddSymptom}
                className="text-xs font-bold text-[#B55D3B] hover:text-[#9E5033] flex items-center gap-1 pt-1 bg-transparent border-none cursor-pointer"
              >
                <Plus size={14} /> Add Another Symptom
              </button>
            </div>

            {/* Questions Input Group */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#2D2A27] flex items-center gap-2">
                <HelpCircle size={16} className="text-[#7A7A59]" /> Questions for the Vet
              </label>
              
              {questions.map((question, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input 
                    type="text"
                    value={question}
                    onChange={(e) => handleQuestionChange(idx, e.target.value)}
                    placeholder={`Question ${idx + 1}`}
                    className="input flex-1 bg-[#FDFBF7] border border-brandTaupe/40 rounded-xl focus:outline-none focus:border-[#B55D3B] text-sm h-[40px] px-3"
                  />
                  {questions.length > 1 && (
                    <button type="button" onClick={() => handleRemoveQuestion(idx)} className="text-neutral/40 hover:text-[#B55D3B] border-none bg-transparent cursor-pointer">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={handleAddQuestion}
                className="text-xs font-bold text-[#B55D3B] hover:text-[#9E5033] flex items-center gap-1 pt-1 bg-transparent border-none cursor-pointer"
              >
                <Plus size={14} /> Add Another Question
              </button>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-brandTaupe/10">
            <div className="bg-[#FDFBF7] border border-brandTaupe/30 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-[10px] font-bold tracking-widest text-[#2D2A27]/50 mb-3 uppercase">Photos</span>
              <button type="button" className="w-full bg-white border border-brandTaupe/40 hover:border-[#B55D3B] text-xs font-bold text-[#2D2A27]/70 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                <Camera size={14} className="text-[#7A7A59]" />
                + Add Photo
              </button>
            </div>

            <div className="bg-[#FDFBF7] border border-brandTaupe/30 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-[10px] font-bold tracking-widest text-[#2D2A27]/50 mb-3 uppercase">Videos</span>
              <button type="button" className="w-full bg-white border border-brandTaupe/40 hover:border-[#B55D3B] text-xs font-bold text-[#2D2A27]/70 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                <Video size={14} className="text-[#7A7A59]" />
                + Add Video
              </button>
            </div>

            <div className="bg-[#FDFBF7] border border-brandTaupe/30 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-[10px] font-bold tracking-widest text-[#2D2A27]/50 mb-3 uppercase">Documents</span>
              <button type="button" className="w-full bg-white border border-brandTaupe/40 hover:border-[#B55D3B] text-xs font-bold text-[#2D2A27]/70 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                <FileText size={14} className="text-[#7A7A59]" />
                + Add Document
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-[#2D2A27]/70 uppercase tracking-wide">Visit Notes</label>
            <textarea 
              rows={4}
              placeholder="Add context or details ahead of the visit"
              className="textarea w-full bg-[#FDFBF7] border border-brandTaupe/40 rounded-2xl focus:outline-none focus:border-[#B55D3B] text-sm p-4 min-h-[100px]"
            />
          </div>

          <div className="pt-4 border-t border-brandTaupe/20 flex justify-end">
            <button 
              type="submit"
              className="rounded-full bg-[#B55D3B] text-white hover:bg-[#9E5033] shadow-md px-8 py-3 flex items-center gap-2 font-bold transition-all text-sm border-none cursor-pointer"
            >
              <Save size={16} />
              Save Preparation
            </button>
          </div>

        </form>
      )}

    </div>
  );
};

export default VetVisitHub;