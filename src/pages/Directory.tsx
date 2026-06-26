import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../context/PetContext';
import { type DirectoryEntry } from '../types';
import { Search, Plus, Phone, Mail, MapPin, Globe, Star, Trash2, Edit, X } from 'lucide-react';

const Directory: React.FC = () => {
  const navigate = useNavigate();
  const { directory, addDirectoryEntry, updateDirectoryEntry, deleteDirectoryEntry } = usePets();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DirectoryEntry | null>(null);
  const [documentText, setDocumentText] = useState('');

  const [formData, setFormData] = useState<Partial<DirectoryEntry>>({
    category: 'Veterinarian',
    rating: 5,
    favorite: false,
    linkedSystems: []
  });

  const categories = ['All', 'Veterinarian', 'Emergency Vet', 'Groomer', 'Trainer', 'Boarding', 'Pet Sitter', 'Walker', 'Other'];
  const linkedSystemOptions = ['Vet Prep', 'Reminders', 'Emergency Packet'] as const;
  type LinkedSystem = typeof linkedSystemOptions[number];

  const filteredDirectory = directory.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.website?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || entry.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (entry?: DirectoryEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData(entry);
      setDocumentText((entry.documents || []).map(doc => `${doc.label} | ${doc.url}`).join('\n'));
    } else {
      setEditingEntry(null);
      setFormData({ category: 'Veterinarian', rating: 5, favorite: false, linkedSystems: [], name: '', phone: '', email: '', address: '', website: '', directions: '', lastVisit: '', nextAppointment: '', notes: '' });
      setDocumentText('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const documents = documentText.split('\n').map(line => line.trim()).filter(Boolean).map((line, idx) => {
      const [labelPart, urlPart] = line.split('|').map(part => part.trim());
      return {
        id: `${Date.now()}-${idx}`,
        label: labelPart || `Document ${idx + 1}`,
        url: urlPart || labelPart
      };
    });

    const entry = {
      ...editingEntry,
      ...formData,
      documents: documents.length ? documents : undefined,
      linkedSystems: formData.linkedSystems || []
    } as DirectoryEntry;

    if (editingEntry) {
      updateDirectoryEntry(entry);
    } else {
      addDirectoryEntry({
        ...entry,
        id: Math.random().toString(36).substr(2, 9),
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">Care Directory</h1>
          <p className="text-base-content/70">Your trusted network of pet care professionals, ready for appointments, emergency outreach, and follow-up reminders.</p>
        </div>
        <button 
          className="btn bg-terracotta text-white rounded-2xl shadow-lg border-none hover:bg-terracotta/90"
          onClick={() => handleOpenModal()}
        >
          <Plus size={20} />
          Add Provider
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
          <input 
            type="text" 
            placeholder="Search providers..." 
            className="input input-bordered w-full pl-12 rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`btn btn-sm rounded-full px-5 ${categoryFilter === cat ? 'bg-terracotta text-white' : 'btn-ghost bg-base-200 text-neutral'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredDirectory.length === 0 ? (
        <div className="bg-base-200 rounded-[2rem] p-12 text-center">
          <Search size={64} className="mx-auto mb-4 text-primary opacity-20" />
          <h2 className="text-2xl font-bold mb-2">No providers found</h2>
          <p className="opacity-70">Try adjusting your search or add a new provider to your directory.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectory.map(entry => (
            <div key={entry.id} className="bg-base-100 rounded-[2rem] p-6 shadow-sm border border-base-200 hover:shadow-md transition-shadow group">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between items-start gap-4 mb-4">
                <div>
                  <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${
                    entry.category === 'Veterinarian' ? 'bg-terracotta/10 text-terracotta border-terracotta/30' :
                    entry.category === 'Emergency Vet' ? 'bg-brand-dark/10 text-brand-dark border-brand-dark/30' :
                    entry.category === 'Groomer' ? 'bg-sage/10 text-sage border-sage/30' :
                    entry.category === 'Trainer' ? 'bg-sage/10 text-sage border-sage/30' :
                    entry.category === 'Boarding' ? 'bg-taupe-light text-taupe border-taupe/30' :
                    entry.category === 'Pet Sitter' ? 'bg-sage/10 text-sage border-sage/30' :
                    'bg-base-200 text-neutral border-base-300'
                  }`}>{entry.category}</div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-neutral/80">
                    <span className="font-semibold">Last visit:</span>
                    <span>{entry.lastVisit || 'TBD'}</span>
                  </div>
                </div>
                <button onClick={() => setFormData({ ...entry, favorite: !entry.favorite })} className={`btn btn-sm rounded-full border ${entry.favorite ? 'bg-terracotta text-white border-terracotta' : 'btn-ghost bg-base-200 text-neutral'}`}>
                  {entry.favorite ? '★ Favorite' : '☆ Favorite'}
                </button>
              </div>

              <h3 className="text-2xl font-bold mb-1 text-neutral">{entry.name}</h3>
              <div className="flex items-center flex-wrap gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < (entry.rating || 0) ? 'text-terracotta fill-terracotta' : 'text-base-300'} />
                ))}
              </div>

              <div className="space-y-3 text-sm opacity-90 mb-6">
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-terracotta" />
                    <a href={`tel:${entry.phone}`} className="hover:underline truncate">{entry.phone}</a>
                  </div>
                  {entry.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={16} className="text-sage" />
                      <a href={`mailto:${entry.email}`} className="hover:underline truncate">{entry.email}</a>
                    </div>
                  )}
                  {entry.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe size={16} className="text-charcoal" />
                      <a href={entry.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{entry.website}</a>
                    </div>
                  )}
                  {entry.address && (
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin size={16} className="text-sage" />
                      <span>{entry.address}</span>
                    </div>
                  )}
                  {entry.directions && (
                    <div className="bg-base-200 p-3 rounded-2xl text-xs text-neutral">
                      <span className="font-bold">Directions:</span> {entry.directions}
                    </div>
                  )}
                  {entry.nextAppointment && (
                    <div className="bg-terracotta/10 text-terracotta p-3 rounded-2xl text-sm">
                      <span className="font-semibold">Next Appointment:</span> {entry.nextAppointment}
                    </div>
                  )}
                </div>
              </div>

              {entry.notes && (
                <div className="p-4 bg-base-200 rounded-3xl text-sm leading-6 text-neutral border border-base-300">
                  "{entry.notes}"
                </div>
              )}
              {entry.documents?.length ? (
                <div className="mt-4 border-t border-base-300 pt-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-secondary/80 mb-2">Documents</p>
                  <ul className="space-y-2 text-sm">
                    {entry.documents.map(doc => (
                      <li key={doc.id} className="flex justify-between gap-4">
                        <span>{doc.label}</span>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Open</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {entry.linkedSystems?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.linkedSystems.map(link => (
                    <span key={link} className="inline-flex items-center rounded-full border border-taupe/30 bg-taupe-light px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-taupe">{link}</span>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                {entry.linkedSystems?.includes('Reminders') && (
                  <button
                    type="button"
                    onClick={() => navigate(`/reminders?providerId=${entry.id}`)}
                    className="btn btn-xs btn-outline rounded-full"
                  >
                    Schedule Reminder
                  </button>
                )}
                {entry.linkedSystems?.includes('Vet Prep') && (
                  <button
                    type="button"
                    onClick={() => navigate(`/vet-visit-prep?providerId=${entry.id}`)}
                    className="btn btn-xs btn-outline rounded-full"
                  >
                    Vet Prep
                  </button>
                )}
                {entry.linkedSystems?.includes('Emergency Packet') && (
                  <button
                    type="button"
                    onClick={() => navigate(`/emergency?providerId=${entry.id}&tab=packet`)}
                    className="btn btn-xs btn-outline rounded-full"
                  >
                    Emergency Packet
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Provider Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-[2.5rem] max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">{editingEntry ? 'Edit Provider' : 'Add Provider'}</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setIsModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Provider Name</span></label>
                <input 
                  type="text" 
                  className="input input-bordered rounded-2xl w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Category</span></label>
                  <select 
                    className="select select-bordered rounded-2xl w-full"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    required
                  >
                    <option value="Veterinarian">Veterinarian</option>
                    <option value="Emergency Vet">Emergency Vet</option>
                    <option value="Groomer">Groomer</option>
                    <option value="Trainer">Trainer</option>
                    <option value="Boarding">Boarding</option>
                    <option value="Pet Sitter">Pet Sitter</option>
                    <option value="Walker">Walker</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-secondary rounded-lg"
                      checked={formData.favorite}
                      onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
                    />
                    <span className="label-text font-semibold">Favorite Provider</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Phone</span></label>
                  <input 
                    type="tel" 
                    className="input input-bordered rounded-2xl w-full"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Email</span></label>
                  <input 
                    type="email" 
                    className="input input-bordered rounded-2xl w-full"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Address</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered rounded-2xl w-full"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Website</span></label>
                  <input 
                    type="url" 
                    className="input input-bordered rounded-2xl w-full"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Directions</span></label>
                  <textarea 
                    className="textarea textarea-bordered rounded-2xl h-24"
                    value={formData.directions}
                    onChange={(e) => setFormData({ ...formData, directions: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Last Visit</span></label>
                    <input 
                      type="date" 
                      className="input input-bordered rounded-2xl w-full"
                      value={formData.lastVisit}
                      onChange={(e) => setFormData({ ...formData, lastVisit: e.target.value })}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Next Appointment</span></label>
                    <input 
                      type="date" 
                      className="input input-bordered rounded-2xl w-full"
                      value={formData.nextAppointment}
                      onChange={(e) => setFormData({ ...formData, nextAppointment: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Rating (1-5)</span></label>
                <input 
                  type="range" min="1" max="5" 
                  className="range range-warning" 
                  step="1" 
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                />
                <div className="w-full flex justify-between text-xs px-2 mt-2">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Linked Systems</span></label>
                <div className="grid grid-cols-1 gap-2">
                  {linkedSystemOptions.map(system => (
                    <label key={system} className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-secondary rounded-lg"
                        checked={formData.linkedSystems?.includes(system) ?? false}
                        onChange={(e) => {
                          const existing = (formData.linkedSystems || []) as LinkedSystem[];
                          const next = e.target.checked
                            ? [...existing, system]
                            : existing.filter(item => item !== system);
                          setFormData({ ...formData, linkedSystems: next });
                        }}
                      />
                      <span className="label-text text-sm">{system}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Documents</span></label>
                <textarea
                  className="textarea textarea-bordered rounded-2xl h-24"
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  placeholder="Label | URL, one per line"
                />
                <p className="text-xs opacity-60 mt-2">Add documents as label and URL pairs, separated by a pipe.</p>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Notes</span></label>
                <textarea 
                  className="textarea textarea-bordered rounded-2xl h-24"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="modal-action gap-3">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Save</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Directory;
