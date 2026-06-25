import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import HealthSection from '../components/HealthSection';
import HealthTimeline from '../components/HealthTimeline';
import WeightHistory from '../components/WeightHistory';
import WellnessReport from '../components/WellnessReport';
import { 
  Syringe, Pill, AlertTriangle, Activity, ChevronRight, 
  PawPrint, X, Stethoscope, Clock, FileText, Printer, Scale
} from 'lucide-react';
import { type VaccineRecord, type Medication, type Allergy, type Surgery, type VetVisit, type Attachment } from '../types';

const HealthWellness: React.FC = () => {
  const { 
    profiles, vaccines, medications, allergies, surgeries, vetVisits,
    addVaccine, addMedication, addAllergy, addSurgery, addVetVisit 
  } = usePets();
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dogIdFromUrl = queryParams.get('dogId');

  const [selectedDogId, setSelectedDogId] = useState<string>(dogIdFromUrl || profiles[0]?.id || '');
  const [modalType, setModalType] = useState<'vaccine' | 'medication' | 'allergy' | 'surgery' | 'vetVisit' | 'report' | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'weight'>('overview');

  const selectedDog = profiles.find(p => p.id === selectedDogId);
  
  const dogVaccines = vaccines.filter(v => v.dogId === selectedDogId);
  const dogMedications = medications.filter(m => m.dogId === selectedDogId);
  const dogAllergies = allergies.filter(a => a.dogId === selectedDogId);
  const dogSurgeries = surgeries.filter(s => s.dogId === selectedDogId);
  const dogVetVisits = vetVisits.filter(v => v.dogId === selectedDogId);

  // Form States
  const [newVaccine, setNewVaccine] = useState<Partial<VaccineRecord>>({ vaccineName: '', dateAdministered: '', nextDueDate: '', notes: '', attachments: [] });
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({ name: '', dosage: '', frequency: '', startDate: '', dueDate: '', active: true, notes: '', attachments: [] });
  const [newAllergy, setNewAllergy] = useState<Partial<Allergy>>({ allergen: '', severity: 'low', date: '', nextReviewDate: '', notes: '', attachments: [] });
  const [newSurgery, setNewSurgery] = useState<Partial<Surgery>>({ procedure: '', date: '', followUpDate: '', notes: '', attachments: [] });
  const [newVetVisit, setNewVetVisit] = useState<Partial<VetVisit>>({ date: '', reason: '', notes: '', veterinarian: '', followUpDate: '', attachments: [] });

  const isOverdue = (date?: string) => {
    if (!date) return false;
    const today = new Date(new Date().toISOString().split('T')[0]);
    return new Date(date).getTime() < today.getTime();
  };

  function updateAttachmentField<T extends { attachments?: Attachment[] }>(
    setter: React.Dispatch<React.SetStateAction<Partial<T>>>,
    index: number,
    key: 'label' | 'url',
    value: string
  ) {
    setter(prev => {
      const attachments = prev.attachments ? [...prev.attachments] : [];
      attachments[index] = { ...attachments[index], [key]: value } as Attachment;
      return { ...prev, attachments };
    });
  }

  function addAttachment<T extends { attachments?: Attachment[] }>(setter: React.Dispatch<React.SetStateAction<Partial<T>>>) {
    setter(prev => ({
      ...prev,
      attachments: [ ...(prev.attachments || []), { id: crypto.randomUUID(), label: '', url: '' } ]
    }));
  }

  function removeAttachment<T extends { attachments?: Attachment[] }>(
    setter: React.Dispatch<React.SetStateAction<Partial<T>>>,
    index: number
  ) {
    setter(prev => ({
      ...prev,
      attachments: prev.attachments?.filter((_, idx) => idx !== index) || []
    }));
  }

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    addVaccine({ ...newVaccine as VaccineRecord, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewVaccine({ vaccineName: '', dateAdministered: '', nextDueDate: '', notes: '', attachments: [] });
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    addMedication({ ...newMedication as Medication, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewMedication({ name: '', dosage: '', frequency: '', startDate: '', dueDate: '', active: true, notes: '', attachments: [] });
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    addAllergy({ ...newAllergy as Allergy, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewAllergy({ allergen: '', severity: 'low', date: '', nextReviewDate: '', notes: '', attachments: [] });
  };

  const handleAddSurgery = (e: React.FormEvent) => {
    e.preventDefault();
    addSurgery({ ...newSurgery as Surgery, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewSurgery({ procedure: '', date: '', followUpDate: '', notes: '', attachments: [] });
  };

  const handleAddVetVisit = (e: React.FormEvent) => {
    e.preventDefault();
    addVetVisit({ ...newVetVisit as VetVisit, id: crypto.randomUUID(), dogId: selectedDogId });
    setModalType(null);
    setNewVetVisit({ date: '', reason: '', notes: '', veterinarian: '', followUpDate: '', attachments: [] });
  };

  if (profiles.length === 0) {
    return (
      <div className="p-6 text-center py-24 bg-base-200 min-h-screen">
        <div className="max-w-md mx-auto bg-base-100 p-10 rounded-[3rem] shadow-xl border border-base-300">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <PawPrint size={40} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">No Dog Profiles Found</h2>
          <p className="opacity-70 mb-8">Please create a dog profile first to start tracking their medical records and wellness history.</p>
          <a href="/profiles" className="btn btn-primary rounded-full px-8">Create First Profile</a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto mb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="avatar">
            <div className="w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
              {selectedDog?.photoUrl ? (
                <img src={selectedDog.photoUrl} alt="Dog" />
              ) : (
                <PawPrint size={32} className="text-primary" />
              )}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-black text-primary tracking-tight">{selectedDog?.name}'s Wellness</h1>
            <p className="text-neutral-content font-bold opacity-60 flex items-center gap-2">
              {selectedDog?.breed} <span className="text-primary/30 text-xs">•</span> {selectedDog?.currentWeight} kg
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="btn btn-ghost border-base-300 bg-base-100 rounded-2xl gap-2" onClick={() => setModalType('report')}>
            <Printer size={18} /> <span className="hidden sm:inline">Wellness Report</span>
          </button>
          
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-primary rounded-2xl gap-2 shadow-lg">
              <ChevronRight size={18} className="rotate-90" />
              Switch Profile
            </div>
            <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-60 mt-2 border border-base-200">
              <li className="menu-title opacity-50">Your Furry Family</li>
              {profiles.map(p => (
                <li key={p.id}>
                  <button 
                    className={`rounded-xl py-3 ${selectedDogId === p.id ? 'bg-primary/10 text-primary font-bold' : ''}`}
                    onClick={() => setSelectedDogId(p.id)}
                  >
                    <PawPrint size={14} /> {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="tabs tabs-box bg-base-200 p-1 rounded-[2rem] inline-flex mb-8">
        <button 
          className={`tab px-8 h-12 rounded-[1.8rem] font-bold transition-all ${activeTab === 'overview' ? 'tab-active bg-base-100 shadow-md !text-primary' : 'opacity-50'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab px-8 h-12 rounded-[1.8rem] font-bold transition-all ${activeTab === 'timeline' ? 'tab-active bg-base-100 shadow-md !text-primary' : 'opacity-50'}`}
          onClick={() => setActiveTab('timeline')}
        >
          History
        </button>
        <button 
          className={`tab px-8 h-12 rounded-[1.8rem] font-bold transition-all ${activeTab === 'weight' ? 'tab-active bg-base-100 shadow-md !text-primary' : 'opacity-50'}`}
          onClick={() => setActiveTab('weight')}
        >
          Weight
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <HealthSection title="Vaccinations" icon={<Syringe size={20} />} onAdd={() => setModalType('vaccine')}>
              {dogVaccines.length === 0 ? (
                <p className="text-sm opacity-50 py-10 text-center bg-base-200/50 rounded-2xl border border-dashed border-base-300">No vaccine records found.</p>
              ) : (
                dogVaccines.map(v => {
                  const overdue = isOverdue(v.nextDueDate);
                  return (
                    <div key={v.id} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-base-100 border border-base-200 rounded-2xl hover:border-primary/30 transition-colors">
                      <div>
                        <p className="font-black text-sm uppercase tracking-tight">{v.vaccineName}</p>
                        <p className="text-xs opacity-60 flex items-center gap-1 mt-0.5"><Clock size={10}/> Administered: {v.dateAdministered}</p>
                        <div className="mt-2 flex flex-wrap gap-2 items-center">
                          <span className={`badge badge-sm ${overdue ? 'badge-error text-white' : 'badge-secondary text-white'}`}>{overdue ? 'Overdue' : 'Scheduled'}</span>
                          {v.attachments?.length ? (
                            <span className="badge badge-sm badge-ghost text-neutral">{v.attachments.length} attachment{v.attachments.length > 1 ? 's' : ''}</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="text-right mt-4 sm:mt-0">
                        <p className="text-[10px] font-black uppercase text-primary tracking-widest opacity-50">Next due</p>
                        <p className="text-xs font-bold">{v.nextDueDate}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </HealthSection>

            <HealthSection title="Medications" icon={<Pill size={20} />} onAdd={() => setModalType('medication')}>
              {dogMedications.length === 0 ? (
                <p className="text-sm opacity-50 py-10 text-center bg-base-200/50 rounded-2xl border border-dashed border-base-300">No current medications.</p>
              ) : (
                dogMedications.map(m => {
                  const overdue = m.dueDate ? isOverdue(m.dueDate) : false;
                  return (
                    <div key={m.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-base-100 border border-base-200 rounded-2xl gap-3">
                      <div>
                        <p className="font-black text-sm uppercase tracking-tight">{m.name}</p>
                        <p className="text-xs opacity-60 mt-0.5">{m.dosage} <span className="opacity-30">|</span> {m.frequency}</p>
                        {m.dueDate ? (
                          <p className="text-[11px] opacity-70 mt-2">Due: {m.dueDate}</p>
                        ) : null}
                        {m.attachments?.length ? (
                          <p className="text-[11px] opacity-70 mt-1">{m.attachments.length} attachment{m.attachments.length > 1 ? 's' : ''}</p>
                        ) : null}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={`badge badge-sm font-black uppercase text-[10px] ${m.active ? 'badge-success text-white' : 'badge-ghost opacity-50'}`}>
                          {m.active ? 'Active' : 'Completed'}
                        </div>
                        {m.dueDate ? (
                          <span className={`badge badge-xs ${overdue ? 'badge-error' : 'badge-secondary'}`}>{overdue ? 'Past due' : 'On schedule'}</span>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              )}
            </HealthSection>

            <HealthSection title="Allergies" icon={<AlertTriangle size={20} />} onAdd={() => setModalType('allergy')}>
              {dogAllergies.length === 0 ? (
                <p className="text-sm opacity-50 py-10 text-center bg-base-200/50 rounded-2xl border border-dashed border-base-300">No known allergies.</p>
              ) : (
                dogAllergies.map(a => {
                    return (
                      <div key={a.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-base-100 border border-base-200 rounded-2xl gap-3">
                        <div>
                          <p className="font-black text-sm uppercase tracking-tight">{a.allergen}</p>
                          <p className="text-[11px] opacity-70 mt-2">Severity: {a.severity}</p>
                          {a.nextReviewDate ? <p className="text-[11px] opacity-70">Review: {a.nextReviewDate}</p> : null}
                          {a.attachments?.length ? (
                            <p className="text-[11px] opacity-70 mt-1">{a.attachments.length} attachment{a.attachments.length > 1 ? 's' : ''}</p>
                          ) : null}
                        </div>
                        <div className={`badge badge-sm font-black uppercase text-[10px] ${
                          a.severity === 'high' ? 'badge-error text-white' : a.severity === 'medium' ? 'badge-warning text-white' : 'badge-info text-white'
                        }`}>
                          {a.severity}
                        </div>
                      </div>
                    );
                })
              )}
            </HealthSection>

            <HealthSection title="Surgeries" icon={<Activity size={20} />} onAdd={() => setModalType('surgery')}>
              {dogSurgeries.length === 0 ? (
                <p className="text-sm opacity-50 py-10 text-center bg-base-200/50 rounded-2xl border border-dashed border-base-300">No surgery records.</p>
              ) : (
                dogSurgeries.map(s => {
                  const followUpOverdue = s.followUpDate ? isOverdue(s.followUpDate) : false;
                  return (
                    <div key={s.id} className="p-4 bg-base-100 border border-base-200 rounded-2xl">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-black text-sm uppercase tracking-tight">{s.procedure}</p>
                        {s.followUpDate ? (
                          <span className={`badge badge-xs ${followUpOverdue ? 'badge-error' : 'badge-secondary'}`}>{followUpOverdue ? 'Follow-up overdue' : 'Follow-up set'}</span>
                        ) : null}
                      </div>
                      <p className="text-xs opacity-60 flex items-center gap-1 mt-0.5"><Clock size={10}/> {s.date}</p>
                      {s.followUpDate ? <p className="text-[11px] opacity-70 mt-2">Follow-up: {s.followUpDate}</p> : null}
                      {s.attachments?.length ? <p className="text-[11px] opacity-70 mt-1">{s.attachments.length} attachments</p> : null}
                    </div>
                  );
                })
              )}
            </HealthSection>
          </div>

          <div className="space-y-8">
            <HealthSection title="Vet Visits" icon={<Stethoscope size={20} />} onAdd={() => setModalType('vetVisit')}>
               {dogVetVisits.length === 0 ? (
                <p className="text-sm opacity-50 py-10 text-center bg-base-200/50 rounded-2xl border border-dashed border-base-300">No vet visits logged.</p>
              ) : (
                <div className="space-y-4">
                  {dogVetVisits.slice(0, 3).map(v => (
                    <div key={v.id} className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-sm">{v.reason}</p>
                        <p className="text-[10px] font-black opacity-40">{v.date}</p>
                      </div>
                      <p className="text-xs opacity-70 line-clamp-2 italic">"{v.notes}"</p>
                      {v.followUpDate ? <p className="text-[11px] opacity-70 mt-2">Follow-up: {v.followUpDate}</p> : null}
                      {v.attachments?.length ? <p className="text-[11px] opacity-70 mt-1">{v.attachments.length} attachment{v.attachments.length > 1 ? 's' : ''}</p> : null}
                    </div>
                  ))}
                  {dogVetVisits.length > 3 && (
                    <button className="btn btn-ghost btn-sm btn-block text-primary">View All Visits</button>
                  )}
                  <div className="pt-4 border-t border-base-200 mt-4">
                    <a href="/vet-visit-prep" className="btn btn-outline btn-sm btn-block rounded-xl gap-2 text-primary border-primary/20 hover:bg-primary/5">
                      <FileText size={14} /> Prepare for Next Visit
                    </a>
                  </div>
                  </div>
              )}
            </HealthSection>

            <div className="bg-primary text-primary-content rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                <Stethoscope size={120} />
              </div>
              <h3 className="text-2xl font-black mb-2">Health Tip</h3>
              <p className="text-sm opacity-90 leading-relaxed font-medium mb-6">
                Keep a digital copy of all medical records. It makes emergency vet visits much smoother!
              </p>
              <button className="btn btn-secondary btn-sm rounded-full px-6" onClick={() => setModalType('report')}>Generate Report</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="bg-base-100 rounded-[3rem] p-10 border border-base-300 shadow-sm">
          <h2 className="text-3xl font-black text-primary mb-10 flex items-center gap-3">
            <Clock className="text-secondary" /> Complete History
          </h2>
          <HealthTimeline dogId={selectedDogId} />
        </div>
      )}

      {activeTab === 'weight' && (
        <div className="bg-base-100 rounded-[3rem] p-10 border border-base-300 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <h2 className="text-3xl font-black text-primary flex items-center gap-3">
              <Scale className="text-secondary" /> Weight Log
            </h2>
            <div className="badge badge-lg badge-primary rounded-full font-bold px-4 h-10">
              Current: {selectedDog?.currentWeight} kg
            </div>
          </div>
          <WeightHistory dogId={selectedDogId} />
        </div>
      )}

      {/* Report Modal */}
      {modalType === 'report' && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl bg-base-200 p-0 rounded-[3rem] overflow-hidden">
             <div className="flex justify-between items-center p-6 bg-base-100 border-b border-base-300">
                <h3 className="font-black text-xl text-primary flex items-center gap-2"><FileText size={20}/> Wellness Summary</h3>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setModalType(null)}><X size={20}/></button>
             </div>
             <div className="p-8 max-h-[80vh] overflow-y-auto">
                <WellnessReport dogId={selectedDogId} />
             </div>
             <div className="p-6 bg-base-100 border-t border-base-300 flex justify-center">
                <button className="btn btn-primary rounded-full px-10" onClick={() => window.print()}>
                  <Printer size={18}/> Print / Save PDF
                </button>
             </div>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}

      {/* Vaccine Modal */}
      {modalType === 'vaccine' && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box rounded-[2.5rem] p-0 overflow-hidden shadow-2xl border border-base-300">
            <div className="bg-primary p-8 text-primary-content flex justify-between items-center">
              <h3 className="font-black text-2xl">Log Vaccination</h3>
              <button className="btn btn-sm btn-circle btn-ghost bg-white/20 border-none" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddVaccine} className="p-8 space-y-6">
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Vaccine Name</span></label>
                <input type="text" required className="input input-bordered rounded-2xl bg-base-200" placeholder="e.g. Rabies, DHPP" value={newVaccine.vaccineName} onChange={e => setNewVaccine({...newVaccine, vaccineName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Administered Date</span></label>
                  <input type="date" required className="input input-bordered rounded-2xl bg-base-200" value={newVaccine.dateAdministered} onChange={e => setNewVaccine({...newVaccine, dateAdministered: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Next Due Date</span></label>
                  <input type="date" required className="input input-bordered rounded-2xl bg-base-200" value={newVaccine.nextDueDate} onChange={e => setNewVaccine({...newVaccine, nextDueDate: e.target.value})} />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Notes (Optional)</span></label>
                <textarea className="textarea textarea-bordered rounded-2xl bg-base-200" placeholder="Batch #, vet details, etc." value={newVaccine.notes} onChange={e => setNewVaccine({...newVaccine, notes: e.target.value})}></textarea>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Attachments</span></label>
                <div className="space-y-3">
                  {(newVaccine.attachments || []).map((attachment, idx) => (
                    <div key={attachment.id} className="grid gap-3 sm:grid-cols-[1fr_auto] items-end">
                      <input type="text" className="input input-bordered rounded-2xl bg-base-200" placeholder="Label" value={attachment.label} onChange={e => updateAttachmentField(setNewVaccine, idx, 'label', e.target.value)} />
                      <input type="url" className="input input-bordered rounded-2xl bg-base-200" placeholder="Document URL" value={attachment.url} onChange={e => updateAttachmentField(setNewVaccine, idx, 'url', e.target.value)} />
                      <button type="button" className="btn btn-ghost btn-sm rounded-full" onClick={() => removeAttachment(setNewVaccine, idx)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-outline btn-sm rounded-full" onClick={() => addAttachment(setNewVaccine)}>Add attachment</button>
                </div>
              </div>
              <div className="modal-action gap-4">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Save Record</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}

      {/* Medication Modal */}
      {modalType === 'medication' && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box rounded-[2.5rem] p-0 overflow-hidden shadow-2xl border border-base-300">
             <div className="bg-primary p-8 text-primary-content flex justify-between items-center">
              <h3 className="font-black text-2xl">Add Medication</h3>
              <button className="btn btn-sm btn-circle btn-ghost bg-white/20 border-none" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddMedication} className="p-8 space-y-6">
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Medication Name</span></label>
                <input type="text" required className="input input-bordered rounded-2xl bg-base-200" placeholder="e.g. Heartgard, Apoquel" value={newMedication.name} onChange={e => setNewMedication({...newMedication, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Dosage</span></label>
                  <input type="text" placeholder="e.g. 5mg, 1 tablet" required className="input input-bordered rounded-2xl bg-base-200" value={newMedication.dosage} onChange={e => setNewMedication({...newMedication, dosage: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Frequency</span></label>
                  <input type="text" placeholder="e.g. Daily, Monthly" required className="input input-bordered rounded-2xl bg-base-200" value={newMedication.frequency} onChange={e => setNewMedication({...newMedication, frequency: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Start Date</span></label>
                  <input type="date" required className="input input-bordered rounded-2xl bg-base-200" value={newMedication.startDate} onChange={e => setNewMedication({...newMedication, startDate: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Due Date</span></label>
                  <input type="date" className="input input-bordered rounded-2xl bg-base-200" value={newMedication.dueDate} onChange={e => setNewMedication({...newMedication, dueDate: e.target.value})} />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Notes (Optional)</span></label>
                <textarea className="textarea textarea-bordered rounded-2xl bg-base-200" placeholder="Condition, dosing notes, vet instructions" value={newMedication.notes} onChange={e => setNewMedication({...newMedication, notes: e.target.value})}></textarea>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Attachments</span></label>
                <div className="space-y-3">
                  {(newMedication.attachments || []).map((attachment, idx) => (
                    <div key={attachment.id} className="grid gap-3 sm:grid-cols-[1fr_auto] items-end">
                      <input type="text" className="input input-bordered rounded-2xl bg-base-200" placeholder="Label" value={attachment.label} onChange={e => updateAttachmentField(setNewMedication, idx, 'label', e.target.value)} />
                      <input type="url" className="input input-bordered rounded-2xl bg-base-200" placeholder="Document URL" value={attachment.url} onChange={e => updateAttachmentField(setNewMedication, idx, 'url', e.target.value)} />
                      <button type="button" className="btn btn-ghost btn-sm rounded-full" onClick={() => removeAttachment(setNewMedication, idx)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-outline btn-sm rounded-full" onClick={() => addAttachment(setNewMedication)}>Add attachment</button>
                </div>
              </div>
              <div className="modal-action gap-4">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Add Medication</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}
      
      {/* Allergy Modal */}
      {modalType === 'allergy' && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box rounded-[2.5rem] p-0 overflow-hidden shadow-2xl border border-base-300">
             <div className="bg-primary p-8 text-primary-content flex justify-between items-center">
              <h3 className="font-black text-2xl">Log Allergy</h3>
              <button className="btn btn-sm btn-circle btn-ghost bg-white/20 border-none" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddAllergy} className="p-8 space-y-6">
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Allergen</span></label>
                <input type="text" required className="input input-bordered rounded-2xl bg-base-200" placeholder="e.g. Chicken, Grass, Bee stings" value={newAllergy.allergen} onChange={e => setNewAllergy({...newAllergy, allergen: e.target.value})} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Severity</span></label>
                <select className="select select-bordered rounded-2xl bg-base-200" value={newAllergy.severity} onChange={e => setNewAllergy({...newAllergy, severity: e.target.value as 'low' | 'medium' | 'high'})}>
                  <option value="low">Low (Mild itching/sneezing)</option>
                  <option value="medium">Medium (Hives/Redness)</option>
                  <option value="high">High (Difficulty breathing/Emergency)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">First Noticed</span></label>
                  <input type="date" required className="input input-bordered rounded-2xl bg-base-200" value={newAllergy.date} onChange={e => setNewAllergy({...newAllergy, date: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Next Review</span></label>
                  <input type="date" className="input input-bordered rounded-2xl bg-base-200" value={newAllergy.nextReviewDate} onChange={e => setNewAllergy({...newAllergy, nextReviewDate: e.target.value})} />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Attachments</span></label>
                <div className="space-y-3">
                  {(newAllergy.attachments || []).map((attachment, idx) => (
                    <div key={attachment.id} className="grid gap-3 sm:grid-cols-[1fr_auto] items-end">
                      <input type="text" className="input input-bordered rounded-2xl bg-base-200" placeholder="Label" value={attachment.label} onChange={e => updateAttachmentField(setNewAllergy, idx, 'label', e.target.value)} />
                      <input type="url" className="input input-bordered rounded-2xl bg-base-200" placeholder="Document URL" value={attachment.url} onChange={e => updateAttachmentField(setNewAllergy, idx, 'url', e.target.value)} />
                      <button type="button" className="btn btn-ghost btn-sm rounded-full" onClick={() => removeAttachment(setNewAllergy, idx)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-outline btn-sm rounded-full" onClick={() => addAttachment(setNewAllergy)}>Add attachment</button>
                </div>
              </div>
              <div className="modal-action gap-4">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Log Allergy</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}

      {/* Surgery Modal */}
      {modalType === 'surgery' && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box rounded-[2.5rem] p-0 overflow-hidden shadow-2xl border border-base-300">
             <div className="bg-primary p-8 text-primary-content flex justify-between items-center">
              <h3 className="font-black text-2xl">Log Surgery / Procedure</h3>
              <button className="btn btn-sm btn-circle btn-ghost bg-white/20 border-none" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddSurgery} className="p-8 space-y-6">
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Procedure Name</span></label>
                <input type="text" required className="input input-bordered rounded-2xl bg-base-200" placeholder="e.g. Neuter, Teeth Cleaning" value={newSurgery.procedure} onChange={e => setNewSurgery({...newSurgery, procedure: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Date</span></label>
                  <input type="date" required className="input input-bordered rounded-2xl bg-base-200" value={newSurgery.date} onChange={e => setNewSurgery({...newSurgery, date: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Follow-up Date</span></label>
                  <input type="date" className="input input-bordered rounded-2xl bg-base-200" value={newSurgery.followUpDate} onChange={e => setNewSurgery({...newSurgery, followUpDate: e.target.value})} />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Attachments</span></label>
                <div className="space-y-3">
                  {(newSurgery.attachments || []).map((attachment, idx) => (
                    <div key={attachment.id} className="grid gap-3 sm:grid-cols-[1fr_auto] items-end">
                      <input type="text" className="input input-bordered rounded-2xl bg-base-200" placeholder="Label" value={attachment.label} onChange={e => updateAttachmentField(setNewSurgery, idx, 'label', e.target.value)} />
                      <input type="url" className="input input-bordered rounded-2xl bg-base-200" placeholder="Document URL" value={attachment.url} onChange={e => updateAttachmentField(setNewSurgery, idx, 'url', e.target.value)} />
                      <button type="button" className="btn btn-ghost btn-sm rounded-full" onClick={() => removeAttachment(setNewSurgery, idx)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-outline btn-sm rounded-full" onClick={() => addAttachment(setNewSurgery)}>Add attachment</button>
                </div>
              </div>
              <div className="modal-action gap-4">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Log Surgery</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalType(null)}></div>
        </div>
      )}

      {/* Vet Visit Modal */}
      {modalType === 'vetVisit' && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box rounded-[2.5rem] p-0 overflow-hidden shadow-2xl border border-base-300">
             <div className="bg-primary p-8 text-primary-content flex justify-between items-center">
              <h3 className="font-black text-2xl">Log Vet Visit</h3>
              <button className="btn btn-sm btn-circle btn-ghost bg-white/20 border-none" onClick={() => setModalType(null)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAddVetVisit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Date</span></label>
                  <input type="date" required className="input input-bordered rounded-2xl bg-base-200" value={newVetVisit.date} onChange={e => setNewVetVisit({...newVetVisit, date: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Reason</span></label>
                  <input type="text" required className="input input-bordered rounded-2xl bg-base-200" placeholder="e.g. Annual Checkup" value={newVetVisit.reason} onChange={e => setNewVetVisit({...newVetVisit, reason: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Veterinarian / Clinic</span></label>
                  <input type="text" className="input input-bordered rounded-2xl bg-base-200" placeholder="Clinic name" value={newVetVisit.veterinarian} onChange={e => setNewVetVisit({...newVetVisit, veterinarian: e.target.value})} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Follow-up Date</span></label>
                  <input type="date" className="input input-bordered rounded-2xl bg-base-200" value={newVetVisit.followUpDate} onChange={e => setNewVetVisit({...newVetVisit, followUpDate: e.target.value})} />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Notes & Findings</span></label>
                <textarea rows={4} className="textarea textarea-bordered rounded-2xl bg-base-200" placeholder="What did the vet say?" value={newVetVisit.notes} onChange={e => setNewVetVisit({...newVetVisit, notes: e.target.value})}></textarea>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Attachments</span></label>
                <div className="space-y-3">
                  {(newVetVisit.attachments || []).map((attachment, idx) => (
                    <div key={attachment.id} className="grid gap-3 sm:grid-cols-[1fr_auto] items-end">
                      <input type="text" className="input input-bordered rounded-2xl bg-base-200" placeholder="Label" value={attachment.label} onChange={e => updateAttachmentField(setNewVetVisit, idx, 'label', e.target.value)} />
                      <input type="url" className="input input-bordered rounded-2xl bg-base-200" placeholder="Document URL" value={attachment.url} onChange={e => updateAttachmentField(setNewVetVisit, idx, 'url', e.target.value)} />
                      <button type="button" className="btn btn-ghost btn-sm rounded-full" onClick={() => removeAttachment(setNewVetVisit, idx)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-outline btn-sm rounded-full" onClick={() => addAttachment(setNewVetVisit)}>Add attachment</button>
                </div>
              </div>
              <div className="modal-action gap-4">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Save Visit</button>
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
