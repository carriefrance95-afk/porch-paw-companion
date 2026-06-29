import React from 'react';

export default function JournalMemoryVault() {
  return (
    <div className="min-h-screen bg-[#F4F0EA] text-[#2D2A27] p-6 font-sans">
      <header className="max-w-4xl mx-auto mb-8 pb-4 border-b border-[#B6A799]/40">
        <span className="text-xs font-bold tracking-widest text-[#7A7A59] uppercase">porchside pet life</span>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Daily Journal</h1>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Form Column */}
        <section className="md:col-span-1">
          <div className="bg-white p-5 rounded-2xl border border-[#B6A799]/20 shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-[#B55D3B]">New Journal Entry</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Date</label>
                <input 
                  type="date" 
                  defaultValue="2026-06-29"
                  className="w-full p-2 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Mood</label>
                <select className="w-full p-2 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20">
                  <option>Happy 🐾</option>
                  <option>Energetic ⚡</option>
                  <option>Calm 🍃</option>
                  <option>Tired 💤</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Notes</label>
                <textarea 
                 rows={4} 
                  placeholder="How was Stitch today?" 
                  className="w-full p-3 border border-[#B6A799]/60 rounded-xl bg-[#F4F0EA]/20 resize-none"
                />
              </div>

              <button 
                type="button" 
                className="w-full py-2.5 bg-[#B55D3B] text-white font-bold rounded-xl shadow-sm"
              >
                Save Entry
              </button>
            </div>
          </div>
        </section>

        {/* Right Feed Column */}
        <section className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-[#7A7A59] border-b border-[#B6A799]/20 pb-2">History</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#B6A799]/20 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#7A7A59] bg-[#F4F0EA] px-2.5 py-1 rounded">2026-06-29</span>
                <span className="text-sm">Happy 🐾</span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">Stitch had a great day hanging out porchside. Full of energy and loved his morning walk!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}