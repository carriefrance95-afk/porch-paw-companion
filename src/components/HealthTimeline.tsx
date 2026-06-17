import React from 'react';
import { usePets } from '../context/PetContext';
import { HealthEvent } from '../types';
import { Syringe, Pill, Activity, Stethoscope, AlertTriangle } from 'lucide-react';

interface HealthTimelineProps {
  dogId: string;
}

const HealthTimeline: React.FC<HealthTimelineProps> = ({ dogId }) => {
  const { vaccines, medications, surgeries, vetVisits, allergies } = usePets();

  const events: HealthEvent[] = [
    ...vaccines.filter(v => v.dogId === dogId).map(v => ({ type: 'vaccine' as const, ...v })),
    ...medications.filter(m => m.dogId === dogId).map(m => ({ type: 'medication' as const, ...m })),
    ...surgeries.filter(s => s.dogId === dogId).map(s => ({ type: 'surgery' as const, ...s })),
    ...vetVisits.filter(v => v.dogId === dogId).map(v => ({ type: 'vetVisit' as const, ...v })),
    ...allergies.filter(a => a.dogId === dogId).map(a => ({ type: 'allergy' as const, ...a })),
  ].sort((a, b) => {
    const dateA = 'dateAdministered' in a ? a.dateAdministered : 'startDate' in a ? a.startDate : a.date;
    const dateB = 'dateAdministered' in b ? b.dateAdministered : 'startDate' in b ? b.startDate : b.date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'vaccine': return <Syringe size={16} />;
      case 'medication': return <Pill size={16} />;
      case 'surgery': return <Activity size={16} />;
      case 'vetVisit': return <Stethoscope size={16} />;
      case 'allergy': return <AlertTriangle size={16} />;
      default: return null;
    }
  };

  const getTitle = (event: HealthEvent) => {
    switch (event.type) {
      case 'vaccine': return `Vaccination: ${event.vaccineName}`;
      case 'medication': return `Started Medication: ${event.name}`;
      case 'surgery': return `Surgery: ${event.procedure}`;
      case 'vetVisit': return `Vet Visit: ${event.reason}`;
      case 'allergy': return `Allergy Logged: ${event.allergen}`;
    }
  };

  const getDate = (event: HealthEvent) => {
    if ('dateAdministered' in event) return event.dateAdministered;
    if ('startDate' in event) return event.startDate;
    return event.date;
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-10 opacity-50 italic">
        No health events recorded yet.
      </div>
    );
  }

  return (
    <ul className="timeline timeline-vertical timeline-compact">
      {events.map((event, idx) => (
        <li key={idx}>
          <hr className={idx === 0 ? 'bg-primary' : ''} />
          <div className="timeline-middle">
            <div className={`p-2 rounded-full ${
              event.type === 'vaccine' ? 'bg-blue-100 text-blue-600' :
              event.type === 'medication' ? 'bg-green-100 text-green-600' :
              event.type === 'surgery' ? 'bg-red-100 text-red-600' :
              event.type === 'vetVisit' ? 'bg-purple-100 text-purple-600' :
              'bg-orange-100 text-orange-600'
            }`}>
              {getIcon(event.type)}
            </div>
          </div>
          <div className="timeline-end timeline-box border-base-300 shadow-sm mb-4 ml-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="font-bold text-sm">{getTitle(event)}</p>
                <p className="text-xs opacity-70">{new Date(getDate(event)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            {('notes' in event && event.notes) && (
              <p className="text-xs mt-2 p-2 bg-base-200 rounded-lg italic">
                "{event.notes}"
              </p>
            )}
          </div>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default HealthTimeline;
