import React, { useState, useRef } from 'react';
import { usePets } from '../context/PetContext';
import DogCard from '../components/DogCard';
import { Plus, X, Camera, Loader2 } from 'lucide-react';
import { type DogProfile } from '../types';
import { useFileUpload } from '../hooks/useFileUpload';

const Profiles: React.FC = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = usePets();
  const { upload, isUploading } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<DogProfile | null>(null);
  
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

  const handleOpenAddModal = () => {
    setEditingProfile(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (profile: DogProfile) => {
    setEditingProfile(profile);
    setFormData(profile);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile? This will also remove all their health records.')) {
      deleteProfile(id);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { url } = await upload('dog-media', file);
        setFormData({ ...formData, photoUrl: url });
      } catch (err) {
        console.error('Upload failed:', err);
        alert('Failed to upload photo. Please try again.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProfile) {
      updateProfile({ ...editingProfile, ...formData } as DogProfile);
    } else {
      const profile: DogProfile = {
        ...formData as DogProfile,
        id: crypto.randomUUID(),
        weightHistory: formData.currentWeight ? [{ id: crypto.randomUUID(), date: new Date().toISOString().split('T')[0], weight: formData.currentWeight }] : []
      };
      addProfile(profile);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-primary">Dog Profiles</h1>
          <p className="text-neutral-content opacity-70">Manage your furry family members and their information</p>
        </div>
        <button 
          className="btn btn-primary gap-2 shadow-lg rounded-full px-6"
          onClick={handleOpenAddModal}
        >
          <Plus size={20} />
          Add New Dog
        </button>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300 shadow-inner">
          <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus size={48} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-neutral">No profiles yet</h2>
          <p className="opacity-60 mb-8 max-w-md mx-auto">Add your first dog to start tracking their vaccinations, weight, and special moments.</p>
          <button 
            className="btn btn-primary btn-lg rounded-full px-10 shadow-xl"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box max-w-3xl bg-base-100 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
            <div className="bg-primary p-8 text-primary-content flex justify-between items-center">
              <div>
                <h3 className="font-bold text-3xl">{editingProfile ? 'Edit Profile' : 'Add New Dog'}</h3>
                <p className="opacity-80 text-sm mt-1">{editingProfile ? `Updating info for ${editingProfile.name}` : 'Tell us about your furry friend'}</p>
              </div>
              <button className="btn btn-sm btn-circle btn-ghost bg-white/20 hover:bg-white/40 border-none" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex flex-col items-center mb-4">
                   <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                   />
                   <div 
                    className="avatar"
                    onClick={() => fileInputRef.current?.click()}
                   >
                      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-base-200 flex items-center justify-center cursor-pointer relative group overflow-hidden">
                        {isUploading ? (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                            <Loader2 size={24} className="text-primary animate-spin" />
                          </div>
                        ) : null}
                        {formData.photoUrl ? (
                          <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Camera size={32} className="text-primary/40" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-[10px] font-bold">CHANGE</span>
                        </div>
                      </div>
                   </div>
                   <p className="text-xs opacity-60 mt-2">Click avatar to upload photo</p>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-neutral/70">Dog's Name</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-base-200 focus:bg-base-100" 
                    placeholder="e.g. Buddy"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-neutral/70">Breed</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-base-200 focus:bg-base-100" 
                    placeholder="e.g. Golden Retriever"
                    required
                    value={formData.breed}
                    onChange={(e) => setFormData({...formData, breed: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-neutral/70">Birthday</span></label>
                  <input 
                    type="date" 
                    className="input input-bordered w-full rounded-2xl bg-base-200 focus:bg-base-100"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-neutral/70">Gotcha Day (Optional)</span></label>
                  <input 
                    type="date" 
                    className="input input-bordered w-full rounded-2xl bg-base-200 focus:bg-base-100"
                    value={formData.gotchaDate}
                    onChange={(e) => setFormData({...formData, gotchaDate: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-neutral/70">Weight (kg)</span></label>
                  <input 
                    type="number" 
                    step="0.1" 
                    className="input input-bordered w-full rounded-2xl bg-base-200 focus:bg-base-100" 
                    placeholder="e.g. 25.5"
                    required
                    value={formData.currentWeight || ''}
                    onChange={(e) => setFormData({...formData, currentWeight: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-neutral/70">Microchip ID</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-base-200 focus:bg-base-100" 
                    placeholder="Unique ID number"
                    value={formData.microchipId}
                    onChange={(e) => setFormData({...formData, microchipId: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-neutral/70">Insurance Provider</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-base-200 focus:bg-base-100" 
                    placeholder="Company name"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-neutral/70">Policy Number</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full rounded-2xl bg-base-200 focus:bg-base-100" 
                    placeholder="Policy #"
                    value={formData.insurancePolicyNumber}
                    onChange={(e) => setFormData({...formData, insurancePolicyNumber: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-10">
                <button type="button" className="btn btn-ghost flex-1 rounded-2xl" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary flex-1 rounded-2xl shadow-lg">{editingProfile ? 'Update Profile' : 'Create Profile'}</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Profiles;
