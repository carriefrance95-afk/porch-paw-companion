import React, { useEffect, useState } from 'react';
import { usePets } from '../context/PetContext';
import DogCard from '../components/DogCard';
import { Plus, X, Camera } from 'lucide-react';
import { type DogProfile } from '../types';

const Profiles: React.FC = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<DogProfile | null>(null);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState('');
  
  const initialFormState: Partial<DogProfile> = {
    name: '',
    breed: '',
    birthDate: '',
    gotchaDate: '',
    currentWeight: 0,
    microchipId: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    photoUrl: '',
  };

  const [formData, setFormData] = useState<Partial<DogProfile>>(initialFormState);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
      }
    };
  }, [photoPreviewUrl]);

  const handleOpenAddModal = () => {
    setEditingProfile(null);
    setFormData(initialFormState);
    setSelectedPhotoFile(null);
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
      setPhotoPreviewUrl('');
    }
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (profile: DogProfile) => {
    setEditingProfile(profile);
    setFormData(profile);
    setSelectedPhotoFile(null);
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
      setPhotoPreviewUrl('');
    }
    setIsModalOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPhotoFile(file);
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setPhotoPreviewUrl(localPreviewUrl);
    setFormData({ ...formData, photoUrl: localPreviewUrl });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile? This will also remove all their health records.')) {
      deleteProfile(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profilePhotoUrl = photoPreviewUrl || formData.photoUrl || '';

    if (editingProfile) {
      updateProfile({ ...editingProfile, ...formData, photoUrl: profilePhotoUrl } as DogProfile);
    } else {
      const profile: DogProfile = {
        ...formData as DogProfile,
        photoUrl: profilePhotoUrl,
        id: crypto.randomUUID(),
        weightHistory: formData.currentWeight ? [{ id: crypto.randomUUID(), date: new Date().toISOString().split('T')[0], weight: formData.currentWeight }] : []
      };
      addProfile(profile);
    }
    setSelectedPhotoFile(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-brandCharcoal mb-1 font-serif">Dog Profiles</h1>
          <p className="opacity-70 text-sm font-medium">Manage your furry family members and their information</p>
        </div>
        <button 
          className="btn gap-2 shadow-lg rounded-full px-6 bg-[#B55D3B] border-[#B55D3B] text-white hover:bg-[#9E5033] hover:border-[#9E5033]"
          onClick={handleOpenAddModal}
        >
          <Plus size={20} />
          Add New Dog
        </button>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300 shadow-inner">
          <div className="bg-[#B55D3B]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus size={48} className="text-[#B55D3B]" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-neutral font-serif">No profiles yet</h2>
          <p className="opacity-60 mb-8 max-w-md mx-auto">Add your first dog to start tracking their vaccinations, weight, and special moments.</p>
          <button 
            className="btn rounded-full px-10 shadow-xl bg-[#B55D3B] border-[#B55D3B] text-white hover:bg-[#9E5033]"
            onClick={handleOpenAddModal}
          >
            Add My Dog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {profiles.map((profile) => (
            <DogCard 
              key={profile.id} 
              profile={profile} 
              onEdit={handleOpenEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal Container */}
      {isModalOpen && (
        <div className="modal modal-open backdrop-blur-sm flex items-center justify-center p-4">
          {/* Container with explicit max-height and internal scrolling enabled */}
          <div className="modal-box w-full max-w-3xl max-h-[85vh] bg-[#FDFBF7] rounded-[2.5rem] p-0 overflow-y-auto shadow-2xl flex flex-col border border-brandTaupe/30">
            
            {/* Dark Charcoal Header Area - Explicit text white color mappings */}
            <div className="bg-[#2D2A27] p-8 flex justify-between items-center sticky top-0 z-50 border-b border-brandTaupe/20">
              <div className="text-left">
                <h3 className="font-bold text-3xl font-serif text-[#FDFBF7]">{editingProfile ? 'Edit Profile' : 'Add New Dog'}</h3>
                <p className="text-[#FDFBF7]/80 text-sm mt-1">{editingProfile ? `Updating info for ${editingProfile.name}` : 'Tell us about your furry friend'}</p>
              </div>
              <button className="btn btn-sm btn-circle bg-white/10 hover:bg-white/20 border-none text-white flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex flex-col items-center mb-4">
                   <div className="avatar">
                      <div className="w-24 h-24 rounded-full ring-2 ring-[#B55D3B] ring-offset-2 bg-base-200 flex items-center justify-center cursor-pointer relative group overflow-hidden">
                        {formData.photoUrl ? (
                          <img src={photoPreviewUrl || formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Camera size={32} className="text-[#B6A799]" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-[10px] font-bold">CHANGE</span>
                        </div>
                      </div>
                   </div>
                   <input type="file" accept="image/*" className="hidden" id="dog-photo-upload" onChange={handlePhotoUpload} />
                   <label htmlFor="dog-photo-upload" className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#7A7A59] px-5 py-3 font-bold text-white shadow-md hover:bg-[#6A6A4D] transition-colors">
                    📸 Upload Profile Photo
                   </label>
                   {selectedPhotoFile && (
                    <p className="mt-2 text-xs text-neutral/70">Selected: {selectedPhotoFile.name}</p>
                   )}
                </div>

                <div className="form-control text-left">
                  <label className="label"><span className="label-text font-bold text-[#2D2A27]">Dog's Name</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-white text-[#2D2A27] border-brandTaupe/40 focus:border-[#B55D3B]" 
                    placeholder="e.g. Buddy"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-control text-left">
                  <label className="label"><span className="label-text font-bold text-[#2D2A27]">Breed</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-white text-[#2D2A27] border-brandTaupe/40 focus:border-[#B55D3B]" 
                    placeholder="e.g. Golden Retriever"
                    required
                    value={formData.breed || ''}
                    onChange={(e) => setFormData({...formData, breed: e.target.value})}
                  />
                </div>
                <div className="form-control text-left">
                  <label className="label"><span className="label-text font-bold text-[#2D2A27]">Birthday</span></label>
                  <input 
                    type="date" 
                    className="input input-bordered w-full rounded-2xl bg-white text-[#2D2A27] border-brandTaupe/40 focus:border-[#B55D3B]"
                    required
                    value={formData.birthDate || ''}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>
                <div className="form-control text-left">
                  <label className="label"><span className="label-text font-bold text-[#2D2A27]">Gotcha Day (Optional)</span></label>
                  <input 
                    type="date" 
                    className="input input-bordered w-full rounded-2xl bg-white text-[#2D2A27] border-brandTaupe/40 focus:border-[#B55D3B]"
                    value={formData.gotchaDate || ''}
                    onChange={(e) => setFormData({...formData, gotchaDate: e.target.value})}
                  />
                </div>
                <div className="form-control text-left">
                  <label className="label"><span className="label-text font-bold text-[#2D2A27]">Weight (lb)</span></label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="input input-bordered w-full rounded-2xl bg-white text-[#2D2A27] border-brandTaupe/40 focus:border-[#B55D3B]" 
                    placeholder="e.g. 55.5"
                    required
                    value={formData.currentWeight || ''}
                    onChange={(e) => setFormData({...formData, currentWeight: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="form-control text-left">
                  <label className="label"><span className="label-text font-bold text-[#2D2A27]">Microchip ID</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-white text-[#2D2A27] border-brandTaupe/40 focus:border-[#B55D3B]" 
                    placeholder="Unique ID number"
                    value={formData.microchipId || ''}
                    onChange={(e) => setFormData({...formData, microchipId: e.target.value})}
                  />
                </div>
                <div className="form-control text-left">
                  <label className="label"><span className="label-text font-bold text-[#2D2A27]">Insurance Provider</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-white text-[#2D2A27] border-brandTaupe/40 focus:border-[#B55D3B]" 
                    placeholder="Company name"
                    value={formData.insuranceProvider || ''}
                    onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})}
                  />
                </div>
                <div className="form-control text-left">
                  <label className="label"><span className="label-text font-bold text-[#2D2A27]">Policy Number</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-white text-[#2D2A27] border-brandTaupe/40 focus:border-[#B55D3B]" 
                    placeholder="Policy #"
                    value={formData.insurancePolicyNumber || ''}
                    onChange={(e) => setFormData({...formData, insurancePolicyNumber: e.target.value})}
                  />
                </div>
              </div>
              
              {/* Form Action Controls */}
              <div className="flex gap-4 mt-10">
                <button type="button" className="btn btn-ghost flex-1 rounded-2xl border-brandTaupe/40 bg-white text-[#2D2A27]" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn flex-1 rounded-2xl shadow-lg bg-[#B55D3B] border-[#B55D3B] text-white hover:bg-[#9E5033]">
                  {editingProfile ? 'Update Profile' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Profiles;