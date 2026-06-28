import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink,
  Heart
} from 'lucide-react';

interface CareProvider {
  id: string;
  name: string;
  type: string;
  phone: string;
  note: string;
  lastVisit: string;
  isFavorite: boolean;
  googleMapsUrl?: string;
  formattedAddress?: string;
}

const Directory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local state for the user's saved providers list
  const [providers, setProviders] = useState<CareProvider[]>([
    {
      id: '1',
      name: 'Bluffton Animal Clinic',
      type: 'Veterinarian',
      phone: '260-273-4745',
      note: 'Primary vet for Stitch. Incredibly gentle.',
      lastVisit: 'TBD',
      isFavorite: true,
      googleMapsUrl: 'https://maps.google.com',
      formattedAddress: '123 Care Lane, Bluffton, IN'
    },
    {
      id: '2',
      name: 'Paws & Claws Academy',
      type: 'Trainer',
      phone: '555-019-2834',
      note: 'Leash training coach.',
      lastVisit: '2026-04-12',
      isFavorite: false,
      googleMapsUrl: 'https://maps.google.com',
      formattedAddress: '789 School St, Fort Wayne, IN'
    }
  ]);

  const categories = ['All', 'Veterinarian', 'Emergency Vet', 'Groomer', 'Trainer', 'Boarding', 'Pet Sitter', 'Walker', 'Other'];

  // INSTANT FILTER LOGIC: Quietly narrows down cards by search input OR clicked category button
  const filteredProviders = providers.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.type === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.note.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    setProviders(providers.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen text-left">
      
      {/* Top Heading Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#2D2A27]">Care Directory</h1>
          <p className="text-sm text-[#2D2A27]/60 mt-1">Your trusted network of pet care professionals, filtered exactly how you need to see them.</p>
        </div>
        
        <button type="button" className="bg-[#B55D3B] hover:bg-[#9E5033] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 border-none transition-all cursor-pointer">
          <Plus size={16} />
          Add Provider
        </button>
      </div>

      {/* High-Contrast Control Bar: Search Input + Filter Badges */}
      <div className="flex flex-col lg:flex-row gap-4 items-center mb-8 bg-white border border-[#B6A799]/20 p-4 rounded-3xl shadow-sm w-full">
        <div className="relative w-full lg:w-80 shrink-0">
          <input 
            type="text" 
            placeholder="Search your contacts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[40px] pl-9 pr-3 focus:outline-none focus:border-[#B55D3B]"
          />
          <Search size={15} className="absolute left-3 top-3.5 text-[#2D2A27]/40" />
        </div>

        {/* Scrollable category tracks with beautiful Light Sage (#D1D5C4) indicators */}
        <div className="flex gap-2 overflow-x-auto w-full pb-1 style-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive 
                    ? 'bg-[#D1D5C4] text-[#2D2A27] border-[#7A7A59]/30 shadow-sm' 
                    : 'bg-white text-[#2D2A27]/70 border-[#B6A799]/30 hover:border-[#B6A799]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean Directory Grid Cards Display */}
      {filteredProviders.length === 0 ? (
        <div className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-16 text-center text-sm text-[#2D2A27]/50 shadow-sm">
          No saved contacts match your active filter settings.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-150">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between hover:border-[#B6A799] transition-all">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#7A7A59]/10 text-[#4F5247] px-3 py-1 rounded-full">
                    {provider.type}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => toggleFavorite(provider.id)}
                    className="text-[#2D2A27]/30 hover:text-[#B55D3B] bg-transparent border-none cursor-pointer transition-colors"
                  >
                    <Heart size={16} fill={provider.isFavorite ? "#B55D3B" : "none"} className={provider.isFavorite ? "text-[#B55D3B]" : ""} />
                  </button>
                </div>

                <span className="text-[11px] text-[#2D2A27]/50 font-medium block">Last visit: {provider.lastVisit}</span>
                <h3 className="text-xl font-bold font-serif text-[#2D2A27] mt-0.5 tracking-tight capitalize">{provider.name}</h3>

                <div className="mt-4 space-y-2.5 text-xs text-[#2D2A27]/80">
                  <a href={`tel:${provider.phone}`} className="flex items-center gap-2 hover:text-[#B55D3B] transition-colors font-medium">
                    <Phone size={13} className="text-[#7A7A59]" /> {provider.phone}
                  </a>
                  {provider.formattedAddress && (
                    <div className="flex items-start gap-2 font-medium">
                      <MapPin size={13} className="text-[#7A7A59] mt-0.5" />
                      <span>{provider.formattedAddress}</span>
                    </div>
                  )}
                </div>

                <p className="mt-4 bg-[#FDFBF7] border border-[#B6A799]/20 rounded-2xl p-3.5 text-xs text-[#2D2A27]/70 italic leading-relaxed">
                  "{provider.note}"
                </p>
              </div>

              {provider.googleMapsUrl && (
                <div className="mt-6 pt-4 border-t border-[#B6A799]/10">
                  <a href={provider.googleMapsUrl} target="_blank" rel="noreferrer" className="w-full bg-[#FDFBF7] hover:bg-[#D1D5C4]/30 border border-[#B6A799]/40 text-[#2D2A27] font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5">
                    <Clock size={13} className="text-[#7A7A59]" /> View Live Hours & Location <ExternalLink size={12} className="opacity-40" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Directory;