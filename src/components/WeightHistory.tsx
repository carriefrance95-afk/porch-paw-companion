import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { Weight, Plus, History } from 'lucide-react';

interface WeightHistoryProps {
  dogId: string;
}

const WeightHistory: React.FC<WeightHistoryProps> = ({ dogId }) => {
  const { profiles, addWeightEntry } = usePets();
  const profile = profiles.find(p => p.id === dogId);
  const [newWeight, setNewWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWeight) {
      addWeightEntry(dogId, {
        id: crypto.randomUUID(),
        date,
        weight: parseFloat(newWeight)
      });
      setNewWeight('');
    }
  };

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="flex items-end gap-3 bg-base-200 p-4 rounded-2xl">
        <div className="form-control flex-1">
          <label className="label px-1"><span className="label-text text-xs font-bold">Date</span></label>
          <input type="date" className="input input-sm input-bordered w-full" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="form-control flex-1">
          <label className="label px-1"><span className="label-text text-xs font-bold">Weight (kg)</span></label>
          <input type="number" step="0.1" className="input input-sm input-bordered w-full" placeholder="20.5" value={newWeight} onChange={e => setNewWeight(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary btn-sm rounded-xl">
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th className="text-xs">Date</th>
              <th className="text-xs">Weight</th>
              <th className="text-xs">Change</th>
            </tr>
          </thead>
          <tbody>
            {(profile.weightHistory || []).map((entry, idx, arr) => {
              const prevEntry = arr[idx + 1];
              const diff = prevEntry ? entry.weight - prevEntry.weight : 0;
              
              return (
                <tr key={entry.id}>
                  <td className="text-sm">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="font-bold">{entry.weight} kg</td>
                  <td>
                    {diff !== 0 && (
                      <span className={`text-xs font-bold ${diff > 0 ? 'text-error' : 'text-success'}`}>
                        {diff > 0 ? '↑' : '↓'} {Math.abs(diff).toFixed(1)}
                      </span>
                    )}
                    {diff === 0 && idx < arr.length - 1 && <span className="text-xs opacity-30">-</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(profile.weightHistory || []).length === 0 && (
          <div className="text-center py-8 opacity-40 italic text-sm">No weight logs yet.</div>
        )}
      </div>
    </div>
  );
};

export default WeightHistory;
