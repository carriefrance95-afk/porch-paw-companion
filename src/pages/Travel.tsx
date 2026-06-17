import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { type TravelChecklistItem } from '../types';
import { 
  Plus, CheckCircle2, Circle, Briefcase, Map, Compass, Info, Trash2, 
  ChevronRight, Luggage, ShieldCheck, HeartPulse, Bone
} from 'lucide-react';

const Travel: React.FC = () => {
  const { travelChecklist, updateTravelChecklist, toggleTravelItem } = usePets();
  const [newItem, setNewWeight] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Essentials', 'Health', 'Comfort', 'Activity'];

  const defaultItems: TravelChecklistItem[] = [
    { id: '1', task: 'Leash and Collar with ID Tags', completed: false, category: 'Essentials' },
    { id: '2', task: 'Collapsible Water Bowl', completed: false, category: 'Essentials' },
    { id: '3', task: 'Enough Food for the Trip', completed: false, category: 'Essentials' },
    { id: '4', task: 'Vaccination Records', completed: false, category: 'Health' },
    { id: '5', task: 'First Aid Kit', completed: false, category: 'Health' },
    { id: '6', task: 'Current Medications', completed: false, category: 'Health' },
    { id: '7', task: 'Dog Bed or Blanket', completed: false, category: 'Comfort' },
    { id: '8', task: 'Favorite Plush Toy', completed: false, category: 'Comfort' },
    { id: '9', task: 'Long Lead for Hiking', completed: false, category: 'Activity' },
  ];

  const initializeList = () => {
    if (travelChecklist.length === 0) {
      updateTravelChecklist(defaultItems);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem) return;
    const item: TravelChecklistItem = {
      id: Math.random().toString(36).substr(2, 9),
      task: newItem,
      completed: false,
      category: (activeCategory === 'All' ? 'Essentials' : activeCategory) as any
    };
    updateTravelChecklist([...travelChecklist, item]);
    setNewWeight('');
  };

  const removeItem = (id: string) => {
    updateTravelChecklist(travelChecklist.filter(i => i.id !== id));
  };

  const filteredItems = travelChecklist.filter(i => activeCategory === 'All' || i.category === activeCategory);
  const completedCount = travelChecklist.filter(i => i.completed).length;

  return (
    <div className="p-6 max-w-4xl mx-auto" onLoad={initializeList}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2 flex items-center gap-3">
            <Luggage className="text-primary" />
            Travel & Adventure
          </h1>
          <p className="text-base-content/70">Prepare for your next journey with your furry co-pilot.</p>
        </div>
        <div className="stats shadow bg-base-100 border border-base-200 rounded-2xl">
          <div className="stat py-2 px-6">
            <div className="stat-title text-[10px] uppercase font-bold">Progress</div>
            <div className="stat-value text-2xl text-primary">{travelChecklist.length > 0 ? Math.round((completedCount / travelChecklist.length) * 100) : 0}%</div>
            <div className="stat-desc text-[10px]">{completedCount} of {travelChecklist.length} packed</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Tips & Info */}
        <div className="space-y-6">
          <div className="bg-primary text-primary-content rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Compass size={20} />
                Pro Traveler Tip
              </h3>
              <p className="text-sm opacity-90 leading-relaxed mb-6">
                Always pack a familiar smelling blanket to help your dog feel safe and settled in new environments like hotels or rentals.
              </p>
              <button className="btn btn-secondary btn-sm rounded-xl">Read Guides</button>
            </div>
            <Map className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="bg-base-100 rounded-[2rem] p-6 shadow-sm border border-base-200">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-success" />
              Safety Checklist
            </h4>
            <ul className="space-y-3 text-xs opacity-80">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                Update microchip contact info
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                Find local emergency vet at destination
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                Check travel requirements (USDA/State)
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200 min-h-[500px]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Packing List</h2>
              {travelChecklist.length === 0 && (
                <button className="btn btn-ghost btn-sm text-primary" onClick={() => updateTravelChecklist(defaultItems)}>
                  Load Defaults
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-xs rounded-lg px-4 h-8 ${activeCategory === cat ? 'btn-primary' : 'btn-ghost bg-base-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Add Item */}
            <form onSubmit={handleAddItem} className="flex gap-2 mb-8">
              <input 
                type="text" 
                placeholder="Add item to pack..." 
                className="input input-bordered flex-1 rounded-xl h-12"
                value={newItem}
                onChange={e => setNewWeight(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-square h-12 w-12 rounded-xl">
                <Plus size={20} />
              </button>
            </form>

            {/* Items */}
            <div className="space-y-2">
              {filteredItems.map(item => (
                <div key={item.id} className="flex items-center justify-between group p-3 bg-base-200/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleTravelItem(item.id)}
                      className={`btn btn-circle btn-sm border-none ${item.completed ? 'btn-success text-white' : 'btn-ghost bg-base-300 text-base-content/20'}`}
                    >
                      {item.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    </button>
                    <span className={`text-sm font-medium ${item.completed ? 'line-through opacity-40' : ''}`}>
                      {item.task}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase opacity-30 px-2 py-1 bg-base-300 rounded-lg hidden sm:block">
                      {item.category}
                    </span>
                    <button onClick={() => removeItem(item.id)} className="btn btn-ghost btn-xs btn-circle text-error opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center py-20 opacity-30 italic">
                  No items in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;
