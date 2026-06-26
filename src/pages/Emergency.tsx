import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import { type DirectoryEntry, type EmergencyContact, type PetSitterInstructions, type LostPetFlyer } from '../types';
import { 
  Phone, Users, ClipboardList, Map, Printer, Plus, Trash2, Edit, Save, 
  AlertCircle, ShieldAlert, Heart, Info, Camera, Share2, Download, ArrowUp, ArrowDown, Smartphone
} from 'lucide-react';
import EmergencyPacket from '../components/EmergencyPacket';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Emergency: React.FC = () => {
  const {
    profiles, vaccines, medications, allergies, emergencyContacts, addEmergencyContact, updateEmergencyContact, deleteEmergencyContact,
    sitterInstructions, updateSitterInstructions,
    lostPetFlyers, updateLostPetFlyer,
    directory
  } = usePets();
  const location = useLocation();
  const navigate = useNavigate();
  const [providerContext, setProviderContext] = useState<DirectoryEntry | null>(null);
  const [providerPrefillApplied, setProviderPrefillApplied] = useState(false);

  const [activeTab, setActiveTab] = useState<'contacts' | 'sitter' | 'flyer' | 'packet' | 'resources'>('contacts');
  const [selectedDogId, setSelectedDogId] = useState<string>(profiles[0]?.id || '');
  const [isExporting, setIsExporting] = useState(false);
  
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [contactFormData, setContactFormData] = useState<Partial<EmergencyContact>>({
    isPrimary: false,
    priority: 'Secondary'
  });
  const packetRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!selectedDogId && profiles[0]?.id) {
      setSelectedDogId(profiles[0].id);
    }
  }, [profiles, selectedDogId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const providerId = params.get('providerId');
    const tab = params.get('tab');
    if (!providerId || providerPrefillApplied) return;

    const provider = directory.find(item => item.id === providerId);
    if (!provider) return;

    setProviderContext(provider);
    if (tab === 'packet') setActiveTab('packet');
    setProviderPrefillApplied(true);
    navigate('/emergency', { replace: true });
  }, [location.search, directory, providerPrefillApplied, navigate]);

  const sortedContacts = [...emergencyContacts].sort((a, b) => {
    const rank = (contact: EmergencyContact) => {
      const priorityRank = contact.priority === 'Primary' ? 0 : contact.priority === 'Secondary' ? 1 : 2;
      return (contact.order ?? (priorityRank + 1) * 10) + priorityRank;
    };
    return rank(a) - rank(b);
  });

  const adjustContactOrder = (id: string, direction: 'up' | 'down') => {
    const sorted = [...sortedContacts];
    const index = sorted.findIndex(contact => contact.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const current = sorted[index];
    const target = sorted[targetIndex];
    const currentOrder = current.order ?? index + 1;
    const targetOrder = target.order ?? targetIndex + 1;

    updateEmergencyContact({ ...current, order: targetOrder });
    updateEmergencyContact({ ...target, order: currentOrder });
  };

  const handleOpenContactModal = (contact?: EmergencyContact) => {
    if (contact) {
      setEditingContact(contact);
      setContactFormData(contact);
    } else {
      setEditingContact(null);
      setContactFormData({ name: '', relationship: '', phone: '', email: '', isPrimary: false });
    }
    setIsContactModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContact) {
      updateEmergencyContact({ ...editingContact, ...contactFormData } as EmergencyContact);
    } else {
      addEmergencyContact({
        ...contactFormData,
        id: Math.random().toString(36).substr(2, 9),
      } as EmergencyContact);
    }
    setIsContactModalOpen(false);
  };

  const currentSitterInstructions = sitterInstructions.find(s => s.dogId === selectedDogId) || {
    dogId: selectedDogId,
    feedingSchedule: '',
    medicationGuide: '',
    behavioralNotes: '',
    favoriteToys: '',
    routines: '',
    emergencyNotes: '',
    houseRules: '',
    accessInstructions: '',
    walkRoutine: '',
    keyLocations: ''
  };

  const currentFlyer = lostPetFlyers.find(f => f.dogId === selectedDogId) || {
    dogId: selectedDogId,
    lastSeenDate: new Date().toISOString().split('T')[0],
    lastSeenLocation: '',
    reward: '',
    contactPhone: '',
    notes: '',
    photoUrls: [],
    qrData: '',
    socialCaption: ''
  };

  const handleSitterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    updateSitterInstructions({
      dogId: selectedDogId,
      feedingSchedule: formData.get('feedingSchedule') as string,
      medicationGuide: formData.get('medicationGuide') as string,
      behavioralNotes: formData.get('behavioralNotes') as string,
      favoriteToys: formData.get('favoriteToys') as string,
      routines: formData.get('routines') as string,
      emergencyNotes: formData.get('emergencyNotes') as string,
      houseRules: formData.get('houseRules') as string,
      accessInstructions: formData.get('accessInstructions') as string,
      walkRoutine: formData.get('walkRoutine') as string,
      keyLocations: formData.get('keyLocations') as string,
    });
    alert('Sitter instructions saved!');
  };

  const handleFlyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const photoUrlsRaw = (formData.get('photoUrls') as string || '').split(',').map(url => url.trim()).filter(Boolean);

    updateLostPetFlyer({
      dogId: selectedDogId,
      lastSeenDate: formData.get('lastSeenDate') as string,
      lastSeenLocation: formData.get('lastSeenLocation') as string,
      reward: formData.get('reward') as string,
      contactPhone: formData.get('contactPhone') as string,
      notes: formData.get('notes') as string,
      photoUrls: photoUrlsRaw,
      qrData: formData.get('qrData') as string,
      socialCaption: formData.get('socialCaption') as string,
    });
    alert('Flyer information updated!');
  };

  const handleShareFlyer = async () => {
    const flyerText = `LOST DOG: ${selectedDog?.name}\nLast Seen: ${currentFlyer.lastSeenLocation} on ${currentFlyer.lastSeenDate}\nReward: ${currentFlyer.reward}\nContact: ${currentFlyer.contactPhone}\n${currentFlyer.notes}`;

    if (navigator.share) {
      await navigator.share({
        title: `Lost Dog: ${selectedDog?.name}`,
        text: flyerText,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(flyerText);
      alert('Flyer details copied to clipboard. Share it in your preferred app.');
    } else {
      alert('Use your browser share menu or copy the text manually.');
    }
  };

  const handleExportPacketPdf = async () => {
    if (!packetRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(packetRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imageData);
      const imgWidth = pageWidth - 40;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      let y = 20;

      pdf.addImage(imageData, 'PNG', 20, y, imgWidth, imgHeight);
      if (imgHeight > pageHeight - 40) {
        // If content is taller than one page, add a second page and continue
        const remainingHeight = imgHeight - (pageHeight - 40);
        if (remainingHeight > 0) {
          pdf.addPage();
          pdf.addImage(imageData, 'PNG', 20, 20 - (pageHeight - 40), imgWidth, imgHeight);
        }
      }
      pdf.save(`${selectedDog?.name || 'emergency-packet'}-packet.pdf`);
    } catch (error) {
      console.error(error);
      alert('Unable to export packet PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const selectedDog = profiles.find(p => p.id === selectedDogId);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 no-print">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2 flex items-center gap-3">
            <ShieldAlert className="text-error" />
            Emergency Planning Center
          </h1>
          <p className="text-base-content/70">Be prepared for the unexpected and ensure your dog's safety.</p>
          {providerContext && (
            <div className="mt-4 rounded-3xl border border-info/20 bg-info/5 p-4 text-sm text-info-content">
              <strong>Provider context:</strong> {providerContext.name} — {providerContext.category}
              {providerContext.phone && (
                <span className="block mt-2">Call: <a href={`tel:${providerContext.phone}`} className="underline">{providerContext.phone}</a></span>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline rounded-2xl" onClick={() => { setActiveTab('packet'); setTimeout(() => window.print(), 100); }}>
            <Printer size={18} />
            Print Full Packet
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1 rounded-2xl mb-8 no-print overflow-x-auto flex-nowrap">
        <button 
          className={`tab flex-1 rounded-xl h-12 whitespace-nowrap ${activeTab === 'contacts' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          <Users size={18} className="mr-2" />
          Contacts
        </button>
        <button 
          className={`tab flex-1 rounded-xl h-12 whitespace-nowrap ${activeTab === 'sitter' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('sitter')}
        >
          <ClipboardList size={18} className="mr-2" />
          Sitter Info
        </button>
        <button 
          className={`tab flex-1 rounded-xl h-12 whitespace-nowrap ${activeTab === 'flyer' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('flyer')}
        >
          <Map size={18} className="mr-2" />
          Lost Flyer
        </button>
        <button 
          className={`tab flex-1 rounded-xl h-12 whitespace-nowrap ${activeTab === 'packet' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('packet')}
        >
          <ShieldAlert size={18} className="mr-2" />
          Full Packet
        </button>
        <button 
          className={`tab flex-1 rounded-xl h-12 whitespace-nowrap ${activeTab === 'resources' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <Info size={18} className="mr-2" />
          Resources
        </button>
      </div>

      {/* Dog Selector (for sitter, flyer, and packet tabs) */}
      {(activeTab === 'sitter' || activeTab === 'flyer' || activeTab === 'packet') && (
        <div className="bg-primary/5 p-4 rounded-2xl mb-6 flex items-center gap-4 overflow-x-auto no-print">
          <span className="font-semibold text-primary whitespace-nowrap">Plan for:</span>
          {profiles.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedDogId(p.id)}
              className={`btn btn-sm rounded-xl px-4 ${selectedDogId === p.id ? 'btn-primary' : 'btn-ghost bg-base-100 shadow-sm'}`}
            >
              {p.name}
            </button>
          ))}
          {profiles.length === 0 && <p className="text-sm opacity-50">Please create a dog profile first.</p>}
        </div>
      )}

      {/* Content Area */}
      <div className="min-h-[400px]">
        {/* Emergency Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 no-print">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Trusted Contacts</h2>
              <button className="btn btn-primary btn-sm rounded-xl" onClick={() => handleOpenContactModal()}>
                <Plus size={16} />
                Add Contact
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedContacts.map((contact, index) => (
                <div key={contact.id} className={`bg-base-100 rounded-[2rem] p-6 shadow-sm border ${contact.isPrimary ? 'border-primary' : 'border-base-200'}`}>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">{contact.priority || 'Secondary'}</p>
                      <h3 className="text-lg font-bold">{contact.name}</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="btn btn-ghost btn-xs btn-circle" type="button" onClick={() => adjustContactOrder(contact.id, 'up')}><ArrowUp size={16} /></button>
                      <button className="btn btn-ghost btn-xs btn-circle" type="button" onClick={() => adjustContactOrder(contact.id, 'down')}><ArrowDown size={16} /></button>
                    </div>
                  </div>
                  <p className="text-sm opacity-60 mb-4">{contact.relationship}</p>
                  
                  <div className="space-y-2 mb-6">
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm hover:underline">
                      <Phone size={14} className="text-primary" /> {contact.phone}
                    </a>
                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm truncate">
                        <Heart size={14} className="text-primary" /> {contact.email}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2 border-t pt-4">
                    <button className="btn btn-ghost btn-sm btn-circle text-info" onClick={() => handleOpenContactModal(contact)}><Edit size={16} /></button>
                    <button className="btn btn-ghost btn-sm btn-circle text-error" onClick={() => deleteEmergencyContact(contact.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {emergencyContacts.length === 0 && (
                <div className="col-span-full py-12 text-center bg-base-200 rounded-[2rem] border-2 border-dashed border-base-300">
                  <p className="opacity-50">No emergency contacts added yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sitter Instructions Tab */}
        {activeTab === 'sitter' && selectedDog && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 no-print">
            <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Instructions for {selectedDog.name}</h2>
                  <p className="opacity-70">Details for when someone else is caring for your dog.</p>
                </div>
                <button type="submit" form="sitter-form" className="btn btn-primary rounded-2xl px-8 shadow-lg">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>

              <form id="sitter-form" onSubmit={handleSitterSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Feeding Schedule & Diet</span></label>
                    <textarea 
                      name="feedingSchedule"
                      className="textarea textarea-bordered rounded-2xl h-32" 
                      placeholder="e.g. 1 cup kibble at 7am and 6pm. Mix with 1 spoon of wet food."
                      defaultValue={currentSitterInstructions.feedingSchedule}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Medication Guide</span></label>
                    <textarea 
                      name="medicationGuide"
                      className="textarea textarea-bordered rounded-2xl h-32" 
                      placeholder="e.g. 1 heartworm pill on the 1st of every month."
                      defaultValue={currentSitterInstructions.medicationGuide}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Emergency Notes</span></label>
                    <textarea 
                      name="emergencyNotes"
                      className="textarea textarea-bordered rounded-2xl h-32 border-error/50" 
                      placeholder="Critical information: Vet name, hospital location, major health risks."
                      defaultValue={currentSitterInstructions.emergencyNotes}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Behavioral Notes</span></label>
                    <textarea 
                      name="behavioralNotes"
                      className="textarea textarea-bordered rounded-2xl h-32" 
                      placeholder="e.g. Scared of thunder. Loves belly rubs. Do not approach other dogs on walks."
                      defaultValue={currentSitterInstructions.behavioralNotes}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Favorite Toys & Routines</span></label>
                    <textarea 
                      name="favoriteToys"
                      className="textarea textarea-bordered rounded-2xl h-32" 
                      placeholder="e.g. Favorite ball is the blue one. Loves the 3pm walk around the lake."
                      defaultValue={currentSitterInstructions.favoriteToys}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Walk Routine & Outdoor Safety</span></label>
                    <textarea 
                      name="walkRoutine"
                      className="textarea textarea-bordered rounded-2xl h-32" 
                      placeholder="e.g. Wakes up at 7am, walks on leash only, avoids busy crosswalks."
                      defaultValue={currentSitterInstructions.walkRoutine}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Home & Access Instructions</span></label>
                    <textarea 
                      name="accessInstructions"
                      className="textarea textarea-bordered rounded-2xl h-32" 
                      placeholder="e.g. Front door code, where keys are kept, cleaning routines, and off-limit rooms."
                      defaultValue={currentSitterInstructions.accessInstructions}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">House Rules & Key Locations</span></label>
                    <textarea 
                      name="keyLocations"
                      className="textarea textarea-bordered rounded-2xl h-32" 
                      placeholder="e.g. Bed is off limits, treats in pantry, first aid kit behind the dog door."
                      defaultValue={currentSitterInstructions.keyLocations}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">House Rules Summary</span></label>
                    <textarea 
                      name="houseRules"
                      className="textarea textarea-bordered rounded-2xl h-24" 
                      placeholder="e.g. Do not leave the dog unattended outside; keep gates latched."
                      defaultValue={currentSitterInstructions.houseRules}
                    />
                  </div>
                  <div className="bg-info/10 p-6 rounded-[2rem] border border-info/20 mt-4">
                    <h4 className="font-bold flex items-center gap-2 mb-2 text-info-content">
                      <Info size={18} />
                      Tip for Pet Parents
                    </h4>
                    <p className="text-sm opacity-80">
                      Keep these instructions updated regularly, especially if your dog's medication or diet changes. You can print this section separately for your sitter!
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lost Pet Flyer Tab */}
        {activeTab === 'flyer' && selectedDog && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 no-print">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Side */}
              <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200">
                <h2 className="text-2xl font-bold mb-6">Flyer Information</h2>
                <form onSubmit={handleFlyerSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold">Last Seen Date</span></label>
                      <input name="lastSeenDate" type="date" className="input input-bordered rounded-2xl" defaultValue={currentFlyer.lastSeenDate} />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold">Reward</span></label>
                      <input name="reward" type="text" placeholder="e.g. $500" className="input input-bordered rounded-2xl" defaultValue={currentFlyer.reward} />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Last Seen Location</span></label>
                    <input name="lastSeenLocation" type="text" placeholder="e.g. Central Park West Entrance" className="input input-bordered rounded-2xl" defaultValue={currentFlyer.lastSeenLocation} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Contact Phone</span></label>
                    <input name="contactPhone" type="tel" className="input input-bordered rounded-2xl" defaultValue={currentFlyer.contactPhone} />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Photo URLs</span></label>
                    <textarea 
                      name="photoUrls"
                      className="textarea textarea-bordered rounded-2xl h-24" 
                      placeholder="Add image URLs separated by commas for flyer and social sharing."
                      defaultValue={currentFlyer.photoUrls?.join(', ')}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Shareable QR Code Link</span></label>
                    <input 
                      name="qrData"
                      type="text"
                      className="input input-bordered rounded-2xl"
                      placeholder="e.g. https://porchpaw.com/lost/dog123"
                      defaultValue={currentFlyer.qrData}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Social Caption</span></label>
                    <textarea 
                      name="socialCaption"
                      className="textarea textarea-bordered rounded-2xl h-24" 
                      placeholder="A quick caption for social posts and neighborhood groups."
                      defaultValue={currentFlyer.socialCaption}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Description & Notes</span></label>
                    <textarea 
                      name="notes"
                      className="textarea textarea-bordered rounded-2xl h-32" 
                      placeholder="Describe any collar, unique markings, or temperament (e.g. 'Skittish, do not chase')."
                      defaultValue={currentFlyer.notes}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary rounded-2xl w-full">Update Preview</button>
                </form>
              </div>

              {/* Preview Side */}
              <div id="flyer-preview" className="bg-white text-black p-8 shadow-2xl rounded-sm border-8 border-error flex flex-col items-center text-center">
                <h1 className="text-6xl font-black text-error mb-2 uppercase tracking-tighter">LOST DOG</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden border-2 border-black flex items-center justify-center">
                    {selectedDog.photoUrl ? (
                      <img src={selectedDog.photoUrl} alt={selectedDog.name} className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={64} className="text-gray-400" />
                    )}
                  </div>
                  <div className="space-y-4">
                    {currentFlyer.photoUrls?.slice(0, 3).map((url, index) => (
                      <div key={index} className="h-24 bg-gray-100 rounded-lg overflow-hidden border border-black">
                        <img src={url} alt={`Flyer photo ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {currentFlyer.photoUrls?.length === 0 && (
                      <div className="h-24 bg-gray-100 rounded-lg border border-dashed border-black flex items-center justify-center text-sm text-gray-500">
                        Add photo URLs to enhance your flyer.
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="text-5xl font-bold mb-2 uppercase">{selectedDog.name}</h2>
                <p className="text-xl font-semibold mb-6">{selectedDog.breed} • {selectedDog.birthDate} • Microchipped</p>
                
                <div className="bg-black text-white w-full py-4 px-6 rounded-lg mb-6">
                  <p className="text-2xl font-bold mb-1 uppercase">Last Seen:</p>
                  <p className="text-xl">{currentFlyer.lastSeenLocation || 'Location TBD'}</p>
                  <p className="text-lg">on {currentFlyer.lastSeenDate}</p>
                </div>

                <div className="flex-1 space-y-4">
                  <p className="text-xl italic">"{currentFlyer.notes || 'Please help us find our beloved family member.'}"</p>
                  {currentFlyer.reward && (
                    <p className="text-4xl font-black text-error bg-taupe-light inline-block px-6 py-2 rounded-lg transform -rotate-1">REWARD: {currentFlyer.reward}</p>
                  )}
                </div>

                <div className="mt-8 border-t-4 border-dashed border-gray-300 pt-8 w-full">
                  <p className="text-3xl font-black uppercase mb-2">PLEASE CONTACT:</p>
                  <p className="text-5xl font-black">{currentFlyer.contactPhone || '555-0199'}</p>
                </div>

                {currentFlyer.qrData && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center bg-black text-white p-4 rounded-2xl">
                    <div className="bg-white p-3 rounded-lg">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentFlyer.qrData)}`}
                        alt="QR code"
                        className="w-32 h-32"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-[0.25em] opacity-70 flex items-center gap-2">
                        <Smartphone size={16} /> Scan for more details
                      </p>
                      <p className="text-lg font-bold break-words">{currentFlyer.qrData}</p>
                    </div>
                  </div>
                )}

                {currentFlyer.socialCaption && (
                  <div className="mt-6 bg-primary/10 text-primary p-4 rounded-2xl border border-primary/20">
                    <p className="text-sm uppercase tracking-[0.2em] font-bold mb-2">Social Caption</p>
                    <p className="text-sm">{currentFlyer.socialCaption}</p>
                  </div>
                )}

                <div className="mt-4 flex flex-col md:flex-row gap-4 no-print">
                  <button className="btn btn-error btn-outline rounded-xl" onClick={() => window.print()}>
                    <Download size={18} /> Download PDF
                  </button>
                  <button className="btn btn-ghost rounded-xl" onClick={handleShareFlyer}>
                    <Share2 size={18} /> Share Digital
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Packet Tab */}
        {activeTab === 'packet' && selectedDog && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-base-200 p-8 rounded-[2.5rem] mb-6 no-print text-center">
              <h2 className="text-xl font-bold mb-2">Emergency Care Packet Preview</h2>
              <p className="opacity-70 mb-6">This packet includes all vital health records, contacts, and instructions in one place.</p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <button className="btn btn-primary rounded-2xl px-12" onClick={() => window.print()}>
                  <Printer size={18} />
                  Print Packet Now
                </button>
                <button className="btn btn-outline rounded-2xl px-12" onClick={handleExportPacketPdf} disabled={isExporting}>
                  <Download size={18} />
                  {isExporting ? 'Exporting PDF...' : 'Download PDF'}
                </button>
              </div>
            </div>
            <div className="print-only-container">
              <EmergencyPacket 
                dog={selectedDog}
                vaccines={vaccines.filter(v => v.dogId === selectedDog.id)}
                medications={medications.filter(m => m.dogId === selectedDog.id)}
                allergies={allergies.filter(a => a.dogId === selectedDog.id)}
                contacts={emergencyContacts}
                instructions={sitterInstructions.find(s => s.dogId === selectedDog.id)}
              />
            </div>
            <div
              ref={packetRef}
              style={{
                position: 'absolute',
                left: -9999,
                top: 0,
                width: 794, // ~A4 width in px at 72dpi
                background: '#ffffff',
              }}
              aria-hidden
            >
              <EmergencyPacket 
                dog={selectedDog}
                vaccines={vaccines.filter(v => v.dogId === selectedDog.id)}
                medications={medications.filter(m => m.dogId === selectedDog.id)}
                allergies={allergies.filter(a => a.dogId === selectedDog.id)}
                contacts={emergencyContacts}
                instructions={sitterInstructions.find(s => s.dogId === selectedDog.id)}
              />
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 no-print">
            <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="text-error" />
                Emergency Preparedness Tips
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="bg-error/10 text-error p-2 h-fit rounded-lg font-bold">01</div>
                  <p className="text-sm"><strong>Emergency Kit:</strong> Keep a 7-day supply of food, water, and medications in a waterproof container.</p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-error/10 text-error p-2 h-fit rounded-lg font-bold">02</div>
                  <p className="text-sm"><strong>ID Tags:</strong> Ensure your dog's ID tags and microchip info are current with your latest phone number.</p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-error/10 text-error p-2 h-fit rounded-lg font-bold">03</div>
                  <p className="text-sm"><strong>First Aid:</strong> Learn basic pet CPR and have a pet-specific first aid kit at home and in your car.</p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-error/10 text-error p-2 h-fit rounded-lg font-bold">04</div>
                  <p className="text-sm"><strong>Documentation:</strong> Keep digital and physical copies of vaccination records, especially Rabies.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/10 rounded-[2.5rem] p-8 border border-primary/20">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                <Heart />
                Community & Help
              </h3>
              <div className="space-y-4">
                <div className="bg-base-100 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold">ASPCA Poison Control</p>
                    <p className="text-sm opacity-60">(888) 426-4435</p>
                  </div>
                  <button className="btn btn-sm btn-circle btn-ghost"><Phone size={18} /></button>
                </div>
                <div className="bg-base-100 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold">Pet Poison Helpline</p>
                    <p className="text-sm opacity-60">(855) 764-7661</p>
                  </div>
                  <button className="btn btn-sm btn-circle btn-ghost"><Phone size={18} /></button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-center opacity-60">Keep these numbers saved in your phone contacts as well for instant access during a crisis.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="modal modal-open no-print">
          <div className="modal-box rounded-[2.5rem] max-w-md">
            <h3 className="font-bold text-xl mb-6">{editingContact ? 'Edit Contact' : 'Add Emergency Contact'}</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Name</span></label>
                <input 
                  type="text" 
                  className="input input-bordered rounded-2xl" 
                  value={contactFormData.name}
                  onChange={e => setContactFormData({...contactFormData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Relationship / Role</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. Neighbor, Vet, Brother"
                  className="input input-bordered rounded-2xl" 
                  value={contactFormData.relationship}
                  onChange={e => setContactFormData({...contactFormData, relationship: e.target.value})}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Phone</span></label>
                <input 
                  type="tel" 
                  className="input input-bordered rounded-2xl" 
                  value={contactFormData.phone}
                  onChange={e => setContactFormData({...contactFormData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Email (Optional)</span></label>
                <input 
                  type="email" 
                  className="input input-bordered rounded-2xl" 
                  value={contactFormData.email}
                  onChange={e => setContactFormData({...contactFormData, email: e.target.value})}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Contact Priority</span></label>
                <select
                  className="select select-bordered rounded-2xl"
                  value={contactFormData.priority}
                  onChange={e => setContactFormData({...contactFormData, priority: e.target.value as EmergencyContact['priority']})}
                >
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Backup">Backup</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary rounded-lg" 
                    checked={contactFormData.isPrimary}
                    onChange={e => setContactFormData({...contactFormData, isPrimary: e.target.checked})}
                  />
                  <span className="label-text font-semibold">Primary Contact</span>
                </label>
              </div>
              <div className="modal-action gap-3">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setIsContactModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Save</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsContactModalOpen(false)}></div>
        </div>
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print, .tabs, .btn, .dog-selector, .modal, .modal-backdrop {
            display: none !important;
          }
          body {
            background-color: white !important;
          }
          .p-6 {
            padding: 0 !important;
          }
          .print-only-container {
            display: block !important;
          }
          #flyer-preview {
            box-shadow: none !important;
            border-width: 12pt !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Emergency;
