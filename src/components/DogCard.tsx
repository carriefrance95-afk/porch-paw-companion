import React from 'react';
import { DogProfile } from '../types';
import { PawPrint, Calendar, Weight, Tag, ShieldCheck } from 'lucide-react';

interface DogCardProps {
  profile: DogProfile;
  onClick?: () => void;
}

const DogCard: React.FC<DogCardProps> = ({ profile, onClick }) => {
  return (
    <div 
      className=\"card card-side bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border border-base-200\"
      onClick={onClick}
    >
      <figure className=\"w-1/3 bg-base-200\">
        {profile.photoUrl ? (
          <img src={profile.photoUrl} alt={profile.name} className=\"object-cover h-full w-full\" />
        ) : (
          <div className=\"flex items-center justify-center h-full w-full bg-primary/10 text-primary\">
            <PawPrint size={48} />
          </div>
        )}
      </figure>
      <div className=\"card-body w-2/3\">
        <h2 className=\"card-title text-2xl text-primary\">{profile.name}</h2>
        <p className=\"text-sm font-medium opacity-70\">{profile.breed}</p>
        
        <div className=\"grid grid-cols-2 gap-2 mt-2\">
          <div className=\"flex items-center gap-2 text-xs\">
            <Calendar size={14} className=\"text-primary\" />
            <span>{new Date(profile.birthDate).toLocaleDateString()}</span>
          </div>
          <div className=\"flex items-center gap-2 text-xs\">
            <Weight size={14} className=\"text-primary\" />
            <span>{profile.weight} kg</span>
          </div>
          {profile.microchipId && (
            <div className=\"flex items-center gap-2 text-xs\">
              <Tag size={14} className=\"text-primary\" />
              <span className=\"truncate\">{profile.microchipId}</span>
            </div>
          )}
          {profile.insuranceProvider && (
            <div className=\"flex items-center gap-2 text-xs\">
              <ShieldCheck size={14} className=\"text-primary\" />
              <span className=\"truncate\">{profile.insuranceProvider}</span>
            </div>
          )}
        </div>
        
        <div className=\"card-actions justify-end mt-4\">
          <button className=\"btn btn-primary btn-sm\">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
