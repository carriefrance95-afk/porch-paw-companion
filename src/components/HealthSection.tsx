import React from 'react';
import { Plus } from 'lucide-react';

interface HealthSectionProps {
  title: string;
  icon: React.ReactNode;
  onAdd: () => void;
  children: React.ReactNode;
}

const HealthSection: React.FC<HealthSectionProps> = ({ title, icon, onAdd, children }) => {
  return (
    <div className="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <button className="btn btn-ghost btn-sm btn-circle" onClick={onAdd}>
          <Plus size={20} />
        </button>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export default HealthSection;
