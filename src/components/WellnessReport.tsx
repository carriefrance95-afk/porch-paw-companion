import React from 'react';
import { usePets } from '../context/PetContext';
import { ShieldCheck, Calendar, Activity, Syringe, Pill } from 'lucide-react';

interface WellnessReportProps {
  dogId: string;
}

const WellnessReport: React.FC<WellnessReportProps> = ({ dogId }) => {
  const { profiles, vaccines, medications, allergies, surgeries } = usePets();
  const dog = profiles.find(p => p.id === dogId);

  if (!dog) return null;

  const activeMedications = medications.filter(m => m.dogId === dogId && m.active);
  const upcomingVaccines = vaccines
    .filter(v => v.dogId === dogId && new Date(v.nextDueDate) > new Date())
    .sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime());
  
  const recentSurgeries = surgeries
    .filter(s => s.dogId === dogId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return (
    <div className="bg-white text-neutral-800 p-8 rounded-[2rem] shadow-xl border-t-8 border-primary print:shadow-none print:border-none">
      <div className="flex justify-between items-start border-b border-base-200 pb-6 mb-6">
        <div>
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight">Wellness Report</h2>
          <p className="text-sm font-bold opacity-60">{new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
        </div>
        <div className="text-right">
          <h3 className="text-2xl font-black">{dog.name}</h3>
          <p className="text-sm opacity-70">{dog.breed}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-secondary mb-3">
              <Syringe size={14} /> Upcoming Vaccinations
            </h4>
            {upcomingVaccines.length > 0 ? (
              <div className="space-y-2">
                {upcomingVaccines.map(v => (
                  <div key={v.id} className="flex justify-between items-center p-3 bg-base-100 border border-base-200 rounded-xl">
                    <span className="text-sm font-bold">{v.vaccineName}</span>
                    <span className="text-xs font-black px-2 py-1 bg-primary/10 text-primary rounded-lg">{v.nextDueDate}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs opacity-50 italic">No upcoming vaccinations.</p>}
          </section>

          <section>
            <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-secondary mb-3">
              <Pill size={14} /> Active Medications
            </h4>
            {activeMedications.length > 0 ? (
              <div className="space-y-2">
                {activeMedications.map(m => (
                  <div key={m.id} className="p-3 bg-base-100 border border-base-200 rounded-xl">
                    <p className="text-sm font-bold">{m.name}</p>
                    <p className="text-xs opacity-60">{m.dosage} — {m.frequency}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs opacity-50 italic">No active medications.</p>}
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-secondary mb-3">
              <ShieldCheck size={14} /> Key Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-base-200 rounded-xl">
                <p className="text-[10px] uppercase font-black opacity-40">Current Weight</p>
                <p className="text-sm font-bold">{dog.currentWeight} kg</p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl">
                <p className="text-[10px] uppercase font-black opacity-40">Microchip</p>
                <p className="text-sm font-bold truncate">{dog.microchipId || 'N/A'}</p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl col-span-2">
                <p className="text-[10px] uppercase font-black opacity-40">Insurance</p>
                <p className="text-sm font-bold">{dog.insuranceProvider || 'None'} {dog.insurancePolicyNumber && `(#${dog.insurancePolicyNumber})`}</p>
              </div>
            </div>
          </section>

          <section>
            <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-secondary mb-3">
              <Activity size={14} /> Recent Procedures
            </h4>
            {recentSurgeries.length > 0 ? (
              <div className="space-y-2">
                {recentSurgeries.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-3 bg-base-100 border border-base-200 rounded-xl">
                    <span className="text-sm font-bold">{s.procedure}</span>
                    <span className="text-xs opacity-60">{s.date}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-xs opacity-50 italic">No recent procedures.</p>}
          </section>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-dashed border-base-300 text-center">
        <p className="text-[10px] font-black opacity-30">Generated by Porch & Paw Companion — The Heart of Your Dog's Home</p>
      </div>
    </div>
  );
};

export default WellnessReport;
