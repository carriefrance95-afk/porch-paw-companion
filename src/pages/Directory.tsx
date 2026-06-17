import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { type DirectoryEntry } from '../types';
import { Search, Plus, Phone, Mail, MapPin, Globe, Star, Trash2, Edit, X } from 'lucide-react';

const Directory: React.FC = () => {
  const { directory, addDirectoryEntry, updateDirectoryEntry, deleteDirectoryEntry } = usePets();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DirectoryEntry | null>(null);

  const [formData, setFormData] = useState<Partial<DirectoryEntry>>({
    category: 'Vet',
    rating: 5
  });

  const categories = ['All', 'Vet', 'Groomer', 'Trainer', 'Walker', 'Other'];

  const filteredDirectory = directory.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || entry.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (entry?: DirectoryEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData(entry);
    } else {
      setEditingEntry(null);
      setFormData({ category: 'Vet', rating: 5, name: '', phone: '', email: '', address: '', website: '', notes: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      updateDirectoryEntry({ ...editingEntry, ...formData } as DirectoryEntry);
    } else {
      addDirectoryEntry({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as DirectoryEntry);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">Care Directory</h1>
          <p className="text-base-content/70">Your trusted network of pet care professionals.</p>
        </div>
        <button 
          className="btn btn-primary rounded-2xl shadow-lg"
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
              className={`btn btn-sm rounded-xl px-6 ${categoryFilter === cat ? 'btn-primary' : 'btn-ghost bg-base-200'}`}
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
              <div className="flex justify-between items-start mb-4">
                <div className={`badge ${
                  entry.category === 'Vet' ? 'badge-info' : 
                  entry.category === 'Groomer' ? 'badge-secondary' : 
                  entry.category === 'Trainer' ? 'badge-accent' : 'badge-ghost'
                } rounded-lg px-3 py-3 font-bold text-[10px] uppercase tracking-wider`}>
                  {entry.category}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(entry)} className="btn btn-ghost btn-xs btn-circle text-info"><Edit size={14} /></button>
                  <button onClick={() => deleteDirectoryEntry(entry.id)} className="btn btn-ghost btn-xs btn-circle text-error"><Trash2 size={14} /></button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1">{entry.name}</h3>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < (entry.rating || 0) ? 'text-warning fill-warning' : 'text-base-300'} />
                ))}
              </div>

              <div className="space-y-2 text-sm opacity-80 mb-6">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <a href={`tel:${entry.phone}`} className="hover:underline">{entry.phone}</a>
                </div>
                {entry.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <a href={`mailto:${entry.email}`} className="hover:underline truncate">{entry.email}</a>
                  </div>
                )}
                {entry.address && (
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-primary mt-1 flex-shrink-0" />
                    <span>{entry.address}</span>
                  </div>
                )}
                {entry.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-primary" />
                    <a href={entry.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{entry.website}</a>
                  </div>
                )}
              </div>

              {entry.notes && (
                <div className="p-3 bg-base-200 rounded-xl text-xs italic">
                  "{entry.notes}"
                </div>
              )}
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

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Category</span></label>
                <select 
                  className="select select-bordered rounded-2xl w-full"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  required
                >
                  <option value="Vet">Vet</option>
                  <option value="Groomer">Groomer</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Walker">Walker</option>
                  <option value="Other">Other</option>
                </select>
              </div>

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
