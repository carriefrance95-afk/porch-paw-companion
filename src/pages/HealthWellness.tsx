import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import HealthSection from '../components/HealthSection';
import { Syringe, Pill, AlertTriangle, Activity, ChevronRight, PawPrint, X } from 'lucide-react';
import { VaccineRecord, Medication, Allergy, Surgery } from '../types';

const HealthWellness: React.FC = () => {
  const { 
    profiles, vaccines, medications, allergies, surgeries,
    addVaccine, addMedication, addAllergy, addSurgery 
  } = usePets();
  
  const [selectedDogId, setSelectedDogId] = useState<string>(profiles[0]?.id || '');
  const [modalType, setModalType] = useState<'vaccine' | 'medication' | 'allergy' | 'surgery' | null>(null);

  const selectedDog = profiles.find(p => p.id === selectedDogId);
  
  const dogVaccines = vaccines.filter(v => v.dogId === selectedDogId);
  const dogMedications = medications.filter(m => m.dogId === selectedDogId);
  const dogAllergies = allergies.filter(a => a.dogId === selectedDogId);
  const dogSurgeries = surgeries.filter(s => s.dogId === selectedDogId);

  const [newVaccine, setNewVaccine] = useState<Partial<VaccineRecord>>({ vaccineName: '', dateAdministered: '', nextDueDate: '' });
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({ name: '', dosage: '', frequency: '', startDate: '', active: true });
  const [newAllergy, setNewAllergy] = useState<Partial<Allergy>>({ allergen: '', severity: 'low' });
  const [newSurgery, setNewSurgery] = useState<Partial<Surgery>>({ procedure: '', date: '' });

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    addVaccine({ ...newVaccine as VaccineRecord, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewVaccine({ vaccineName: '', dateAdministered: '', nextDueDate: '' });
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    addMedication({ ...newMedication as Medication, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewMedication({ name: '', dosage: '', frequency: '', startDate: '', active: true });
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    addAllergy({ ...newAllergy as Allergy, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewAllergy({ allergen: '', severity: 'low' });
  };

  const handleAddSurgery = (e: React.FormEvent) => {
    e.preventDefault();
    addSurgery({ ...newSurgery as Surgery, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewSurgery({ procedure: '', date: '' });
  };

  if (profiles.length === 0) {
    return (
      <div className="p-6 text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No Dog Profiles Found</h2>
        <p className="opacity-70 mb-6">Please create a dog profile first to track their health.</p>
        <a href="/profiles" className="btn btn-primary">Go to Profiles</a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary">Health & Wellness</h1>
          <p className="text-neutral-content opacity-70">Track medical records and wellness history</p>
        </div>
        
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-outline btn-primary gap-2 bg-base-100">
            <PawPrint size={18} />
            {selectedDog?.name || 'Select Dog'}
            <ChevronRight size={18} className="rotate-90" />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {profiles.map(p => (
              <li key={p.id}><button onClick={() => setSelectedDogId(p.id)}>{p.name}</button></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HealthSection title="Vaccinations" icon={<Syringe size={20} />} onAdd={() => setModalType('vaccine')}>
          {dogVaccines.length === 0 ? (
            <p className="text-sm opacity-50 py-4 text-center">No vaccine records found.</p>
          ) : (
            dogVaccines.map(v => (
              <div key={v.id} className="flex justify-between items-center p-3 bg-base-200 rounded-xl border border-base-300">
                <div>
                  <p className="font-bold text-sm">{v.vaccineName}</p>
                  <p className="text-xs opacity-70">Administered: {v.dateAdministered}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-primary">Next due:</p>
                  <p className="text-xs">{v.nextDueDate}</p>
                </div>
              </div>
            ))
          )}
        </HealthSection>

        <HealthSection title="Medications" icon={<Pill size={20} />} onAdd={() => setModalType('medication')}>
          {dogMedications.length === 0 ? (
            <p className="text-sm opacity-50 py-4 text-center">No current medications.</p>
          ) : (
            dogMedications.map(m => (
              <div key={m.id} className="flex justify-between items-center p-3 bg-base-200 rounded-xl border border-base-300">
                <div>
                  <p className="font-bold text-sm">{m.name}</p>
                  <p className="text-xs opacity-70">{m.dosage} - {m.frequency}</p>
                </div>
                <div className={`badge badge-sm ${m.active ? 'badge-success' : 'badge-ghost opacity-50'}`}>
                  {m.active ? 'Active' : 'Completed'}
                </div>
              </div>
            ))
          )}
        </HealthSection>

        <HealthSection title="Allergies" icon={<AlertTriangle size={20} />} onAdd={() => setModalType('allergy')}>
          {dogAllergies.length === 0 ? (
            <p className="text-sm opacity-50 py-4 text-center">No known allergies.</p>
          ) : (
            dogAllergies.map(a => (
              <div key={a.id} className="flex justify-between items-center p-3 bg-base-200 rounded-xl border border-base-300">
                <p className="font-bold text-sm">{a.allergen}</p>
                <div className={`badge badge-sm ${
                  a.severity === 'high' ? 'badge-error' : a.severity === 'medium' ? 'badge-warning' : 'badge-info'
                }`}>
                  {a.severity}
                </div>
              </div>
            ))
          )}
        </HealthSection>

        <HealthSection title="Surgeries & Procedures" icon={<Activity size={20} />} onAdd={() => setModalType('surgery')}>
          {dogSurgeries.length === 0 ? (
            <p className="text-sm opacity-50 py-4 text-center">No surgery records.</p>
          ) : (
            dogSurgeries.map(s => (
              <div key={s.id} className="p-3 bg-base-200 rounded-xl border border-base-300">
                <p className="font-bold text-sm">{s.procedure}</p>
                <p className="text-xs opacity-70">{s.date}</p>
              </div>
            ))
          )}
        </HealthSection>
      </div>

      {/* Vaccine Modal */}
      {modalType === 'vaccine' && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-primary">Log Vaccination</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddVaccine} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Vaccine Name</span></label>
                <input type="text" required className="input input-bordered" value={newVaccine.vaccineName} onChange={e => setNewVaccine({...newVaccine, vaccineName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Administered Date</span></label>
                  <input type="date" required className="input input-bordered" value={newVaccine.dateAdministered} onChange={e => setNewVaccine({...newVaccine, dateAdministered: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Next Due Date</span></label>
                  <input type="date" required className="input input-bordered" value={newVaccine.nextDueDate} onChange={e => setNewVaccine({...newVaccine, nextDueDate: e.target.value})} />
                </div>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Add Record</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}

      {/* Medication Modal */}
      {modalType === 'medication' && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-primary">Add Medication</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddMedication} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Medication Name</span></label>
                <input type="text" required className="input input-bordered" value={newMedication.name} onChange={e => setNewMedication({...newMedication, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Dosage</span></label>
                  <input type="text" placeholder="e.g. 5mg" required className="input input-bordered" value={newMedication.dosage} onChange={e => setNewMedication({...newMedication, dosage: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Frequency</span></label>
                  <input type="text" placeholder="e.g. Daily" required className="input input-bordered" value={newMedication.frequency} onChange={e => setNewMedication({...newMedication, frequency: e.target.value})} />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Start Date</span></label>
                <input type="date" required className="input input-bordered" value={newMedication.startDate} onChange={e => setNewMedication({...newMedication, startDate: e.target.value})} />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Add Medication</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}
      
      {/* Allergy Modal */}
      {modalType === 'allergy' && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-primary">Log Allergy</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddAllergy} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Allergen</span></label>
                <input type="text" required className="input input-bordered" value={newAllergy.allergen} onChange={e => setNewAllergy({...newAllergy, allergen: e.target.value})} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Severity</span></label>
                <select className="select select-bordered" value={newAllergy.severity} onChange={e => setNewAllergy({...newAllergy, severity: e.target.value as any})}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Log Allergy</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}

      {/* Surgery Modal */}
      {modalType === 'surgery' && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-primary">Log Surgery / Procedure</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddSurgery} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Procedure Name</span></label>
                <input type="text" required className="input input-bordered" value={newSurgery.procedure} onChange={e => setNewSurgery({...newSurgery, procedure: e.target.value})} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Date</span></label>
                <input type="date" required className="input input-bordered" value={newSurgery.date} onChange={e => setNewSurgery({...newSurgery, date: e.target.value})} />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Log Surgery</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}
    </div>
  );
};

export default HealthWellness;
