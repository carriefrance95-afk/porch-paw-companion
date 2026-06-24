import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const useMigration = () => {
  const { user } = useAuth();
  const [isMigrating, setIsMigrating] = useState(false);

  useEffect(() => {
    const migrate = async () => {
      if (!user) return;

      // Check if migration has already happened for this user
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('synced_at')
        .eq('id', user.id)
        .single();

      if (userError || (userData && userData.synced_at)) {
        return; // Already synced or user not found in public.users yet
      }

      setIsMigrating(true);
      console.log('Starting migration for user:', user.id);

      try {
        // 1. Collect all LocalStorage data
        const profiles = JSON.parse(localStorage.getItem('pet_profiles') || '[]');
        const vaccines = JSON.parse(localStorage.getItem('pet_vaccines') || '[]');
        const medications = JSON.parse(localStorage.getItem('pet_medications') || '[]');
        const journal = JSON.parse(localStorage.getItem('pet_journal') || '[]');
        // ... add other collections as needed

        if (profiles.length === 0) {
           // Nothing to migrate, just mark as synced
           await supabase.from('users').update({ synced_at: new Date() }).eq('id', user.id);
           setIsMigrating(false);
           return;
        }

        // 2. Migration Logic: This is complex because we need to map local IDs to new Cloud UUIDs
        const idMap: Record<string, string> = {};

        for (const profile of profiles) {
          const { data: newProfile, error: pError } = await supabase
            .from('dog_profiles')
            .insert({
              user_id: user.id,
              name: profile.name,
              breed: profile.breed,
              birth_date: profile.birthDate,
              gotcha_date: profile.gotchaDate,
              photo_url: profile.imageUrl,
              microchip_id: profile.microchipId,
              insurance_provider: profile.insurance?.provider,
              insurance_policy_number: profile.insurance?.policyNumber,
              goal_weight: profile.goalWeight
            })
            .select()
            .single();

          if (pError) throw pError;
          idMap[profile.id] = newProfile.id;

          // Push weight history for this dog
          if (profile.weightHistory && profile.weightHistory.length > 0) {
             const weightData = profile.weightHistory.map((w: any) => ({
                dog_id: newProfile.id,
                date: w.date,
                weight: w.weight
             }));
             await supabase.from('weight_history').insert(weightData);
          }
        }

        // 3. Push dependent records using idMap
        if (vaccines.length > 0) {
          const vaccineData = vaccines.map((v: any) => ({
            dog_id: idMap[v.dogId],
            type: 'vaccine',
            date: v.date,
            title: v.name,
            next_due_date: v.nextDueDate,
            veterinarian: v.clinic
          })).filter((v: any) => v.dog_id);
          if (vaccineData.length > 0) await supabase.from('health_records').insert(vaccineData);
        }

        if (medications.length > 0) {
           const medData = medications.map((m: any) => ({
              dog_id: idMap[m.dogId],
              type: 'medication',
              date: m.startDate,
              title: m.name,
              dosage: m.dosage,
              frequency: m.frequency,
              end_date: m.endDate,
              is_active: m.active
           })).filter((m: any) => m.dog_id);
           if (medData.length > 0) await supabase.from('health_records').insert(medData);
        }

        if (journal.length > 0) {
           const journalData = journal.map((j: any) => ({
              dog_id: idMap[j.dogId],
              date: j.date,
              mood: j.mood,
              behavior_notes: j.behavior,
              diet_notes: j.diet,
              exercise_notes: j.exercise,
              tags: j.tags
           })).filter((j: any) => j.dog_id);
           if (journalData.length > 0) await supabase.from('journal_entries').insert(journalData);
        }

        // 4. Mark migration as complete
        await supabase.from('users').update({ synced_at: new Date() }).eq('id', user.id);
        
        console.log('Migration completed successfully');
        
        // Optionally clear legacy LocalStorage or mark it as migrated
        localStorage.setItem('pet_migrated', 'true');

      } catch (err) {
        console.error('Migration failed:', err);
      } finally {
        setIsMigrating(false);
      }
    };

    migrate();
  }, [user]);

  return { isMigrating };
};
