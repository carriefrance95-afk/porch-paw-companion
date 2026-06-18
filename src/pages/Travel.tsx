import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { type TravelChecklistItem } from '../types';
import { 
  Plus, CheckCircle2, Circle, Map, Compass, Trash2, 
  Luggage, ShieldCheck, Heart
} from 'lucide-react';

const Travel: React.FC = () => {
  const { travelChecklist, addTravelItem, toggleTravelItem, deleteTravelItem } = usePets();
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState<TravelChecklistItem['category']>('Essentials');

  const categories: TravelChecklistItem['category'][] = ['Essentials', 'Health', 'Comfort', 'Activity'];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    addTravelItem({
      id: Math.random().toString(36).substr(2, 9),
      task: newItem,
      category: newCategory,
      completed: false
    });
    setNewItem('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Essentials': return <Luggage size={18} />;
      case 'Health': return <ShieldCheck size={18} />;
      case 'Comfort': return <Heart size={18} />;
      case 'Activity': return <Compass size={18} />;
      default: return <Circle size={18} />;
    }
  };

  const progress = travelChecklist.length > 0 
    ? Math.round((travelChecklist.filter(i => i.completed).length / travelChecklist.length) * 100) 
    : 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-base-content mb-2 flex items-center gap-3">
            <Map className="text-primary" />
            Adventure Planner
          </h1>
          <p className="text-base-content/60 font-medium">Get ready for your next trip with {travelChecklist.length} essential items.</p>
        </div>
        
        <div className="bg-base-100 p-6 rounded-[2rem] border border-base-200 flex items-center gap-6 min-w-[250px] shadow-sm">
          <div className="radial-progress text-primary" style={{ "--value": progress, "--size": "4rem", "--thickness": "6px" } as any} role="progressbar">
            <span className="text-xs font-bold text-base-content">{progress}%</span>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wider opacity-40">Ready to go</p>
            <p className="text-lg font-bold">{travelChecklist.filter(i => i.completed).length} / {travelChecklist.length} Items</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Item Form */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-200 shadow-sm sticky top-6">
            <h3 className="text-xl font-bold mb-6">Add to Checklist</h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">What do you need?</span></label>
                <input 
                  type="text" 
                  className="input input-bordered rounded-2xl" 
                  placeholder="e.g. Collapsible bowls" 
                  value={newItem}
                  onChange={e => setNewItem(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-bold">Category</span></label>
                <select 
                  className="select select-bordered rounded-2xl"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block rounded-2xl gap-2 mt-4 shadow-lg shadow-primary/20">
                <Plus size={20} /> Add Item
              </button>
            </form>

            <div className="mt-10 p-6 bg-base-200 rounded-3xl">
              <h4 className="font-bold text-sm mb-3">Travel Pro Tip</h4>
              <p className="text-xs opacity-70 leading-relaxed italic">
                "Always pack 2 extra days worth of food and medications in case of travel delays!"
              </p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="lg:col-span-2 space-y-8">
          {categories.map(category => {
            const items = travelChecklist.filter(i => i.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-40 flex items-center gap-2 pl-2">
                  {getCategoryIcon(category)}
                  {category}
                </h3>
                <div className="bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden shadow-sm">
                  {items.map((item, idx) => (
                    <div 
                      key={item.id} 
                      className={`flex items-center justify-between p-5 hover:bg-base-200 transition-colors cursor-pointer group ${idx !== items.length - 1 ? 'border-b border-base-200' : ''}`}
                      onClick={() => toggleTravelItem(item.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`transition-colors ${item.completed ? 'text-success' : 'text-base-content/20'}`}>
                          {item.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </div>
                        <span className={`font-bold ${item.completed ? 'line-through opacity-40' : ''}`}>
                          {item.task}
                        </span>
                      </div>
                      <button 
                        className="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 text-error transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTravelItem(item.id);
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {travelChecklist.length === 0 && (
            <div className="bg-base-100 border-2 border-dashed border-base-300 rounded-[3rem] p-20 text-center">
              <Luggage size={64} className="mx-auto mb-4 text-primary opacity-20" />
              <h2 className="text-2xl font-bold mb-2">Your checklist is empty</h2>
              <p className="opacity-60 mb-6">Start adding items for your next big adventure.</p>
              <button className="btn btn-primary rounded-2xl" onClick={() => (document.querySelector('input') as any)?.focus()}>Add First Item</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Travel;
