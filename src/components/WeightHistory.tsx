import React, { useMemo, useState } from 'react';
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
  const [newNotes, setNewNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(profile?.goalWeight?.toString() || '');

  const sortedHistory = useMemo(
    () => [...(profile?.weightHistory || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [profile?.weightHistory]
  );

  if (!profile) return null;

  const latestWeight = sortedHistory[0]?.weight;
  const previousWeight = sortedHistory[1]?.weight;
  const firstWeight = sortedHistory[sortedHistory.length - 1]?.weight;

  const weightChange = latestWeight !== undefined && previousWeight !== undefined ? latestWeight - previousWeight : null;
  const overallChange = latestWeight !== undefined && firstWeight !== undefined ? latestWeight - firstWeight : null;
  const isFarFromGoal = profile.goalWeight && latestWeight ? Math.abs(latestWeight - profile.goalWeight) > profile.goalWeight * 0.1 : false;
  const healthyRangeMin = profile.goalWeight ? profile.goalWeight * 0.9 : Math.max((latestWeight || 0) * 0.95, 0);
  const healthyRangeMax = profile.goalWeight ? profile.goalWeight * 1.1 : (latestWeight || 0) * 1.05;
  const averageWeeklyChange = overallChange && sortedHistory.length > 1
    ? overallChange / (Math.max(1, Math.ceil((new Date(sortedHistory[0].date).getTime() - new Date(sortedHistory[sortedHistory.length - 1].date).getTime()) / (1000 * 60 * 60 * 24))) / 7)
    : null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;

    addWeightEntry(dogId, {
      id: crypto.randomUUID(),
      date,
      weight: parseFloat(newWeight),
      notes: newNotes || undefined,
    });

    setNewWeight('');
    setNewNotes('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleUpdateGoal = () => {
    updateProfile({
      ...profile,
      goalWeight: tempGoal ? parseFloat(tempGoal) : undefined,
    });
    setIsEditingGoal(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-primary/10 p-5 rounded-[2rem] border border-primary/20 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-content rounded-2xl p-3">
                <Target size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-neutral opacity-70">Goal Weight</p>
                {isEditingGoal ? (
                  <div className="mt-3 flex flex-col gap-3">
                    <input
                      type="number"
                      step="0.1"
                      className="input input-sm input-bordered w-full bg-base-100"
                      value={tempGoal}
                      onChange={e => setTempGoal(e.target.value)}
                      placeholder="Goal kg"
                    />
                    <button onClick={handleUpdateGoal} className="btn btn-sm btn-primary rounded-full">Save Goal</button>
                  </div>
                ) : (
                  <>
                    <p className="mt-3 text-3xl font-black text-neutral">{profile.goalWeight ? `${profile.goalWeight.toFixed(1)} kg` : 'Not set'}</p>
                    <p className="mt-2 text-sm text-neutral opacity-70">{profile.goalWeight ? 'A target to guide your dog’s wellness journey.' : 'Set a goal to unlock healthy range guidance.'}</p>
                  </>
                )}
              </div>
            </div>
            {!isEditingGoal && (
              <button onClick={() => setIsEditingGoal(true)} className="mt-5 btn btn-ghost btn-sm rounded-full text-neutral">Edit goal</button>
            )}
          </div>

          <div className="grid gap-4">
            <div className="bg-base-100 border border-base-300 p-5 rounded-[2rem] shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-neutral opacity-70">Healthy Range</p>
              <p className="mt-3 text-3xl font-black text-neutral">{healthyRangeMin.toFixed(1)} - {healthyRangeMax.toFixed(1)} kg</p>
              <p className="mt-2 text-sm text-neutral opacity-70">{profile.goalWeight ? 'Based on your current goal' : 'Approximation until goal is set'}</p>
            </div>
            <div className="bg-base-100 border border-base-300 p-5 rounded-[2rem] shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-neutral opacity-70">Trend</p>
              <div className="mt-3 flex items-end gap-4">
                <p className="text-3xl font-black text-neutral">{overallChange !== null ? `${overallChange > 0 ? '+' : ''}${overallChange.toFixed(1)} kg` : '—'}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${overallChange === null ? 'bg-base-200 text-neutral' : overallChange > 0 ? 'bg-error/10 text-error' : 'bg-success/10 text-success'}`}>
                  {overallChange === null ? 'No data' : overallChange > 0 ? 'Gaining' : overallChange < 0 ? 'Losing' : 'Stable'}
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral opacity-70">{averageWeeklyChange !== null ? `Avg ${averageWeeklyChange > 0 ? '+' : ''}${averageWeeklyChange.toFixed(1)} kg/week` : 'More logs needed for weekly trend'}</p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 border border-base-300 p-5 rounded-[2rem] shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-neutral opacity-70">Current Status</p>
          <p className="mt-3 text-2xl font-black text-neutral">{latestWeight ? `${latestWeight.toFixed(1)} kg` : 'No weight yet'}</p>
          <p className="mt-2 text-sm text-neutral opacity-70">Latest log {sortedHistory[0] ? new Date(sortedHistory[0].date).toLocaleDateString() : '—'}</p>
          {profile.goalWeight && latestWeight !== undefined && (
            <p className="mt-4 text-sm text-neutral opacity-70">{Math.abs(latestWeight - profile.goalWeight).toFixed(1)}kg {latestWeight > profile.goalWeight ? 'above' : 'below'} goal</p>
          )}
          {(isFarFromGoal || (weightChange !== null && Math.abs(weightChange) > (latestWeight || 0) * 0.05)) && (
            <div className="mt-5 rounded-2xl border border-warning/20 bg-warning/10 p-4 flex items-start gap-3 text-warning-900">
              <AlertTriangle size={18} className="mt-0.5" />
              <div>
                <p className="text-sm font-bold">Health alert</p>
                {isFarFromGoal && <p className="text-sm opacity-80">Your dog is currently more than 10% away from goal weight.</p>}
                {weightChange !== null && Math.abs(weightChange) > (latestWeight || 0) * 0.05 && (
                  <p className="text-sm opacity-80">Recent change of {Math.abs(weightChange).toFixed(1)}kg may require attention.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <WeightChart history={sortedHistory} goalWeight={profile.goalWeight} healthyRange={{ min: healthyRangeMin, max: healthyRangeMax }} />

      <form onSubmit={handleAdd} className="grid gap-4 bg-base-200 p-5 rounded-[2rem] border border-base-300">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="form-control">
            <label className="label px-0"><span className="label-text text-xs font-bold">Date</span></label>
            <input type="date" className="input input-sm input-bordered w-full" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="form-control">
            <label className="label px-0"><span className="label-text text-xs font-bold">Weight (kg)</span></label>
            <input type="number" step="0.1" className="input input-sm input-bordered w-full" placeholder="20.5" value={newWeight} onChange={e => setNewWeight(e.target.value)} />
          </div>
        </div>

        <div className="form-control">
          <label className="label px-0"><span className="label-text text-xs font-bold">Notes</span></label>
          <textarea
            className="textarea textarea-bordered min-h-[5rem] bg-white"
            placeholder="Add context for this entry: medication changes, appetite, activity"
            value={newNotes}
            onChange={e => setNewNotes(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary rounded-full px-6">
            <Plus size={16} /> Add entry
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-white shadow-sm">
        <table className="table w-full border-separate border-spacing-y-2">
          <thead className="bg-base-200">
            <tr>
              <th className="text-xs uppercase text-neutral opacity-70">Date</th>
              <th className="text-xs uppercase text-neutral opacity-70">Weight</th>
              <th className="text-xs uppercase text-neutral opacity-70">Change</th>
              <th className="text-xs uppercase text-neutral opacity-70">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sortedHistory.map((entry, idx) => {
              const nextEntry = sortedHistory[idx + 1];
              const diff = nextEntry ? entry.weight - nextEntry.weight : 0;
              return (
                <tr key={entry.id} className="bg-base-100 border-t border-base-200">
                  <td className="py-4 text-sm text-neutral">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="py-4 text-sm font-bold text-neutral">{entry.weight.toFixed(1)} kg</td>
                  <td className={`py-4 text-sm font-semibold ${diff > 0 ? 'text-error' : diff < 0 ? 'text-success' : 'text-neutral'}`}>
                    {diff === 0 ? '—' : `${diff > 0 ? '↑' : '↓'} ${Math.abs(diff).toFixed(1)} kg`}
                  </td>
                  <td className="py-4 text-sm text-neutral opacity-75">{entry.notes || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {sortedHistory.length === 0 && (
          <div className="text-center py-8 text-neutral opacity-50 italic">No weight logs yet.</div>
        )}
      </div>
    </div>
  );
};

export default WeightHistory;
