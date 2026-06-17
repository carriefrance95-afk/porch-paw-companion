import React from 'react';
import { DogProfile } from '../types';
import { PawPrint, Calendar, Weight, Tag, ShieldCheck, Edit, Trash2 } from 'lucide-react';

interface DogCardProps {
  profile: DogProfile;
  onEdit?: (profile: DogProfile) => void;
  onDelete?: (id: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({ profile, onEdit, onDelete }) => {
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(profile.birthDate);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        <figure className="sm:w-1/3 h-48 sm:h-auto bg-base-200 relative overflow-hidden">
          {profile.photoUrl ? (
            <img src={profile.photoUrl} alt={profile.name} className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-primary/5 text-primary/20">
              <PawPrint size={64} />
            </div>
          )}
          <div className="absolute top-2 left-2 badge badge-primary font-bold">{age} {age === 1 ? 'Year' : 'Years'}</div>
        </figure>
        
        <div className="card-body sm:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="card-title text-2xl text-primary mb-0">{profile.name}</h2>
              <p className="text-sm font-medium opacity-60 italic">{profile.breed}</p>
            </div>
            <div className="flex gap-1">
              <button 
                className="btn btn-ghost btn-xs btn-circle text-neutral opacity-50 hover:opacity-100"
                onClick={(e) => { e.stopPropagation(); onEdit?.(profile); }}
              >
                <Edit size={14} />
              </button>
              <button 
                className="btn btn-ghost btn-xs btn-circle text-error opacity-50 hover:opacity-100"
                onClick={(e) => { e.stopPropagation(); onDelete?.(profile.id); }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
            <div className="flex items-center gap-2 text-xs">
              <Calendar size={14} className="text-primary" />
              <div className="flex flex-col">
                <span className="font-bold">Birthday</span>
                <span>{new Date(profile.birthDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Weight size={14} className="text-primary" />
              <div className="flex flex-col">
                <span className="font-bold">Weight</span>
                <span>{profile.currentWeight} kg</span>
              </div>
            </div>
            {profile.microchipId && (
              <div className="flex items-center gap-2 text-xs">
                <Tag size={14} className="text-primary" />
                <div className="flex flex-col">
                  <span className="font-bold">Microchip</span>
                  <span className="truncate">{profile.microchipId}</span>
                </div>
              </div>
            )}
            {profile.insuranceProvider && (
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck size={14} className="text-primary" />
                <div className="flex flex-col">
                  <span className="font-bold">Insurance</span>
                  <span className="truncate">{profile.insuranceProvider}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="card-actions justify-end mt-4">
            <a href={`/health?dogId=${profile.id}`} className="btn btn-primary btn-sm rounded-full">Health Records</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
