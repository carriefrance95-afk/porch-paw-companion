import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import DogCard from '../components/DogCard';
import { Plus, X } from 'lucide-react';
import { DogProfile } from '../types';

const Profiles: React.FC = () => {
  const { profiles, addProfile } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfile, setNewProfile] = useState<Partial<DogProfile>>({
    name: '',
    breed: '',
    birthDate: '',
    weight: 0,
    microchipId: '',
    insuranceProvider: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: DogProfile = {
      ...newProfile as DogProfile,
      id: crypto.randomUUID(),
    };
    addProfile(profile);
    setIsModalOpen(false);
    setNewProfile({
      name: '',
      breed: '',
      birthDate: '',
      weight: 0,
      microchipId: '',
      insuranceProvider: '',
    });
  };

  return (
    <div className=\"p-6 max-w-6xl mx-auto\">
      <div className=\"flex justify-between items-center mb-8\">
        <div>
          <h1 className=\"text-4xl font-bold text-primary\">Dog Profiles</h1>
          <p className=\"text-neutral-content opacity-70\">Manage your furry family members</p>
        </div>
        <button 
          className=\"btn btn-primary gap-2 shadow-lg\"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          Add New Dog
        </button>
      </div>

      {profiles.length === 0 ? (
        <div className=\"text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300\">
          <div className=\"bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4\">
            <Plus size={40} className=\"text-primary\" />
          </div>
          <h2 className=\"text-2xl font-bold mb-2\">No profiles yet</h2>
          <p className=\"opacity-70 mb-6\">Add your first dog to start tracking their wellness journey.</p>
          <button 
            className=\"btn btn-primary\"
            onClick={() => setIsModalOpen(true)}
          >
            Add My Dog
          </button>
        </div>
      ) : (
        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
          {profiles.map((profile) => (
            <DogCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className=\"modal modal-open\">
          <div className=\"modal-box max-w-2xl bg-base-100\">
            <div className=\"flex justify-between items-center mb-6\">
              <h3 className=\"font-bold text-2xl text-primary\">Add New Dog Profile</h3>
              <button className=\"btn btn-sm btn-circle btn-ghost\" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className=\"space-y-4\">
              <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                <div className=\"form-control\">
                  <label className=\"label\"><span className=\"label-text font-semibold\">Dog's Name</span></label>
                  <input 
                    type=\"text\" 
                    className=\"input input-bordered w-full\" 
                    placeholder=\"e.g. Buddy\"
                    required
                    value={newProfile.name}
                    onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
                  />
                </div>
                <div className=\"form-control\">
                  <label className=\"label\"><span className=\"label-text font-semibold\">Breed</span></label>
                  <input 
                    type=\"text\" 
                    className=\"input input-bordered w-full\" 
                    placeholder=\"e.g. Golden Retriever\"
                    required
                    value={newProfile.breed}
                    onChange={(e) => setNewProfile({...newProfile, breed: e.target.value})}
                  />
                </div>
                <div className=\"form-control\">
                  <label className=\"label\"><span className=\"label-text font-semibold\">Birth Date</span></label>
                  <input 
                    type=\"date\" 
                    className=\"input input-bordered w-full\"
                    required
                    value={newProfile.birthDate}
                    onChange={(e) => setNewProfile({...newProfile, birthDate: e.target.value})}
                  />
                </div>
                <div className=\"form-control\">
                  <label className=\"label\"><span className=\"label-text font-semibold\">Weight (kg)</span></label>
                  <input 
                    type=\"number\" 
                    step=\"0.1\"
                    className=\"input input-bordered w-full\" 
                    placeholder=\"e.g. 25.5\"
                    required
                    value={newProfile.weight || ''}
                    onChange={(e) => setNewProfile({...newProfile, weight: parseFloat(e.target.value)})}
                  />
                </div>
                <div className=\"form-control\">
                  <label className=\"label\"><span className=\"label-text font-semibold\">Microchip ID</span></label>
                  <input 
                    type=\"text\" 
                    className=\"input input-bordered w-full\" 
                    placeholder=\"Optional\"
                    value={newProfile.microchipId}
                    onChange={(e) => setNewProfile({...newProfile, microchipId: e.target.value})}
                  />
                </div>
                <div className=\"form-control\">
                  <label className=\"label\"><span className=\"label-text font-semibold\">Insurance Provider</span></label>
                  <input 
                    type=\"text\" 
                    className=\"input input-bordered w-full\" 
                    placeholder=\"Optional\"
                    value={newProfile.insuranceProvider}
                    onChange={(e) => setNewProfile({...newProfile, insuranceProvider: e.target.value})}
                  />
                </div>
              </div>
              
              <div className=\"modal-action pt-4\">
                <button type=\"button\" className=\"btn btn-ghost\" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type=\"submit\" className=\"btn btn-primary\">Save Profile</button>
              </div>
            </form>
          </div>
          <div className=\"modal-backdrop\" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Profiles;
