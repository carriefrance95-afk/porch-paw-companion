import React, { useState } from 'react';
import { Search, Plus, Save, X, Heart, Phone, MapPin } from 'lucide-react';

interface CareProvider {
  id: string;
  name: string;
  type: string;
  phone: string;
  note: string;
}

const Directory: React.FC = () => {
  const [viewMode, setViewMode] = useState<'hub' | 'create'>('hub');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Veterinarian');
  const [newPhone, setNewPhone] = useState('');
  const [newNote, setNewNote] = useState('');

  const [providers, setProviders] = useState<CareProvider[]>([
    {
      id: '1',
      name: 'Bluffton Animal Clinic',
      type: 'Veterinarian',
      phone: '260-273-4745',
      note: 'Primary vet for Stitch.'
    }
  ]);

  const categories = ['All', 'Veterinarian', 'Emergency Vet', 'Groomer', 'Trainer', 'Other'];

  const filteredProviders = providers.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.type === selectedCategory;
    return matchesCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProvider: CareProvider = {
      id: Date.now().toString(),
      name: newName,
      type: newType,
      phone: newPhone || 'None',
      note: newNote || 'No notes.'
    };

    setProviders([newProvider, ...providers]);
    setViewMode('hub');
    setNewName('');
    setNewPhone('');
    setNewNote('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen text-left text-[#2D2A27]">
      
      {/* HUB MODE */}
      {viewMode === 'hub' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold font-serif">Care Directory</h1>
              <p className="text-sm opacity-60">Manage your pet care team records.</p>
            </div>
            
            {/* DIRECT ONCLICK SWITCH BUTTON */}
            <button 
              type="button" 
              onClick={() => {
                console.log("Add Provider Button Clicked!");
                setViewMode('create');
              }}
              className="bg-[#B55D3B] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 border-none cursor-pointer"
            >
              <Plus size={16} />
              Add Provider
            </button>
          </div>

          {/* Quick Filter Strip */}
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6 bg-white border p-4 rounded-2xl shadow-sm">
            <input 
              type="text" 
              placeholder="Filter names..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#FDFBF7] border rounded-xl text-sm h-[40px] px-3 focus:outline-none"
            />
            <div className="flex gap-2 overflow-x-auto w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border cursor-pointer ${
                    selectedCategory === cat ? 'bg-[#D1D5C4] text-[#2D2A27]' : 'bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Output Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="bg-white border rounded-2xl p-6 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#7A7A59]/10 text-[#4F5247] px-2.5 py-1 rounded-full">{provider.type}</span>
                <h3 className="text-xl font-bold font-serif mt-2">{provider.name}</h3>
                <p className="text-xs mt-1 opacity-80">Phone: {provider.phone}</p>
                <p className="mt-3 bg-[#FDFBF7] p-3 rounded-xl text-xs italic">"{provider.note}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE FORM MODE */}
      {viewMode === 'create' && (
        <form onSubmit={handleFormSubmit} className="bg-white border rounded-2xl p-8 shadow-sm space-y-4 max-w-xl mx-auto">
          <div className="flex justify-between items-center pb-2 border-b">
            <h2 className="text-xl font-bold font-serif">Add New Provider</h2>
            <button type="button" onClick={() => setViewMode('hub')} className="border-none bg-transparent cursor-pointer text-xl">×</button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Provider Name *</label>
            <input 
              type="text" 
              required 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              className="w-full border rounded-xl p-2.5 bg-[#FDFBF7]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Category Type</label>
            <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full border rounded-xl p-2.5 bg-[#FDFBF7]">
              <option value="Veterinarian">Veterinarian</option>
              <option value="Emergency Vet">Emergency Vet</option>
              <option value="Groomer">Groomer</option>
              <option value="Trainer">Trainer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Phone Number</label>
            <input 
              type="text" 
              value={newPhone} 
              onChange={(e) => setNewPhone(e.target.value)} 
              className="w-full border rounded-xl p-2.5 bg-[#FDFBF7]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Notes</label>
            <textarea 
              rows={3} 
              value={newNote} 
              onChange={(e) => setNewNote(e.target.value)} 
              className="w-full border rounded-xl p-2.5 bg-[#FDFBF7]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setViewMode('hub')} className="px-4 py-2 rounded-xl bg-gray-200 font-bold text-xs cursor-pointer border-none">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-[#B55D3B] text-white font-bold text-xs cursor-pointer border-none shadow-sm flex items-center gap-1"><Save size={12} /> Save</button>
          </div>
        </form>
      )}

    </div>
  );
};

export default Directory;