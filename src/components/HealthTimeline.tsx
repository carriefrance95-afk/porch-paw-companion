import React, { useMemo, useState } from 'react';
import { usePets } from '../context/PetContext';
import type { HealthEvent } from '../types';
import { Syringe, Pill, Activity, Stethoscope, AlertTriangle, Search, Filter } from 'lucide-react';

interface HealthTimelineProps {
  dogId: string;
}

const categoryFilters = [
  { type: 'vaccine' as const, label: 'Vaccinations' },
  { type: 'medication' as const, label: 'Medications' },
  { type: 'allergy' as const, label: 'Allergies' },
  { type: 'surgery' as const, label: 'Surgeries' },
  { type: 'vetVisit' as const, label: 'Vet Visits' },
];

const typeMeta = {
  vaccine: { icon: <Syringe size={16} />, label: 'Vaccination', badge: 'bg-primary/10 text-primary border border-primary/20' },
  medication: { icon: <Pill size={16} />, label: 'Medication', badge: 'bg-secondary/10 text-secondary border border-secondary/20' },
  allergy: { icon: <AlertTriangle size={16} />, label: 'Allergy', badge: 'bg-[#e7dfd8] text-[#7a7b5a] border border-[#d8d1c8]' },
  surgery: { icon: <Activity size={16} />, label: 'Surgery', badge: 'bg-primary/10 text-primary border border-primary/20' },
  vetVisit: { icon: <Stethoscope size={16} />, label: 'Vet Visit', badge: 'bg-secondary/10 text-secondary border border-secondary/20' },
};

