import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { type JournalEntry, type MemoryItem, type Album } from '../types';
import { 
  Plus, Calendar as CalendarIcon, Image as ImageIcon, Book, Camera, 
  Smile, Frown, Zap, Moon, AlertCircle, Tag, Trash2, Layout, MoreVertical,
  ChevronRight, ChevronLeft, MapPin, Clock} from 'lucide-react';

const JournalMemories: React.FC = () => {
  const { 
    profiles, journal, memories, albums, 
    addJournalEntry,  deleteJournalEntry,
    addMemoryItem, deleteMemoryItem, addAlbum 
  } = usePets();

  const [activeTab, setActiveTab] = useState<'journal' | 'memories'>('journal');
  const [selectedDogId, setSelectedDogId] = useState<string>(profiles[0]?.id || '');
  
  // Modals
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  // Filters
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');

  // Form states
  const [journalForm, setJournalForm] = useState<Partial<JournalEntry>>({
    mood: 'Happy',
    tags: [],
    date: new Date().toISOString().split('T')[0]
  });

  const [memoryForm, setMemoryForm] = useState<Partial<MemoryItem>>({
    type: 'Photo',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredJournal = journal
    .filter(j => j.dogId === selectedDogId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredMemories = memories
    .filter(m => m.dogId === selectedDogId && (selectedAlbumId === 'all' || m.albumId === selectedAlbumId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJournalEntry({
      ...journalForm,
      id: Math.random().toString(36).substr(2, 9),
      dogId: selectedDogId} as JournalEntry);
    setIsJournalModalOpen(false);
  };

  const handleMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMemoryItem({
      ...memoryForm,
      id: Math.random().toString(36).substr(2, 9),
      dogId: selectedDogId} as MemoryItem);
    setIsMemoryModalOpen(false);
  };

  

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2 flex items-center gap-3">
            <Book className="text-primary" />
            Journal & Memory Vault
          </h1>
          <p className="text-base-content/70">Capture every moment and track your dog's journey.</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'journal' ? (
            <button className="btn btn-primary rounded-2xl shadow-lg" onClick={() => setIsJournalModalOpen(true)} disabled={!selectedDogId}>
              <Plus size={20} />
              New Entry
            </button>
          ) : (
            <button className="btn btn-primary rounded-2xl shadow-lg" onClick={() => setIsMemoryModalOpen(true)} disabled={!selectedDogId}>
              <Camera size={20} />
              Add Memory
            </button>
          )}
        </div>
      </div>

      {/* Dog Selector */}
      <div className="bg-base-200 p-2 rounded-2xl mb-8 flex gap-2 overflow-x-auto">
        {profiles.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedDogId(p.id)}
            className={`btn btn-sm rounded-xl px-6 whitespace-nowrap ${selectedDogId === p.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {p.name}
          </button>
        ))}
        {profiles.length === 0 && <p className="text-sm p-2 opacity-50 italic">Create a dog profile to start journaling.</p>}
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1 rounded-2xl mb-8">
        <button 
          className={`tab flex-1 rounded-xl h-12 ${activeTab === 'journal' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('journal')}
        >
          <Book size={18} className="mr-2" />
          Daily Journal
        </button>
        <button 
          className={`tab flex-1 rounded-xl h-12 ${activeTab === 'memories' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('memories')}
        >
          <ImageIcon size={18} className="mr-2" />
          Memory Vault
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'journal' ? (
        <div className="space-y-6">
          {filteredJournal.length === 0 ? (
            <div className="bg-base-100 border-2 border-dashed border-base-300 rounded-[3rem] p-20 text-center">
              <Book size={64} className="mx-auto mb-4 text-primary opacity-20" />
              <h2 className="text-2xl font-bold mb-2">Start your first journal entry</h2>
              <p className="opacity-60 mb-6">Track moods, behaviors, and special daily notes.</p>
              <button className="btn btn-primary rounded-2xl" onClick={() => setIsJournalModalOpen(true)}>Create Entry</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJournal.map(entry => (
                <div key={entry.id} className="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200 hover:shadow-md transition-shadow relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                        <CalendarIcon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <div className="flex items-center gap-1 text-xs opacity-60">
                           <Smile size={12} /> {entry.mood}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => deleteJournalEntry(entry.id)} className="btn btn-ghost btn-xs btn-circle text-error"><Trash2 size={16} /></button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-base-200 rounded-2xl">
                      <h4 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-2">Behavior & Mood</h4>
                      <p className="text-sm leading-relaxed">{entry.behaviorNotes}</p>
                    </div>
                    {(entry.dietNotes || entry.exerciseNotes) && (
                      <div className="grid grid-cols-2 gap-4">
                        {entry.dietNotes && (
                          <div>
                            <h4 className="text-[10px] font-bold uppercase opacity-40 mb-1">Diet</h4>
                            <p className="text-xs">{entry.dietNotes}</p>
                          </div>
                        )}
                        {entry.exerciseNotes && (
                          <div>
                            <h4 className="text-[10px] font-bold uppercase opacity-40 mb-1">Exercise</h4>
                            <p className="text-xs">{entry.exerciseNotes}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {entry.tags.map(tag => (
                          <span key={tag} className="badge badge-outline badge-sm rounded-lg opacity-60">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Albums & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button 
                onClick={() => setSelectedAlbumId('all')}
                className={`btn btn-sm rounded-xl px-6 ${selectedAlbumId === 'all' ? 'btn-primary' : 'btn-ghost bg-base-200'}`}
              >
                All Memories
              </button>
              {albums.filter(a => a.dogId === selectedDogId).map(album => (
                <button
                  key={album.id}
                  onClick={() => setSelectedAlbumId(album.id)}
                  className={`btn btn-sm rounded-xl px-6 ${selectedAlbumId === album.id ? 'btn-secondary' : 'btn-ghost bg-base-200'}`}
                >
                  {album.name}
                </button>
              ))}
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setIsAlbumModalOpen(true)}><Plus size={16} /></button>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-60">
              <ImageIcon size={16} />
              <span>{filteredMemories.length} Items</span>
            </div>
          </div>

          {/* Grid */}
          {filteredMemories.length === 0 ? (
            <div className="bg-base-100 border-2 border-dashed border-base-300 rounded-[3rem] p-20 text-center">
              <Camera size={64} className="mx-auto mb-4 text-primary opacity-20" />
              <h2 className="text-2xl font-bold mb-2">No memories captured yet</h2>
              <p className="opacity-60 mb-6">Upload photos of your dog's best moments.</p>
              <button className="btn btn-primary rounded-2xl" onClick={() => setIsMemoryModalOpen(true)}>Add First Photo</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMemories.map(memory => (
                <div key={memory.id} className="group relative aspect-square rounded-[2rem] overflow-hidden bg-base-200 shadow-sm border border-base-200">
                  <img src={memory.imageUrl} alt={memory.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <h4 className="text-white font-bold truncate">{memory.title}</h4>
                    <p className="text-white/70 text-[10px]">{memory.date}</p>
                    <button 
                      onClick={() => deleteMemoryItem(memory.id)}
                      className="absolute top-4 right-4 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Journal Modal */}
      {isJournalModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-[2.5rem] max-w-2xl">
            <h3 className="font-bold text-2xl mb-6">New Journal Entry</h3>
            <form onSubmit={handleJournalSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Date</span></label>
                  <input 
                    type="date" 
                    className="input input-bordered rounded-2xl" 
                    value={journalForm.date} 
                    onChange={e => setJournalForm({...journalForm, date: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Overall Mood</span></label>
                  <select 
                    className="select select-bordered rounded-2xl" 
                    value={journalForm.mood}
                    onChange={e => setJournalForm({...journalForm, mood: e.target.value as any})}
                  >
                    <option value="Happy">Happy 🐾</option>
                    <option value="Calm">Calm 🕊️</option>
                    <option value="Energetic">Energetic ⚡</option>
                    <option value="Anxious">Anxious 😟</option>
                    <option value="Sleepy">Sleepy 😴</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Behavior & Daily Notes</span></label>
                <textarea 
                  className="textarea textarea-bordered rounded-2xl h-32" 
                  placeholder="How was Buddy today? Any new tricks or funny moments?"
                  value={journalForm.behaviorNotes}
                  onChange={e => setJournalForm({...journalForm, behaviorNotes: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Diet Notes (Optional)</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered rounded-2xl" 
                    placeholder="e.g. New treats, skipped breakfast"
                    value={journalForm.dietNotes}
                    onChange={e => setJournalForm({...journalForm, dietNotes: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Exercise (Optional)</span></label>
                  <input 
                    type="text" 
                    className="input input-bordered rounded-2xl" 
                    placeholder="e.g. 2 mile hike, 30min park"
                    value={journalForm.exerciseNotes}
                    onChange={e => setJournalForm({...journalForm, exerciseNotes: e.target.value})}
                  />
                </div>
              </div>

              <div className="modal-action gap-3">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setIsJournalModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Save Entry</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsJournalModalOpen(false)}></div>
        </div>
      )}

      {/* Memory Modal */}
      {isMemoryModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-[2.5rem] max-w-md">
            <h3 className="font-bold text-2xl mb-6">Add New Memory</h3>
            <form onSubmit={handleMemorySubmit} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Title</span></label>
                <input 
                  type="text" 
                  className="input input-bordered rounded-2xl" 
                  placeholder="e.g. First time at the beach"
                  value={memoryForm.title}
                  onChange={e => setMemoryForm({...memoryForm, title: e.target.value})}
                  required 
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Image URL</span></label>
                <input 
                  type="url" 
                  className="input input-bordered rounded-2xl" 
                  placeholder="https://images.unsplash.com/..."
                  value={memoryForm.imageUrl}
                  onChange={e => setMemoryForm({...memoryForm, imageUrl: e.target.value})}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Date</span></label>
                  <input 
                    type="date" 
                    className="input input-bordered rounded-2xl" 
                    value={memoryForm.date}
                    onChange={e => setMemoryForm({...memoryForm, date: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Album</span></label>
                  <select 
                    className="select select-bordered rounded-2xl"
                    value={memoryForm.albumId}
                    onChange={e => setMemoryForm({...memoryForm, albumId: e.target.value})}
                  >
                    <option value="">None</option>
                    {albums.filter(a => a.dogId === selectedDogId).map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-action gap-3 pt-4">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setIsMemoryModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Save Memory</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsMemoryModalOpen(false)}></div>
        </div>
      )}

      {/* Album Modal */}
      {isAlbumModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-[2.5rem] max-w-sm">
            <h3 className="font-bold text-xl mb-6">Create New Album</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const name = (e.target as any).albumName.value;
              addAlbum({ id: Math.random().toString(36).substr(2, 9), dogId: selectedDogId, name });
              setIsAlbumModalOpen(false);
            }} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Album Name</span></label>
                <input name="albumName" type="text" className="input input-bordered rounded-2xl" placeholder="e.g. Summer 2024" required />
              </div>
              <div className="modal-action gap-3">
                <button type="button" className="btn btn-ghost rounded-2xl flex-1" onClick={() => setIsAlbumModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary rounded-2xl flex-1 shadow-lg">Create</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsAlbumModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default JournalMemories;
