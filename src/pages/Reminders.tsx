import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { type Appointment } from '../types';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, CheckCircle2, Circle, Trash2, Edit } from 'lucide-react';

const Reminders: React.FC = () => {
  const { profiles, appointments, addAppointment, updateAppointment, deleteAppointment } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Appointment>>({
    type: 'Vet',
    completed: false
  });

  const handleOpenModal = (app?: Appointment) => {
    if (app) {
      setEditingAppointment(app);
      setFormData(app);
    } else {
      setEditingAppointment(null);
      setFormData({
        dogId: profiles[0]?.id || '',
        type: 'Vet',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        providerName: '',
        providerAddress: '',
        notes: '',
        completed: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      updateAppointment({ ...editingAppointment, ...formData } as Appointment);
    } else {
      addAppointment({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Appointment);
    }
    setIsModalOpen(false);
  };

  const toggleComplete = (app: Appointment) => {
    updateAppointment({ ...app, completed: !app.completed });
  };

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime()
  );

  const upcoming = sortedAppointments.filter(a => !a.completed);
  const history = sortedAppointments.filter(a => a.completed).reverse();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">Reminders & Scheduling</h1>
          <p className="text-base-content/70">Never miss a vet visit or grooming session again.</p>
        </div>
        <button 
          className="btn btn-primary rounded-2xl shadow-lg"
          onClick={() => handleOpenModal()}
          disabled={profiles.length === 0}
        >
          <Plus size={20} />
          Add Appointment
        </button>
      </div>

      {profiles.length === 0 ? (
        <div className="bg-base-200 rounded-[2rem] p-12 text-center">
          <CalendarIcon size={64} className="mx-auto mb-4 text-primary opacity-20" />
          <h2 className="text-2xl font-bold mb-2">No Dog Profiles Found</h2>
          <p className="mb-6 opacity-70">You need to create a dog profile before scheduling appointments.</p>
          <a href="/profiles" className="btn btn-primary rounded-2xl">Create a Profile</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CalendarIcon size={20} className="text-primary" />
              Upcoming Appointments
            </h2>
            
            {upcoming.length === 0 ? (
              <div className="bg-base-100 border-2 border-dashed border-base-300 rounded-[2rem] p-8 text-center">
                <p className="opacity-50 italic">No upcoming appointments scheduled.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcoming.map(app => {
                  const dog = profiles.find(p => p.id === app.dogId);
                  return (
                    <div key={app.id} className="bg-base-100 rounded-[2rem] p-6 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          <div className={`p-4 rounded-2xl ${app.type === 'Vet' ? 'bg-blue-100 text-blue-600' : app.type === 'Groomer' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                            <CalendarIcon size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold">{app.providerName} <span className="text-sm font-normal opacity-60">for {dog?.name}</span></h3>
                            <div className="flex flex-wrap gap-4 mt-1 text-sm opacity-70">
                              <span className="flex items-center gap-1"><CalendarIcon size={14} /> {app.date}</span>
                              <span className="flex items-center gap-1"><Clock size={14} /> {app.time}</span>
                              {app.providerAddress && <span className="flex items-center gap-1"><MapPin size={14} /> {app.providerAddress}</span>}
                            </div>
                            {app.notes && <p className="mt-3 text-sm italic opacity-80">{app.notes}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => toggleComplete(app)} className="btn btn-ghost btn-sm btn-circle text-success" title="Mark as Complete">
                            <Circle size={20} />
                          </button>
                          <button onClick={() => handleOpenModal(app)} className="btn btn-ghost btn-sm btn-circle text-info" title="Edit">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => deleteAppointment(app.id)} className="btn btn-ghost btn-sm btn-circle text-error" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* History Column */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 size={20} className="text-success" />
              Completed
            </h2>
            
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-center p-4 bg-base-200 rounded-2xl opacity-50 text-sm">History will appear here.</p>
              ) : (
                history.map(app => {
                  const dog = profiles.find(p => p.id === app.dogId);
                  return (
                    <div key={app.id} className="bg-base-200/50 rounded-2xl p-4 flex justify-between items-center opacity-70">
                      <div>
                        <p className="font-bold text-sm">{app.providerName} <span className="font-normal">({dog?.name})</span></p>
                        <p className="text-xs">{app.date} • {app.type}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => toggleComplete(app)} className="btn btn-ghost btn-xs btn-circle text-success" title="Undo Complete">
                          <CheckCircle2 size={16} />
                        </button>
                        <button onClick={() => deleteAppointment(app.id)} className="btn btn-ghost btn-xs btn-circle text-error">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-[2.5rem] max-w-md">
            <h3 className="font-bold text-xl mb-6">{editingAppointment ? 'Edit Appointment' : 'Schedule Appointment'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Select Dog</span></label>
                <select 
                  className="select select-bordered rounded-2xl w-full"
                  value={formData.dogId}
                  onChange={(e) => setFormData({ ...formData, dogId: e.target.value })}
                  required
                >
                  {profiles.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Appointment Type</span></label>
                <select 
                  className="select select-bordered rounded-2xl w-full"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  required
                >
                  <option value="Vet">Vet Visit</option>
                  <option value="Groomer">Grooming</option>
                  <option value="Trainer">Training</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Date</span></label>
                  <input 
                    type="date" 
                    className="input input-bordered rounded-2xl w-full"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Time</span></label>
                  <input 
                    type="time" 
                    className="input input-bordered rounded-2xl w-full"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Provider / Location Name</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. Bark & Bathe Grooming"
                  className="input input-bordered rounded-2xl w-full"
                  value={formData.providerName}
                  onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Address (Optional)</span></label>
                <input 
                  type="text" 
                  placeholder="123 Dog St, Woofville"
                  className="input input-bordered rounded-2xl w-full"
                  value={formData.providerAddress}
                  onChange={(e) => setFormData({ ...formData, providerAddress: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Notes (Optional)</span></label>
                <textarea 
                  className="textarea textarea-bordered rounded-2xl h-24"
                  placeholder="e.g. Bring vaccination records..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="modal-action gap-3">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">
                  {editingAppointment ? 'Update' : 'Schedule'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Reminders;
