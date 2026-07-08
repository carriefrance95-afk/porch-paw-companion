import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { Book, Download, Lock, Palette, Filter, Calendar, Check, Heart, Camera, Activity, FileText, ChevronRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';

const MemoryBookCreator: React.FC = () => {
  const { profiles, journal, memories, plan, vaccines, medications, surgeries, vetVisits, albums, allergies } = usePets();
  const [selectedDogId, setSelectedDogId] = useState(profiles[0]?.id || '');
  const [theme, setTheme] = useState('classic');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedAlbumIds, setSelectedAlbumIds] = useState<string[]>([]);
  const [ownerMessage, setOwnerMessage] = useState("Life is better with a dog by your side. This book is a celebration of every wag, every walk, and every wonderful moment we've shared together.");
  
  const isPremium = plan === 'Premium';
  const selectedDog = profiles.find(p => p.id === selectedDogId);
  
  // Filtering Logic
  const dogMemories = memories.filter(m => m.dogId === selectedDogId && (selectedAlbumIds.length === 0 || (m.albumId && selectedAlbumIds.includes(m.albumId))));
  const dogJournal = journal.filter(j => j.dogId === selectedDogId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const dogAlbums = albums.filter(a => a.dogId === selectedDogId);
  const dogAllergies = allergies.filter(a => a.dogId === selectedDogId);
  const dogMedications = medications.filter(m => m.dogId === selectedDogId && m.active);

  // Aggregated Milestones
  const dogMilestones = [
    ...vaccines.filter(v => v.dogId === selectedDogId).map(v => ({ date: v.dateAdministered, title: `Vaccination: ${v.vaccineName}`, category: 'Health' })),
    ...surgeries.filter(s => s.dogId === selectedDogId).map(s => ({ date: s.date, title: `Surgery: ${s.procedure}`, category: 'Health' })),
    ...vetVisits.filter(v => v.dogId === selectedDogId).map(v => ({ date: v.date, title: `Vet Visit: ${v.reason}`, category: 'Health' })),
    ...(selectedDog?.gotchaDate ? [{ date: selectedDog.gotchaDate, title: 'Gotcha Day! ❤️', category: 'Milestone' }] : []),
    ...(selectedDog?.birthDate ? [{ date: selectedDog.birthDate, title: 'Birthday 🎂', category: 'Milestone' }] : []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const themes = [
    { 
      id: 'classic', 
      name: 'Classic Cream', 
      color: 'bg-[#FDFCF0]', 
      font: 'font-serif',
      accent: 'border-primary/20',
      text: 'text-gray-800',
      primary: 'text-primary'
    },
    { 
      id: 'modern', 
      name: 'Modern Minimal', 
      color: 'bg-white', 
      font: 'font-sans',
      accent: 'border-gray-200',
      text: 'text-gray-900',
      primary: 'text-black'
    },
    { 
      id: 'playful', 
      name: 'Playful Paws', 
      color: 'bg-primary/5', 
      font: 'font-sans',
      accent: 'border-secondary/20',
      text: 'text-gray-700',
      primary: 'text-secondary'
    },
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  const toggleAlbum = (id: string) => {
    setSelectedAlbumIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Helper to chunk memories for pages
  const memoryChunks: Array<typeof dogMemories> = [];
  for (let i = 0; i < dogMemories.length; i += 4) {
    memoryChunks.push(dogMemories.slice(i, i + 4));
  }

  if (showPreview) {
    return (
      <div className="fixed inset-0 z-50 bg-base-300 overflow-y-auto p-4 md:p-10 print:p-0 print:bg-white print:overflow-visible">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page { size: 8.5in 11in; margin: 0; }
            body { -webkit-print-color-adjust: exact; }
            .print-hidden { display: none !important; }
            .page-break { page-break-after: always; height: 0; }
            .book-page { 
              width: 8.5in !important; 
              height: 11in !important; 
              margin: 0 !important; 
              border: none !important; 
              border-radius: 0 !important;
              box-shadow: none !important;
              padding: 1in !important;
              position: relative;
            }
          }
        `}} />

        <div className="max-w-4xl mx-auto space-y-10 print:space-y-0 print:max-w-none">
          <div className="flex justify-between items-center print-hidden">
            <button onClick={() => setShowPreview(false)} className="btn btn-ghost bg-base-100 rounded-xl shadow-sm">
              <ChevronLeft size={20} /> Back to Editor
            </button>
            <div className="flex gap-3">
               {!isPremium && (
                 <div className="badge badge-warning p-4 gap-2 font-bold shadow-sm">
                   <Lock size={14} /> Preview Only
                 </div>
               )}
               <button 
                 onClick={() => isPremium ? window.print() : null} 
                 className={`btn rounded-xl gap-2 shadow-lg transition-transform active:scale-95 ${isPremium ? 'btn-primary' : 'btn-disabled opacity-50'}`}
                 disabled={!isPremium}
               >
                 {isPremium ? <Download size={20} /> : <Lock size={20} />}
                 {isPremium ? 'Download Print-Ready PDF' : 'Upgrade to Export'}
               </button>
            </div>
          </div>

          <div className={`book-container shadow-2xl print:shadow-none space-y-0 ${currentTheme.color} ${currentTheme.font} ${currentTheme.text}`}>
            
            {/* Page 1: Cover Page */}
            <div className="book-page min-h-[11in] flex flex-col items-center justify-center text-center space-y-10 p-16 relative overflow-hidden border border-base-200 bg-opacity-50">
              {theme === 'classic' && <div className="absolute inset-8 border-4 border-double border-primary/10 pointer-events-none" />}
              {theme === 'playful' && <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, currentColor 2px, transparent 2px)', backgroundSize: '30px 30px'}} />}
              
              <div className="space-y-4 relative z-10">
                <h1 className={`text-7xl font-bold ${currentTheme.primary} leading-tight`}>{selectedDog?.name}</h1>
                <p className="text-2xl italic opacity-60">My Life, My Story, My Paws</p>
              </div>

              <div className="relative z-10">
                <div className="w-80 h-80 rounded-full overflow-hidden border-[12px] border-white shadow-2xl relative">
                  <img src={selectedDog?.photoUrl || 'https://images.unsplash.com/photo-1543466835-00a732f3804c'} alt="" className="w-full h-full object-cover" />
                </div>
                {theme === 'playful' && <div className="absolute -bottom-4 -right-4 bg-secondary text-white p-4 rounded-full shadow-lg rotate-12 font-bold">Good Boy!</div>}
              </div>

              <div className="pt-12 space-y-2 relative z-10">
                <p className="uppercase tracking-[0.4em] text-sm font-black opacity-40">A Memory Book by Porch & Paw</p>
                <p className="text-xs opacity-30 font-sans">{new Date().getFullYear()}</p>
              </div>
            </div>

            <div className="page-break"></div>

            {/* Page 2: Introduction */}
            <div className="book-page min-h-[11in] flex flex-col justify-center p-20 space-y-12 relative border-t border-base-100">
               <div className="max-w-2xl mx-auto text-center space-y-8">
                  <Heart className={`${currentTheme.primary} mx-auto opacity-20`} size={48} />
                  <h2 className="text-4xl font-bold">A Note from Home</h2>
                  <p className="text-xl leading-relaxed italic opacity-80">
                    "{ownerMessage}"
                  </p>
                  <div className="pt-10">
                    <div className="w-24 h-px bg-current opacity-20 mx-auto mb-4" />
                    <p className="font-bold text-lg">With Love,</p>
                    <p className="opacity-60 italic">Your Human Family</p>
                  </div>
               </div>
               <div className="absolute bottom-10 left-0 w-full text-center text-xs opacity-20">Page 1</div>
            </div>

            <div className="page-break"></div>

            {/* Page 3: Profile & Stats */}
            <div className="book-page min-h-[11in] p-20 space-y-16 relative border-t border-base-100">
              <div className="space-y-4">
                <h2 className={`text-4xl font-bold border-b-4 ${currentTheme.accent} pb-4 inline-block`}>About {selectedDog?.name}</h2>
                <p className="opacity-50 uppercase tracking-widest text-xs font-bold">The Basics & Background</p>
              </div>

              <div className="grid grid-cols-2 gap-16">
                <div className="space-y-10">
                   <div className="space-y-1">
                     <p className="text-xs uppercase font-black opacity-30 tracking-tighter">Breed</p>
                     <p className="text-2xl font-medium">{selectedDog?.breed}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-xs uppercase font-black opacity-30 tracking-tighter">Birthday</p>
                     <p className="text-2xl font-medium">{selectedDog?.birthDate}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-xs uppercase font-black opacity-30 tracking-tighter">Gotcha Day</p>
                     <p className="text-2xl font-medium">{selectedDog?.gotchaDate || 'Not recorded'}</p>
                   </div>
                </div>
                <div className="space-y-10">
                   <div className="space-y-1">
                     <p className="text-xs uppercase font-black opacity-30 tracking-tighter">Microchip ID</p>
                     <p className="text-2xl font-medium">{selectedDog?.microchipId || 'Not recorded'}</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-xs uppercase font-black opacity-30 tracking-tighter">Current Weight</p>
                     <p className="text-2xl font-medium">{selectedDog?.currentWeight} lbs</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-xs uppercase font-black opacity-30 tracking-tighter">Life Stage</p>
                     <p className="text-2xl font-medium">Adult</p>
                   </div>
                </div>
              </div>

              <div className="bg-base-200/30 p-10 rounded-2xl space-y-6">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                   <Activity size={20} className={currentTheme.primary} />
                   Wellness Status
                 </h3>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold opacity-40">Allergies</p>
                      <ul className="text-sm space-y-1">
                        {dogAllergies.length > 0 ? dogAllergies.map(a => (
                          <li key={a.id} className="flex items-center gap-2">• {a.allergen}</li>
                        )) : <li className="italic opacity-50">None known</li>}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold opacity-40">Active Medications</p>
                      <ul className="text-sm space-y-1">
                        {dogMedications.length > 0 ? dogMedications.map(m => (
                          <li key={m.id} className="flex items-center gap-2">• {m.name}</li>
                        )) : <li className="italic opacity-50">None active</li>}
                      </ul>
                    </div>
                 </div>
              </div>
              <div className="absolute bottom-10 left-0 w-full text-center text-xs opacity-20">Page 2</div>
            </div>

            <div className="page-break"></div>

            {/* Milestone Pages */}
            <div className="book-page min-h-[11in] p-20 space-y-16 relative border-t border-base-100">
              <div className="space-y-4">
                <h2 className={`text-4xl font-bold border-b-4 ${currentTheme.accent} pb-4 inline-block`}>Life Milestones</h2>
                <p className="opacity-50 uppercase tracking-widest text-xs font-bold">Growing up & Staying healthy</p>
              </div>

              <div className="relative pl-10 space-y-10">
                <div className="absolute left-[19px] top-4 bottom-4 w-1 bg-current opacity-5 rounded-full" />
                {dogMilestones.slice(0, 10).map((m, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[35px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${m.category === 'Health' ? 'bg-primary' : 'bg-secondary'}`} />
                    <div className="flex justify-between items-baseline">
                      <div className="space-y-1">
                        <p className="font-bold text-xl">{m.title}</p>
                        <p className="text-xs uppercase opacity-40 font-black">{m.category}</p>
                      </div>
                      <p className="text-sm italic opacity-60">{new Date(m.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                ))}
                {dogMilestones.length === 0 && <p className="italic opacity-40 text-center py-20">No milestones recorded yet.</p>}
              </div>
              <div className="absolute bottom-10 left-0 w-full text-center text-xs opacity-20">Page 3</div>
            </div>

            <div className="page-break"></div>

            {/* Memory Pages (Grid of 4) */}
            {memoryChunks.length > 0 ? memoryChunks.map((chunk, pageIdx) => (
              <React.Fragment key={pageIdx}>
                <div className="book-page min-h-[11in] p-20 space-y-16 relative border-t border-base-100">
                  <div className="space-y-4">
                    <h2 className={`text-4xl font-bold border-b-4 ${currentTheme.accent} pb-4 inline-block`}>Special Moments</h2>
                    <p className="opacity-50 uppercase tracking-widest text-xs font-bold">Captured Memories • Part {pageIdx + 1}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                    {chunk.map((m, i) => (
                      <div key={i} className="space-y-4 group">
                        <div className="aspect-square bg-base-200 rounded-sm overflow-hidden shadow-lg border-8 border-white">
                          <img src={m.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="font-bold text-lg">{m.title}</p>
                          <p className="text-xs italic opacity-50">{new Date(m.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-10 left-0 w-full text-center text-xs opacity-20">Page {4 + pageIdx}</div>
                </div>
                <div className="page-break"></div>
              </React.Fragment>
            )) : (
              <div className="book-page min-h-[11in] p-20 flex flex-col items-center justify-center space-y-6 border-t border-base-100">
                <Camera size={64} className="opacity-10" />
                <p className="italic opacity-40">No photos added to the vault yet.</p>
                <div className="absolute bottom-10 left-0 w-full text-center text-xs opacity-20">Page 4</div>
              </div>
            )}

            {/* Journal Highlights */}
            <div className="book-page min-h-[11in] p-20 space-y-16 relative border-t border-base-100">
              <div className="space-y-4">
                <h2 className={`text-4xl font-bold border-b-4 ${currentTheme.accent} pb-4 inline-block`}>Daily Journal</h2>
                <p className="opacity-50 uppercase tracking-widest text-xs font-bold">Notes from the Heart</p>
              </div>

              <div className="space-y-12">
                {dogJournal.slice(0, 6).map((j, i) => (
                  <div key={i} className="space-y-3 relative pl-8 border-l-2 border-primary/10">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-black uppercase opacity-30 tracking-widest">
                        {new Date(j.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <div className="badge badge-ghost badge-sm">{j.mood}</div>
                    </div>
                    <p className="text-lg leading-relaxed italic opacity-80">"{j.behaviorNotes}"</p>
                    {j.exerciseNotes && <p className="text-xs opacity-50 flex items-center gap-2"><Activity size={12} /> {j.exerciseNotes}</p>}
                  </div>
                ))}
                {dogJournal.length === 0 && <p className="italic opacity-40 text-center py-20">No journal entries recorded yet.</p>}
              </div>
              <div className="absolute bottom-10 left-0 w-full text-center text-xs opacity-20">Page {4 + memoryChunks.length + 1}</div>
            </div>

            <div className="page-break"></div>

            {/* Final Page */}
            <div className="book-page min-h-[11in] flex flex-col items-center justify-center text-center space-y-8 p-20 border-t border-base-100">
               <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8">
                  <Heart size={40} fill="currentColor" />
               </div>
               <h2 className="text-4xl font-bold">The End of the Beginning</h2>
               <p className="max-w-md opacity-60 leading-relaxed">
                 Every day is a new adventure. Keep capturing the moments that make life with {selectedDog?.name} so special.
               </p>
               <div className="pt-20">
                  <p className="uppercase tracking-[0.4em] text-[10px] font-black opacity-30">Created with Porch & Paw Companion</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-[3rem] border border-base-300 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Editor Side */}
        <div className="p-8 md:p-12 space-y-10 border-r border-base-300">
          <div>
            <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center text-primary mb-6 shadow-sm">
              <Book size={32} />
            </div>
            <h2 className="text-4xl font-black mb-3 tracking-tight">Memory Book Creator</h2>
            <p className="text-base-content/60 text-lg">Design a beautiful, print-ready digital book of your dog's life story.</p>
          </div>

          <div className="space-y-8">
            {/* Dog Select */}
            <section className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-50">
                <Heart size={16} /> Select Pet
              </h4>
              <div className="flex flex-wrap gap-3">
                {profiles.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setSelectedDogId(p.id)}
                    className={`btn rounded-2xl px-6 h-12 transition-all ${selectedDogId === p.id ? 'btn-primary shadow-lg shadow-primary/20' : 'btn-ghost bg-base-200'}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Theme Select */}
            <section className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-50">
                <Palette size={16} /> Choose a Theme
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {themes.map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => setTheme(t.id)}
                    className={`p-6 rounded-[2rem] border-2 transition-all text-center flex flex-col items-center gap-3 ${theme === t.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-base-200 hover:border-base-300 bg-base-50'}`}
                  >
                    <div className={`w-12 h-12 rounded-full ${t.color} border-4 border-white shadow-md`} />
                    <span className="text-xs font-black uppercase tracking-tighter">{t.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Owner Message */}
            <section className="space-y-4">
               <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-50">
                 <FileText size={16} /> Opening Message
               </h4>
               <textarea 
                 className="textarea textarea-bordered w-full rounded-2xl h-32 text-sm p-4 focus:ring-2 ring-primary/20"
                 placeholder="Write a heartfelt introduction for your memory book..."
                 value={ownerMessage}
                 onChange={e => setOwnerMessage(e.target.value)}
               />
            </section>

            {/* Album Select */}
            <section className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-50">
                <Filter size={16} /> Include Albums
              </h4>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedAlbumIds([])}
                  className={`btn btn-sm rounded-xl px-4 ${selectedAlbumIds.length === 0 ? 'btn-primary shadow-md shadow-primary/10' : 'btn-ghost bg-base-200'}`}
                >
                  All Photos
                </button>
                {dogAlbums.map(a => (
                  <button 
                    key={a.id}
                    onClick={() => toggleAlbum(a.id)}
                    className={`btn btn-sm rounded-xl px-4 ${selectedAlbumIds.includes(a.id) ? 'btn-secondary shadow-md shadow-secondary/10' : 'btn-ghost bg-base-200'}`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </section>

            <div className="divider opacity-10"></div>

            {!isPremium ? (
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-[2.5rem] border border-primary/20 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Lock size={120} />
                </div>
                <div className="flex items-center gap-4 text-primary relative z-10">
                  <div className="bg-white p-3 rounded-2xl shadow-sm">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">Unlock Full Exports</h3>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-60">Premium Feature</p>
                  </div>
                </div>
                <p className="text-base-content/70 relative z-10">Memory Book PDF exports are exclusive to Premium members. Capture every milestone in a high-fidelity, printable format.</p>
                <button className="btn btn-primary btn-block rounded-2xl h-14 shadow-lg shadow-primary/20 relative z-10">Upgrade to Premium</button>
              </div>
            ) : (
              <div className="bg-success/10 p-6 rounded-[2rem] border border-success/20 flex items-center gap-4">
                <div className="bg-success text-success-content p-3 rounded-2xl">
                  <Check size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-success">Premium Active</h3>
                  <p className="text-sm opacity-60">Full exports unlocked!</p>
                </div>
              </div>
            )}

            <button 
              onClick={() => setShowPreview(true)}
              className="btn btn-primary btn-lg btn-block rounded-[2rem] h-16 shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-transform active:scale-95 group"
            >
              Preview Your Book
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Visual Preview Side */}
        <div className="bg-base-200 p-8 md:p-16 flex items-center justify-center relative overflow-hidden min-h-[600px]">
           {/* Abstract Background Elements */}
           <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
           <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

           {!isPremium && (
             <div className="absolute inset-0 bg-base-200/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-10 text-center">
                <div className="bg-white/80 p-8 rounded-[3rem] shadow-xl border border-white flex flex-col items-center">
                  <Lock size={48} className="mb-4 text-primary" />
                  <p className="font-black text-xl mb-2">Preview Restricted</p>
                  <p className="text-sm opacity-60 max-w-xs">Upgrade to Premium to view your full typeset memory book.</p>
                </div>
             </div>
           )}

           <div className={`w-full max-w-sm aspect-[1/1.414] ${currentTheme.color} ${currentTheme.font} ${currentTheme.text} shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] rounded-sm p-10 flex flex-col items-center justify-center text-center space-y-6 border-8 border-white relative`}>
              <div className="absolute inset-4 border-2 border-dashed border-base-300 opacity-20 pointer-events-none" />
              
              <h3 className={`text-4xl font-bold ${currentTheme.primary}`}>{selectedDog?.name || 'Your Pet'}</h3>
              
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-base-200 border-4 border-white shadow-lg">
                  {selectedDog?.photoUrl ? (
                    <img src={selectedDog.photoUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-base-300">
                      <ImageIcon size={48} />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md text-primary">
                  <Heart size={16} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="italic text-sm opacity-50">A Life Captured</p>
                <div className="w-12 h-px bg-current opacity-20 mx-auto" />
              </div>
              
              <div className="pt-4 flex items-center gap-2 opacity-30 text-[10px] font-black uppercase tracking-widest">
                 <Book size={12} />
                 Typeset Preview
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryBookCreator;
