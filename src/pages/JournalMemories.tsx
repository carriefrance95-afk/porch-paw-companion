import React, { useState } from 'react';

// Define strict data shapes for TypeScript compiler
interface JournalEntry {
  id: number;
  date: string;
  mood: string;
  title: string;
  notes: string;
  diet?: string;
  exercise?: string;
}

interface MemoryEntry {
  id: number;
  title: string;
  imagePreview: string;
  date: string;
  album: string;
}

type TimelineEntry = 
  | { id: number; type: 'journal'; date: string; mood: string; title: string; notes: string; image: null; diet: string; exercise: string; }
  | { id: number; type: 'memory'; date: string; title: string; notes: string; image: string; diet?: never; exercise?: never; mood?: never; };

export default function JournalMemories() {
  // Navigation & UI Management
  const [activeTab, setActiveTab] = useState<'journal' | 'book'>('journal'); 
  const [isJournalModalOpen, setIsJournalModalOpen] = useState<boolean>(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState<boolean>(false);

  // Unified Premium Timeline Collection
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([
    {
      id: 1,
      type: 'journal',
      date: '2026-06-29',
      mood: 'Happy 🐾',
      title: 'Morning Porch Snuggles',
      notes: 'Stitch watched the birds from the porch for two hours today. Completely content and peaceful.',
      image: null,
      diet: 'Morning kibble + pumpkin scoop',
      exercise: '30 min backyard fetch'
    }
  ]);

  // Controlled Form Inputs
  const [journalForm, setJournalForm] = useState({
    date: '2026-06-29',
    mood: 'Happy 🐾',
    title: '',
    notes: '',
    diet: '',
    exercise: ''
  });

  const [memoryForm, setMemoryForm] = useState({
    title: '',
    imagePreview: '',
    date: '2026-06-29',
    album: 'None'
  });

  const [openingMessage, setOpeningMessage] = useState<string>(
    "Life is better with a dog by your side. This book is a celebration of every wag, every walk, and every wonderful moment we've shared together."
  );

  // Native Image File Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = typeof window !== 'undefined' && window.URL ? URL.createObjectURL(file) : '';
      setMemoryForm(prev => ({ ...prev, imagePreview: url }));
    }
  };

  const saveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: TimelineEntry = { 
      id: Date.now(), 
      type: 'journal', 
      ...journalForm, 
      image: null 
    };
    setTimelineEntries(prev => [newEntry, ...prev]);
    setIsJournalModalOpen(false);
    setJournalForm({ date: '2026-06-29', mood: 'Happy 🐾', title: '', notes: '', diet: '', exercise: '' });
  };

  const saveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: TimelineEntry = { 
      id: Date.now(), 
      type: 'memory', 
      date: memoryForm.date, 
      title: memoryForm.title, 
      notes: `Saved to album: ${memoryForm.album}`, 
      image: memoryForm.imagePreview 
    };
    setTimelineEntries(prev => [newEntry, ...prev]);
    setIsMemoryModalOpen(false);
    setMemoryForm({ title: '', imagePreview: '', date: '2026-06-29', album: 'None' });
  };

  return (
    <div className="min-h-screen bg-[#F4F0EA] text-[#2D2A27] font-sans relative antialiased">
      
      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto pt-10 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#7A7A59]">
            <span className="text-xl">📘</span>
            <h1 className="text-2xl font-bold tracking-tight">Journal & Memory Vault</h1>
          </div>
          <p className="text-sm text-[#2D2A27]/70 mt-1">Capture every moment and track your dog's journey.</p>
        </div>
        <button 
          type="button"
          onClick={() => activeTab === 'journal' ? setIsJournalModalOpen(true) : setIsMemoryModalOpen(true)}
          className="bg-[#B55D3B] hover:bg-[#B55D3B]/90 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <span>+</span> New Entry
        </button>
      </header>

      {/* FILTER ROW */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="w-full bg-white/50 backdrop-blur border border-[#B6A799]/30 rounded-xl p-2 flex items-center">
          <span className="bg-[#7A7A59] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
            Stitch
          </span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-white border border-[#B6A799]/30 rounded-xl p-1.5 flex justify-between items-center w-full shadow-sm">
          <button type="button" onClick={() => setActiveTab('journal')} className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all ${activeTab === 'journal' ? 'bg-[#F4F0EA] text-[#2D2A27]' : 'text-[#2D2A27]/60 hover:text-[#2D2A27]'}`}>
            <span>📓</span> Daily Journal & Vault
          </button>
          <button type="button" onClick={() => setActiveTab('book')} className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all ${activeTab === 'book' ? 'bg-[#F4F0EA] text-[#2D2A27]' : 'text-[#2D2A27]/60 hover:text-[#2D2A27]'}`}>
            <span>📖</span> Memory Book Creator
          </button>
        </div>
      </nav>

      {/* DISPLAY WORKSPACE */}
      <main className="max-w-7xl mx-auto px-6 mt-6 pb-20">
        
        {/* VIEW 1: HORIZONTAL ROLLING TIMELINE FEED */}
        {activeTab === 'journal' && (
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center border-b border-[#B6A799]/20 pb-2">
              <h2 className="text-lg font-bold text-[#7A7A59]">Chronological Timeline Feed</h2>
              <span className="text-xs font-medium text-[#2D2A27]/50">Swipe or scroll horizontally ➔</span>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-hide snap-x snap-mandatory">
              {timelineEntries.map((entry) => (
                <div 
                  key={entry.id} 
                  className="w-[380px] sm:w-[420px] shrink-0 bg-white rounded-2xl border border-[#B6A799]/20 shadow-sm overflow-hidden flex flex-col justify-between snap-start hover:shadow-md transition-shadow"
                >
                  <div>
                    {entry.image && (
                      <div className="w-full h-48 overflow-hidden bg-black/5 border-b border-[#F4F0EA]">
                        <img src={entry.image} alt={entry.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] font-bold text-[#7A7A59] bg-[#F4F0EA] px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {entry.type === 'journal' ? '📓 Log' : '🖼️ Photo'}
                        </span>
                        <span className="text-xs font-mono font-medium text-[#2D2A27]/60">{entry.date}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold tracking-tight text-[#2D2A27] mb-1">{entry.title || 'Untitled Entry'}</h3>
                      {entry.mood && <span className="text-xs block text-[#B55D3B] font-medium mb-3">{entry.mood}</span>}
                      <p className="text-sm text-[#2D2A27]/80 leading-relaxed whitespace-pre-wrap">{entry.notes}</p>
                    </div>
                  </div>

                  {(entry.diet || entry.exercise) && (
                    <div className="bg-[#F4F0EA]/40 p-4 border-t border-[#B6A799]/10 text-xs space-y-1">
                      {entry.diet && <p className="text-[#2D2A27]/70"><strong>Diet:</strong> {entry.diet}</p>}
                      {entry.exercise && <p className="text-[#2D2A27]/70"><strong>Exercise:</strong> {entry.exercise}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: PREMIUM BOOK EXPORT CANVAS */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-3xl border border-[#B6A799]/20 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 p-8 border-r border-[#B6A799]/20 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="w-10 h-10 bg-[#F4F0EA] rounded-xl flex items-center justify-center text-xl mb-3">📘</div>
                  <h2 className="text-2xl font-bold tracking-tight">Memory Book Creator</h2>
                  <p className="text-sm text-[#2D2A27]/70 mt-1">Design a beautiful, print-ready digital book of your dog's life story.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2A27]/60 mb-2">Select Pet</label>
                  <span className="inline-block bg-[#7A7A59] text-white px-4 py-1.5 rounded-full text-xs font-bold">Stitch</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2A27]/60 mb-3">Choose a Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" className="border-2 border-[#B55D3B] p-4 rounded-xl text-center bg-[#F4F0EA]/30">
                      <div className="w-5 h-5 rounded-full bg-[#F4F0EA] border border-black/10 mx-auto mb-2" />
                      <span className="text-xs font-bold block">Classic Cream</span>
                    </button>
                    <button type="button" className="border border-[#B6A799]/40 p-4 rounded-xl text-center text-[#2D2A27]/60">
                      <div className="w-5 h-5 rounded-full bg-white border border-black/10 mx-auto mb-2" />
                      <span className="text-xs font-bold block">Modern Minimal</span>
                    </button>
                    <button type="button" className="border border-[#B6A799]/40 p-4 rounded-xl text-center text-[#2D2A27]/60">
                      <div className="w-5 h-5 rounded-full bg-blue-50 border border-black/10 mx-auto mb-2" />
                      <span className="text-xs font-bold block">Playful Paws</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2A27]/60 mb-2">Opening Message</label>
                  <textarea rows={3} className="w-full p-3 border border-[#B6A799] rounded-xl text-sm bg-[#F4F0EA]/20 focus:outline-none resize-none" value={openingMessage} onChange={(e) => setOpeningMessage(e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#2D2A27]/60 mb-2">Include Albums</label>
                  <span className="inline-block bg-[#7A7A59] text-white px-4 py-1.5 rounded-full text-xs font-bold">All Photos</span>
                </div>
              </div>

              <div className="mt-8 bg-[#F4F0EA] border border-[#B6A799]/40 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex gap-4">
                  <div className="text-xl pt-0.5">🔒</div>
                  <div>
                    <h4 className="font-bold text-sm">Unlock Full Exports</h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#B55D3B] font-bold block">Premium Feature</span>
                    <p className="text-xs text-[#2D2A27]/70 mt-1.5 leading-relaxed">Memory Book PDF exports are exclusive to Premium members. Capture every milestone in a high-fidelity, printable format.</p>
                    <button type="button" className="mt-3 bg-[#7A7A59] text-white font-bold text-xs px-4 py-2 rounded-xl">Upgrade to Premium</button>
                  </div>
                </div>
              </div>

              <button type="button" className="w-full mt-4 py-3.5 bg-[#B55D3B] text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2">
                Preview Your Book ➔
              </button>
            </div>

            <div className="lg:col-span-6 bg-[#2D2A27]/5 p-8 flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-72 aspect-[3/4] bg-white rounded-r shadow-xl relative p-6 flex flex-col justify-between border-l-4 border-black/10">
                <div className="text-center mt-12">
                  <h2 className="text-2xl font-serif tracking-wide text-[#2D2A27]">Stitch</h2>
                  <div className="w-8 h-0.5 bg-[#B55D3B] mx-auto mt-2" />
                </div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur rounded-r flex flex-col items-center justify-center text-white p-4 text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <h5 className="font-bold text-sm">Preview Restricted</h5>
                  <p className="text-[11px] text-white/80 max-w-[180px] mt-1">Upgrade to Premium to view your full typeset memory book.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: NEW DIARY ENTRY POPUP */}
      {isJournalModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2D2A27]/60 backdrop-blur flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden p-6 relative">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">New Journal Entry</h2>
            <form onSubmit={saveJournal} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Date</label>
                  <input type="date" value={journalForm.date} onChange={e => setJournalForm({ ...journalForm, date: e.target.value })} className="w-full p-2.5 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5">Overall Mood</label>
                  <select value={journalForm.mood} onChange={e => setJournalForm({ ...journalForm, mood: e.target.value })} className="w-full p-2.5 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20 focus:outline-none">
                    <option>Happy 🐾</option>
                    <option>Energetic ⚡</option>
                    <option>Calm 🍃</option>
                    <option>Tired 💤</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5">Entry Title</label>
                <input type="text" placeholder="e.g. Fun day at the dog park" value={journalForm.title} onChange={e => setJournalForm({ ...journalForm, title: e.target.value })} className="w-full p-2.5 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5">Behavior & Daily Notes</label>
                <textarea rows={4} placeholder="Describe the day..." value={journalForm.notes} onChange={e => setJournalForm({ ...journalForm, notes: e.target.value })} className="w-full p-3 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20 focus:outline-none resize-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Diet Notes (Optional)</label>
                  <input type="text" placeholder="e.g. Finished all dinner" value={journalForm.diet} onChange={e => setJournalForm({ ...journalForm, diet: e.target.value })} className="w-full p-2.5 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5">Exercise (Optional)</label>
                  <input type="text" placeholder="e.g. 2 mile trail run" value={journalForm.exercise} onChange={e => setJournalForm({ ...journalForm, exercise: e.target.value })} className="w-full p-2.5 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#B6A799]/20">
                <button type="button" onClick={() => setIsJournalModalOpen(false)} className="px-5 py-2.5 border border-[#B6A799]/60 rounded-xl text-sm font-semibold hover:bg-[#F4F0EA]/40">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#B55D3B] text-white text-sm font-semibold rounded-xl shadow-sm">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: VAULT IMAGE FIELD FORM */}
      {isMemoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2D2A27]/60 backdrop-blur flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden p-6 relative">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Add New Memory</h2>
            <form onSubmit={saveMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">Memory Caption</label>
                <input type="text" placeholder="e.g. Running along the coast line" value={memoryForm.title} onChange={e => setMemoryForm({ ...memoryForm, title: e.target.value })} className="w-full p-2.5 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5">Upload Photo File</label>
                <div className="border-2 border-dashed border-[#B6A799] rounded-xl p-4 bg-[#F4F0EA]/20 flex flex-col items-center justify-center text-center relative hover:bg-[#F4F0EA]/40 transition-colors">
                  {memoryForm.imagePreview ? (
                    <div className="relative w-full">
                      <img src={memoryForm.imagePreview} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
                      <button type="button" onClick={() => setMemoryForm(prev => ({ ...prev, imagePreview: '' }))} className="text-xs text-[#B55D3B] font-bold underline mt-2 block mx-auto">Change Photo</button>
                    </div>
                  ) : (
                    <>
                      <span className="text-2xl mb-1">📷</span>
                      <label className="cursor-pointer text-sm font-bold text-[#7A7A59] underline hover:text-[#B55D3B]">
                        Choose file from device
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="sr-only" required />
                      </label>
                      <p className="text-[10px] text-[#7A7A59]">Max file size: 5MB</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#B6A799]/20">
                <button type="button" onClick={() => setIsMemoryModalOpen(false)} className="px-5 py-2.5 border border-[#B6A799]/60 rounded-xl text-sm font-semibold hover:bg-[#F4F0EA]/40">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-[#B55D3B] text-white text-sm font-semibold rounded-xl shadow-sm">Add Memory</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}