import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { Plus, Target, AlertTriangle } from 'lucide-react';
import WeightChart from './WeightChart';

interface WeightHistoryProps {
  dogId: string;
}

const WeightHistory: React.FC<WeightHistoryProps> = ({ dogId }) => {
  const { profiles, addWeightEntry, updateProfile } = usePets();
  const profile = profiles.find(p => p.id === dogId);
  const [newWeight, setNewWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(profile?.goalWeight?.toString() || '');

  if (!profile) return null;

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

  const handleUpdateGoal = () => {
    updateProfile({
      ...profile,
      goalWeight: tempGoal ? parseFloat(tempGoal) : undefined
    });
    setIsEditingGoal(false);
  };

  const latestWeight = profile.weightHistory?.[0]?.weight;
  const prevWeight = profile.weightHistory?.[1]?.weight;
  const weightChange = latestWeight && prevWeight ? latestWeight - prevWeight : null;
  const isFarFromGoal = profile.goalWeight && latestWeight ? Math.abs(latestWeight - profile.goalWeight) > profile.goalWeight * 0.1 : false;

  return (
    <div className="space-y-6">
      {/* Goal & Alert Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary/10 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-content p-2 rounded-xl">
              <Target size={20} />
            </div>
            <div>
              <p className="text-xs font-bold opacity-60 uppercase">Goal Weight</p>
              {isEditingGoal ? (
                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="number" step="0.1" 
                    className="input input-xs input-bordered w-20" 
                    value={tempGoal} onChange={e => setTempGoal(e.target.value)} 
                  />
                  <button onClick={handleUpdateGoal} className="btn btn-xs btn-primary">Save</button>
                </div>
              ) : (
                <p className="font-bold text-lg">{profile.goalWeight ? `${profile.goalWeight} kg` : 'Not set'}</p>
              )}
            </div>
          </div>
          {!isEditingGoal && (
            <button onClick={() => setIsEditingGoal(true)} className="btn btn-ghost btn-sm text-primary">Edit</button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {isFarFromGoal && (
            <div className="bg-warning/10 p-4 rounded-2xl flex items-center gap-3 border border-warning/20">
              <div className="bg-warning text-warning-content p-2 rounded-xl">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-warning-700 uppercase">Weight Alert</p>
                <p className="text-sm font-medium">Currently 10%+ away from goal weight.</p>
              </div>
            </div>
          )}
          
          {weightChange !== null && Math.abs(weightChange) > profile.currentWeight * 0.05 && (
            <div className="bg-error/10 p-4 rounded-2xl flex items-center gap-3 border border-error/20">
              <div className="bg-error text-error-content p-2 rounded-xl">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-error-700 uppercase">Rapid Change Alert</p>
                <p className="text-sm font-medium">Weight changed by {Math.abs(weightChange).toFixed(1)}kg recently.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <WeightChart history={profile.weightHistory || []} goalWeight={profile.goalWeight} />

      {/* Add Log Form */}
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

      {/* Table */}
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
