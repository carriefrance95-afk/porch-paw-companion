import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink,
  Heart,
  Save,
  X,
  Compass
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
  const [viewMode, setViewMode] = useState<'hub' | 'create'>('hub');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time API input tracking states
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const [placeSearchInput, setPlaceSearchInput] = useState('');
  const [selectedType, setSelectedType] = useState('Veterinarian');
  const [personalNote, setPersonalNote] = useState('');

  // Captured live parameters from Google API response
  const [capturedPhone, setCapturedPhone] = useState('');
  const [capturedAddress, setCapturedAddress] = useState('');
  const [capturedUrl, setCapturedUrl] = useState('');

  const [providers, setProviders] = useState<CareProvider[]>([
    {
      id: '1',
      name: 'Bluffton Animal Clinic',
      type: 'Veterinarian',
      phone: '260-273-4745',
      note: 'Primary vet for Stitch. Incredibly gentle.',
      lastVisit: 'TBD',
      isFavorite: true,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bluffton+Animal+Clinic',
      formattedAddress: '123 Care Lane, Bluffton, IN'
    }
  ]);

  const categories = ['All', 'Veterinarian', 'Emergency Vet', 'Groomer', 'Trainer', 'Boarding', 'Pet Sitter', 'Walker', 'Other'];

  // Initialize live Google Autocomplete engine when the modal opens
  useEffect(() => {
    if (viewMode === 'create' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current as HTMLInputElement,
        {
          types: ['establishment'],
          fields: ['name', 'formatted_phone_number', 'formatted_address', 'url']
        }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        // Extract live business details straight from Google's database mapping
        if (place.name) setPlaceSearchInput(place.name);
        if (place.formatted_phone_number) setCapturedPhone(place.formatted_phone_number);
        if (place.formatted_address) setCapturedAddress(place.formatted_address);
        if (place.url) setCapturedUrl(place.url);
      });
    }
  }, [viewMode]);

  const filteredProviders = providers.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.type === selectedCategory;
    return matchesCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleFavorite = (id: string) => {
    setProviders(providers.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const handleLinkSyncSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeSearchInput.trim()) return;

    const newProvider: CareProvider = {
      id: Date.now().toString(),
      name: placeSearchInput,
      type: selectedType,
      // If the API hasn't resolved live yet, fall back to whatever was written or use clean defaults
      phone: capturedPhone || 'Phone unlisted', 
      formattedAddress: capturedAddress || 'Address unlisted',
      googleMapsUrl: capturedUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeSearchInput)}`,
      note: personalNote || 'No custom notes added.',
      lastVisit: 'TBD',
      isFavorite: false
    };

    setProviders([newProvider, ...providers]);
    setViewMode('hub');
    
    // Clear temporary caches
    setPlaceSearchInput('');
    setPersonalNote('');
    setCapturedPhone('');
    setCapturedAddress('');
    setCapturedUrl('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#FDFBF7] min-h-screen text-left text-[#2D2A27]">
      
      {/* HUB MODE */}
      {viewMode === 'hub' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold font-serif">Care Directory</h1>
              <p className="text-sm opacity-60 mt-1">Your trusted network of pet care professionals, filtered exactly how you need to see them.</p>
            </div>
            
            <button 
              type="button" 
              onClick={() => setViewMode('create')}
              className="bg-[#B55D3B] hover:bg-[#9E5033] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 border-none transition-all cursor-pointer"
            >
              <Plus size={16} />
              Add Provider
            </button>
          </div>

          {/* Filter Bar */}
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

            <div className="flex gap-2 overflow-x-auto w-full pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    selectedCategory === cat 
                      ? 'bg-[#D1D5C4] text-[#2D2A27] border-[#7A7A59]/30 shadow-sm' 
                      : 'bg-white text-[#2D2A27]/70 border-[#B6A799]/30 hover:border-[#B6A799]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Output Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between hover:border-[#B6A799] transition-all">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#7A7A59]/10 text-[#4F5247] px-3 py-1 rounded-full">
                      {provider.type}
                    </span>
                    <button type="button" onClick={() => toggleFavorite(provider.id)} className="text-[#2D2A27]/30 hover:text-[#B55D3B] bg-transparent border-none cursor-pointer">
                      <Heart size={16} fill={provider.isFavorite ? "#B55D3B" : "none"} className={provider.isFavorite ? "text-[#B55D3B]" : ""} />
                    </button>
                  </div>

                  <span className="text-[11px] text-[#2D2A27]/50 font-medium block">Last visit: {provider.lastVisit}</span>
                  <h3 className="text-xl font-bold font-serif mt-0.5 tracking-tight capitalize">{provider.name}</h3>

                  <div className="mt-4 space-y-2.5 text-xs opacity-90">
                    <a href={`tel:${provider.phone}`} className="flex items-center gap-2 hover:text-[#B55D3B] transition-colors font-medium text-inherit decoration-none">
                      <Phone size={13} className="text-[#7A7A59]" /> {provider.phone}
                    </a>
                    {provider.formattedAddress && (
                      <div className="flex items-start gap-2 font-medium">
                        <MapPin size={13} className="text-[#7A7A59] mt-0.5" />
                        <span>{provider.formattedAddress}</span>
                      </div>
                    )}
                  </div>

                  <p className="mt-4 bg-[#FDFBF7] border border-[#B6A799]/20 rounded-2xl p-3.5 text-xs italic leading-relaxed">
                    "{provider.note}"
                  </p>
                </div>

                {provider.googleMapsUrl && (
                  <div className="mt-6 pt-4 border-t border-[#B6A799]/10">
                    <a href={provider.googleMapsUrl} target="_blank" rel="noreferrer" className="w-full bg-[#FDFBF7] hover:bg-[#D1D5C4]/30 border border-[#B6A799]/40 text-[#2D2A27] font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 decoration-none">
                      <Clock size={13} className="text-[#7A7A59]" /> View Live Hours & Location <ExternalLink size={12} className="opacity-40" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* CREATE MODE: LIVE DATA RESOLUTION FORM */}
      {viewMode === 'create' && (
        <form onSubmit={handleLinkSyncSubmit} className="bg-white border border-[#B6A799]/30 rounded-[2rem] p-8 shadow-sm space-y-6 max-w-xl mx-auto animate-in fade-in duration-200">
          <div className="flex justify-between items-center pb-2 border-b border-[#B6A799]/10">
            <div>
              <h2 className="text-2xl font-bold font-serif">Link from Google Maps</h2>
              <p className="text-xs opacity-60 mt-0.5">Search for any clinic or business to auto-sync hours, live details, and directions.</p>
            </div>
            <button type="button" onClick={() => setViewMode('hub')} className="p-2 hover:bg-[#FDFBF7] rounded-xl border-none cursor-pointer"><X size={18} /></button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide">Search Google Maps Business Registry</label>
              <div className="relative">
                <input 
                  ref={autocompleteRef}
                  type="text"
                  required
                  placeholder="Type clinic name, grooming shop, or business location..."
                  value={placeSearchInput}
                  onChange={(e) => setPlaceSearchInput(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[44px] pl-10 pr-3 focus:outline-none focus:border-[#B55D3B]"
                />
                <Compass size={16} className="absolute left-3 top-3.5 text-[#7A7A59]" />
              </div>
              
              {/* Context Feedback Panel displaying captured API state metrics */}
              {capturedAddress && (
                <div className="mt-3 bg-[#D1D5C4]/30 border border-[#7A7A59]/20 rounded-xl p-3 text-xs space-y-1 text-[#2D2A27]/80">
                  <div className="font-bold text-[#2D2A27]">✓ Verified Google Data Picked Up:</div>
                  <div><span className="font-semibold">Loc:</span> {capturedAddress}</div>
                  {capturedPhone && <div><span className="font-semibold">Tel:</span> {capturedPhone}</div>}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide">Care Category Assignation</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm h-[42px] px-3 focus:outline-none focus:border-[#B55D3B]"
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide">Personal Care Notes (Internal Only)</label>
              <textarea 
                rows={3}
                placeholder="Add unique user details like door codes, preferred clinicians..."
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#B6A799]/40 rounded-xl text-sm p-3 focus:outline-none focus:border-[#B55D3B]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-[#B6A799]/10">
            <button type="button" onClick={() => setViewMode('hub')} className="px-5 py-2.5 rounded-xl bg-[#E6E1DA] text-[#2D2A27] font-bold text-xs border-none cursor-pointer">Cancel</button>
            <button type="submit" className="rounded-xl bg-[#B55D3B] text-white font-bold px-6 py-2.5 flex items-center gap-2 text-xs border-none cursor-pointer shadow-sm"><Save size={14} /> Link & Sync Provider</button>
          </div>
        </form>
      )}

    </div>
  );
};
// Declaring global window context interface types for typescript safety
declare global {
  interface Window {
    google: any;
  }
}

export default Directory;