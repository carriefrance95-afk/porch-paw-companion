import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { type EmergencyContact, type PetSitterInstructions, type LostPetFlyer } from '../types';
import { 
  Phone, Users, ClipboardList, Map, Printer, Plus, Trash2, Edit, Save, 
  AlertCircle, ShieldAlert, Heart, Info, Camera, Share2, Download
} from 'lucide-react';
import EmergencyPacket from '../components/EmergencyPacket';

const Emergency: React.FC = () => {
  const { 
    profiles, vaccines, medications, allergies, emergencyContacts, addEmergencyContact, updateEmergencyContact, deleteEmergencyContact,
    sitterInstructions, updateSitterInstructions,
    lostPetFlyers, updateLostPetFlyer
  } = usePets();

  const [activeTab, setActiveTab] = useState<'contacts' | 'sitter' | 'flyer' | 'packet' | 'resources'>('contacts');
  const [selectedDogId, setSelectedDogId] = useState<string>(profiles[0]?.id || '');
  
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [contactFormData, setContactFormData] = useState<Partial<EmergencyContact>>({
    isPrimary: false
  });

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
    emergencyNotes: ''
  };

  const currentFlyer = lostPetFlyers.find(f => f.dogId === selectedDogId) || {
    dogId: selectedDogId,
    lastSeenDate: new Date().toISOString().split('T')[0],
    lastSeenLocation: '',
    reward: '',
    contactPhone: '',
    notes: ''
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
    });
    alert('Sitter instructions saved!');
  };

  const handleFlyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    updateLostPetFlyer({
      dogId: selectedDogId,
      lastSeenDate: formData.get('lastSeenDate') as string,
      lastSeenLocation: formData.get('lastSeenLocation') as string,
      reward: formData.get('reward') as string,
      contactPhone: formData.get('contactPhone') as string,
      notes: formData.get('notes') as string,
    });
    alert('Flyer information updated!');
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
              {emergencyContacts.map(contact => (
                <div key={contact.id} className={`bg-base-100 rounded-[2rem] p-6 shadow-sm border ${contact.isPrimary ? 'border-primary' : 'border-base-200'}`}>
                  {contact.isPrimary && (
                    <span className="badge badge-primary badge-sm mb-3">Primary Contact</span>
                  )}
                  <h3 className="text-lg font-bold mb-1">{contact.name}</h3>
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
                <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden my-6 border-2 border-black flex items-center justify-center">
                  {selectedDog.photoUrl ? (
                    <img src={selectedDog.photoUrl} alt={selectedDog.name} className="w-full h-full object-cover" />
                  ) : (
                    <Camera size={64} className="text-gray-400" />
                  )}
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
                    <p className="text-4xl font-black text-error bg-yellow-300 inline-block px-6 py-2 rounded-lg transform -rotate-1">REWARD: {currentFlyer.reward}</p>
                  )}
                </div>

                <div className="mt-8 border-t-4 border-dashed border-gray-300 pt-8 w-full">
                  <p className="text-3xl font-black uppercase mb-2">PLEASE CONTACT:</p>
                  <p className="text-5xl font-black">{currentFlyer.contactPhone || '555-0199'}</p>
                </div>
                
                <div className="mt-4 flex gap-4 no-print">
                  <button className="btn btn-error btn-outline rounded-xl" onClick={() => window.print()}>
                    <Download size={18} /> Download PDF
                  </button>
                  <button className="btn btn-ghost rounded-xl">
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
              <button className="btn btn-primary rounded-2xl px-12" onClick={() => window.print()}>
                <Printer size={18} />
                Print Packet Now
              </button>
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