const HealthTimeline: React.FC<HealthTimelineProps> = ({ dogId }) => {
  const { vaccines, medications, surgeries, vetVisits, allergies } = usePets();

  const [activeFilters, setActiveFilters] = useState<HealthEvent['type'][]>(categoryFilters.map(item => item.type));
  const [searchTerm, setSearchTerm] = useState('');

  const events: HealthEvent[] = useMemo(() => [
    ...vaccines.filter(v => v.dogId === dogId).map(v => ({ type: 'vaccine' as const, ...v })),
    ...medications.filter(m => m.dogId === dogId).map(m => ({ type: 'medication' as const, ...m })),
    ...surgeries.filter(s => s.dogId === dogId).map(s => ({ type: 'surgery' as const, ...s })),
    ...vetVisits.filter(v => v.dogId === dogId).map(v => ({ type: 'vetVisit' as const, ...v })),
    ...allergies.filter(a => a.dogId === dogId).map(a => ({ type: 'allergy' as const, ...a })),
  ].sort((a, b) => {
    const getDateString = (event: HealthEvent) => {
      if (event.type === 'vaccine') return event.dateAdministered;
      if (event.type === 'medication') return event.startDate;
      return event.date;
    };

    return new Date(getDateString(b)).getTime() - new Date(getDateString(a)).getTime();
  }), [allergies, dogId, medications, surgeries, vaccines, vetVisits]);

  const toggleFilter = (type: HealthEvent['type']) => {
    setActiveFilters(prev =>
      prev.includes(type) ? prev.filter(item => item !== type) : [...prev, type]
    );
  };

  const normalizeSearch = (value: string) => value.trim().toLowerCase();

  const visibleEvents = useMemo(() => {
    const query = normalizeSearch(searchTerm);
    return events.filter(event => {
      if (!activeFilters.includes(event.type)) return false;
      if (!query) return true;

      const searchable = [
        event.type,
        event.type === 'vaccine' ? event.vaccineName : '',
        event.type === 'medication' ? event.name : '',
        event.type === 'surgery' ? event.procedure : '',
        event.type === 'vetVisit' ? event.reason : '',
        event.type === 'allergy' ? event.allergen : '',
        'notes' in event && event.notes ? event.notes : '',
        'veterinarian' in event && event.veterinarian ? event.veterinarian : '',
      ].join(' ').toLowerCase();

      return searchable.includes(query);
    });
  }, [activeFilters, events, searchTerm]);

  const formatDate = (event: HealthEvent) => {
    const dateString = event.type === 'vaccine' ? event.dateAdministered : event.type === 'medication' ? event.startDate : event.date;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const getTitle = (event: HealthEvent) => {
    switch (event.type) {
      case 'vaccine': return `Vaccination: ${event.vaccineName}`;
      case 'medication': return `Medication Started: ${event.name}`;
      case 'surgery': return `Surgery: ${event.procedure}`;
      case 'vetVisit': return `Vet Visit: ${event.reason}`;
      case 'allergy': return `Allergy: ${event.allergen}`;
    }
  };

  const getSummary = (event: HealthEvent) => {
    switch (event.type) {
      case 'vaccine': {
        const overdue = event.nextDueDate ? new Date(event.nextDueDate).getTime() < new Date().getTime() : false;
        return `${overdue ? 'Overdue • ' : ''}Next due: ${event.nextDueDate || 'N/A'}`;
      }
      case 'medication': {
        const due = event.dueDate ? `Due ${event.dueDate}` : 'No due date';
        return `${event.dosage} • ${event.frequency} • ${event.active ? 'Active' : 'Inactive'} • ${due}`;
      }
      case 'surgery': return `Procedure on ${event.date}${event.followUpDate ? ` • Follow-up ${event.followUpDate}` : ''}`;
      case 'vetVisit': return `With ${event.veterinarian || 'Veterinarian'} on ${event.date}${event.followUpDate ? ` • Follow-up ${event.followUpDate}` : ''}`;
      case 'allergy': return `Severity: ${event.severity}${event.nextReviewDate ? ` • Review ${event.nextReviewDate}` : ''}`;
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-16 rounded-[2rem] bg-base-100 border border-base-200 shadow-sm">
        <p className="text-lg font-bold text-neutral">No health history has been recorded yet.</p>
        <p className="mt-3 text-sm opacity-70">Add vaccinations, medications, allergies, surgeries, or vet visits to build a complete timeline.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-neutral">Health Timeline</h3>
          <p className="mt-2 text-sm text-neutral opacity-70 max-w-2xl">Filter by category, search notes, and review every record in strict newest-to-oldest order.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label className="w-full sm:w-auto relative block">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search health records"
              className="input input-bordered rounded-full pl-12 pr-6 w-full bg-base-100 border-base-300 text-neutral"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setActiveFilters(categoryFilters.map(item => item.type));
              setSearchTerm('');
            }}
            className="btn btn-ghost btn-sm rounded-full gap-2 border border-base-300 text-neutral hover:bg-base-200"
          >
            <Filter size={16} /> Clear filters
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categoryFilters.map(filter => {
          const active = activeFilters.includes(filter.type);
          return (
            <button
              key={filter.type}
              type="button"
              onClick={() => toggleFilter(filter.type)}
              className={`btn btn-sm rounded-full normal-case px-4 ${active ? 'bg-primary text-primary-content border-primary' : 'btn-outline border-base-300 text-neutral'}`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-[2rem] border border-base-200 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <p className="text-sm font-semibold text-neutral">{visibleEvents.length} record{visibleEvents.length === 1 ? '' : 's'} displayed</p>
          <p className="text-sm text-neutral opacity-60">Sorted newest to oldest</p>
        </div>

        {visibleEvents.length === 0 ? (
          <div className="text-center py-16 text-neutral/70">
            No matching records found. Try broadening your filters or search terms.
          </div>
        ) : (
          <ul className="space-y-6">
            {visibleEvents.map((event, idx) => {
              const meta = typeMeta[event.type];
              const notes = 'notes' in event && event.notes ? event.notes : '';
              return (
                <li key={`${event.id}-${idx}`} className="grid gap-5 sm:grid-cols-[auto_1fr]">
                  <div className="relative flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className={`w-12 h-12 rounded-full flex items-center justify-center ${meta.badge}`}>
                      {meta.icon}
                    </span>
                    {idx < visibleEvents.length - 1 && <span className="mt-4 w-px h-full min-h-[2rem] bg-base-200"></span>}
                  </div>
                  <div className="rounded-[2rem] border border-base-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-primary opacity-80">
                          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                          {meta.label}
                        </div>
                        <h4 className="text-xl font-bold text-neutral">{getTitle(event)}</h4>
                        <p className="text-sm text-neutral opacity-70">{getSummary(event)}</p>
                        {event.attachments?.length ? (
                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-secondary opacity-80">{event.attachments.length} attachment{event.attachments.length > 1 ? 's' : ''}</p>
                        ) : null}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-neutral">{formatDate(event)}</p>
                      </div>
                    </div>
                    {notes && (
                      <div className="mt-5 rounded-[2rem] border border-base-200 bg-base-200/70 p-4 text-sm italic text-neutral opacity-90">
                        {notes}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HealthTimeline;
