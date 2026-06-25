import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  DogProfile, VaccineRecord, Medication, Allergy, Surgery, VetVisit, WeightEntry,
  Appointment, EmergencyContact, PetSitterInstructions, LostPetFlyer,
  DirectoryEntry, JournalEntry, MemoryItem, Album, TravelChecklistItem, Product, VetVisitPrep, SubscriptionPlan
} from '../types';

interface PetContextType {
  profiles: DogProfile[];
  vaccines: VaccineRecord[];
  medications: Medication[];
  allergies: Allergy[];
  surgeries: Surgery[];
  vetVisits: VetVisit[];
  appointments: Appointment[];
  emergencyContacts: EmergencyContact[];
  sitterInstructions: PetSitterInstructions[];
  lostPetFlyers: LostPetFlyer[];
  directory: DirectoryEntry[];
  journal: JournalEntry[];
  memories: MemoryItem[];
  albums: Album[];
  travelChecklist: TravelChecklistItem[];
  products: Product[];
  vetVisitPreps: VetVisitPrep[];
  plan: SubscriptionPlan;
  
  // Plan Methods
  setPlan: (plan: SubscriptionPlan) => void;
  
  // Profile Methods
  addProfile: (profile: DogProfile) => void;
  updateProfile: (profile: DogProfile) => void;
  deleteProfile: (id: string) => void;
  
  // Record Methods
  addVaccine: (vaccine: VaccineRecord) => void;
  updateVaccine: (vaccine: VaccineRecord) => void;
  deleteVaccine: (id: string) => void;
  
  addMedication: (medication: Medication) => void;
  updateMedication: (medication: Medication) => void;
  deleteMedication: (id: string) => void;
  
  addAllergy: (allergy: Allergy) => void;
  updateAllergy: (allergy: Allergy) => void;
  deleteAllergy: (id: string) => void;
  
  addSurgery: (surgery: Surgery) => void;
  updateSurgery: (surgery: Surgery) => void;
  deleteSurgery: (id: string) => void;
  
  addVetVisit: (visit: VetVisit) => void;
  updateVetVisit: (visit: VetVisit) => void;
  deleteVetVisit: (id: string) => void;

  // Appointment Methods
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;

  // Emergency Contact Methods
  addEmergencyContact: (contact: EmergencyContact) => void;
  updateEmergencyContact: (contact: EmergencyContact) => void;
  deleteEmergencyContact: (id: string) => void;

  // Sitter Instructions Methods
  updateSitterInstructions: (instructions: PetSitterInstructions) => void;

  // Lost Pet Flyer Methods
  updateLostPetFlyer: (flyer: LostPetFlyer) => void;
  
  // Directory Methods
  addDirectoryEntry: (entry: DirectoryEntry) => void;
  updateDirectoryEntry: (entry: DirectoryEntry) => void;
  deleteDirectoryEntry: (id: string) => void;

  // Journal Methods
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (entry: JournalEntry) => void;
  deleteJournalEntry: (id: string) => void;

  // Memory Methods
  addMemoryItem: (item: MemoryItem) => void;
  updateMemoryItem: (item: MemoryItem) => void;
  deleteMemoryItem: (id: string) => void;
  addAlbum: (album: Album) => void;
  deleteAlbum: (id: string) => void;

  // Travel Checklist Methods
  updateTravelChecklist: (items: TravelChecklistItem[]) => void;
  addTravelItem: (item: TravelChecklistItem) => void;
  deleteTravelItem: (id: string) => void;
  toggleTravelItem: (id: string) => void;
  
  // Vet Visit Preparation Methods
  addVetVisitPrep: (prep: VetVisitPrep) => void;
  updateVetVisitPrep: (prep: VetVisitPrep) => void;
  deleteVetVisitPrep: (id: string) => void;
  
  // Helper Methods
  addWeightEntry: (dogId: string, entry: WeightEntry) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<DogProfile[]>([]);
  const [vaccines, setVaccines] = useState<VaccineRecord[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [vetVisits, setVetVisits] = useState<VetVisit[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [sitterInstructions, setSitterInstructions] = useState<PetSitterInstructions[]>([]);
  const [lostPetFlyers, setLostPetFlyers] = useState<LostPetFlyer[]>([]);
  const [directory, setDirectory] = useState<DirectoryEntry[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [travelChecklist, setTravelChecklist] = useState<TravelChecklistItem[]>([]);
  const [vetVisitPreps, setVetVisitPreps] = useState<VetVisitPrep[]>([]);
  const [plan, setPlan] = useState<SubscriptionPlan>('Free');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const products: Product[] = [
    {
      id: '1',
      name: 'Ultimate Homemade Cookbook',
      price: 24.99,
      description: '50+ Vet-approved recipes for a healthier, happier pup.',
      imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800',
      category: 'Cookbooks'
    },
    {
      id: '2',
      name: 'Premium Adventure Harness',
      price: 45.00,
      description: 'Durable, reflective, and comfortable for long hikes.',
      imageUrl: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=800',
      category: 'Gear'
    },
    {
      id: '3',
      name: 'Interactive Puzzle Toy',
      price: 18.99,
      description: 'Keep your dog mentally sharp with this treat-dispensing puzzle.',
      imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800',
      category: 'Gear'
    }
  ];

  // Load from LocalStorage on mount
  useEffect(() => {
    const dataHandlers: Record<string, (val: any) => void> = {
      pet_profiles: setProfiles,
      pet_vaccines: setVaccines,
      pet_medications: setMedications,
      pet_allergies: setAllergies,
      pet_surgeries: setSurgeries,
      pet_vet_visits: setVetVisits,
      pet_appointments: setAppointments,
      pet_emergency_contacts: setEmergencyContacts,
      pet_sitter_instructions: setSitterInstructions,
      pet_lost_pet_flyers: setLostPetFlyers,
      pet_directory: setDirectory,
      pet_journal: setJournal,
      pet_memories: setMemories,
      pet_albums: setAlbums,
      pet_travel_checklist: setTravelChecklist,
      pet_vet_visit_preps: setVetVisitPreps,
      pet_subscription_plan: setPlan,
    };

    Object.entries(dataHandlers).forEach(([key, setter]) => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          setter(JSON.parse(stored));
        } catch (e) {
          console.error(`Error parsing ${key}`, e);
        }
      }
    });
    setIsInitialLoad(false);
  }, []);

  // Fetch from Cloud for returning users
  useEffect(() => {
    const fetchCloudData = async () => {
      if (!user) return;

      // Check if user has already synced (migrated)
      const { data: userData } = await supabase
        .from('users')
        .select('synced_at, plan')
        .eq('id', user.id)
        .single();

      if (!userData?.synced_at) return;

      console.log('Fetching cloud data for returning user...');
      if (userData.plan) setPlan(userData.plan);

      // 1. Profiles & Weight History
      const { data: cloudProfiles } = await supabase
        .from('dog_profiles')
        .select(`
          *,
          weight_history (*)
        `)
        .eq('user_id', user.id);

      if (cloudProfiles) {
        const mappedProfiles: DogProfile[] = cloudProfiles.map(p => ({
          id: p.id,
          name: p.name,
          breed: p.breed,
          birthDate: p.birth_date,
          gotchaDate: p.gotcha_date,
          currentWeight: p.weight_history?.[0]?.weight || 0,
          goalWeight: p.goal_weight,
          microchipId: p.microchip_id,
          insuranceProvider: p.insurance_provider,
          insurancePolicyNumber: p.insurance_policy_number,
          photoUrl: p.photo_url,
          weightHistory: (p.weight_history || []).map((w: any) => ({
            id: w.id,
            date: w.date,
            weight: w.weight
          })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }));
        setProfiles(mappedProfiles);

        const dogIds = cloudProfiles.map(p => p.id);

        // 2. Health Records
        const { data: healthRecords } = await supabase
          .from('health_records')
          .select('*')
          .in('dog_id', dogIds);

        if (healthRecords) {
          setVaccines(healthRecords.filter(r => r.type === 'vaccine').map(v => ({
            id: v.id,
            dogId: v.dog_id,
            vaccineName: v.title,
            dateAdministered: v.date,
            nextDueDate: v.next_due_date,
            notes: v.description
          })));

          setMedications(healthRecords.filter(r => r.type === 'medication').map(m => ({
            id: m.id,
            dogId: m.dog_id,
            name: m.title,
            dosage: m.dosage,
            frequency: m.frequency,
            startDate: m.date,
            endDate: m.end_date,
            active: m.is_active,
            notes: m.description
          })));

          setAllergies(healthRecords.filter(r => r.type === 'allergy').map(a => ({
            id: a.id,
            dogId: a.dog_id,
            allergen: a.title,
            severity: a.severity || 'medium',
            date: a.date,
            notes: a.description
          })));

          setSurgeries(healthRecords.filter(r => r.type === 'surgery').map(s => ({
            id: s.id,
            dogId: s.dog_id,
            procedure: s.title,
            date: s.date,
            notes: s.description
          })));

          setVetVisits(healthRecords.filter(r => r.type === 'vet_visit').map(v => ({
            id: v.id,
            dogId: v.dog_id,
            date: v.date,
            reason: v.title,
            notes: v.description,
            veterinarian: v.veterinarian
          })));
        }

        // 3. Journal & Memories
        const { data: cloudJournal } = await supabase
          .from('journal_entries')
          .select('*')
          .in('dog_id', dogIds);
        
        if (cloudJournal) {
          setJournal(cloudJournal.map(j => ({
            id: j.id,
            dogId: j.dog_id,
            date: j.date,
            mood: j.mood,
            behaviorNotes: j.behavior_notes,
            dietNotes: j.diet_notes,
            exerciseNotes: j.exercise_notes,
            tags: j.tags || []
          })));
        }

        const { data: cloudAlbums } = await supabase
          .from('albums')
          .select('*')
          .in('dog_id', dogIds);
        
        if (cloudAlbums) {
          setAlbums(cloudAlbums.map(a => ({
            id: a.id,
            dogId: a.dog_id,
            name: a.name,
            description: a.description
          })));
        }

        const { data: cloudMemories } = await supabase
          .from('memory_items')
          .select('*')
          .in('dog_id', dogIds);
        
        if (cloudMemories) {
          setMemories(cloudMemories.map(m => ({
            id: m.id,
            dogId: m.dog_id,
            albumId: m.album_id,
            date: m.date,
            title: m.title,
            description: m.description,
            imageUrl: m.image_url,
            type: m.media_type as 'Photo' | 'Video'
          })));
        }

        // 4. Instructions & Flyers
        const { data: cloudInstructions } = await supabase
          .from('sitter_instructions')
          .select('*')
          .in('dog_id', dogIds);
        
        if (cloudInstructions) {
          setSitterInstructions(cloudInstructions.map(i => ({
            dogId: i.dog_id,
            feedingSchedule: i.feeding_schedule,
            medicationGuide: i.medication_guide,
            behavioralNotes: i.behavioral_notes,
            favoriteToys: i.favorite_toys,
            routines: i.routines,
            emergencyNotes: i.emergency_notes
          })));
        }

        const { data: cloudFlyers } = await supabase
          .from('lost_pet_flyers')
          .select('*')
          .in('dog_id', dogIds);
        
        if (cloudFlyers) {
          setLostPetFlyers(cloudFlyers.map(f => ({
            dogId: f.dog_id,
            lastSeenDate: f.last_seen_date,
            lastSeenLocation: f.last_seen_location,
            reward: f.reward,
            contactPhone: f.contact_phone,
            notes: f.notes
          })));
        }
      }

      // 5. User-level data
      const { data: cloudAppointments } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id);
      
      if (cloudAppointments) {
        setAppointments(cloudAppointments.map(a => ({
          id: a.id,
          dogId: a.dog_id,
          type: a.type,
          date: a.date,
          time: a.time,
          providerName: a.provider_name,
          providerAddress: a.provider_address,
          notes: a.notes,
          completed: a.completed
        })));
      }

      const { data: cloudDirectory } = await supabase
        .from('directory_entries')
        .select('*')
        .eq('user_id', user.id);
      
      if (cloudDirectory) {
        setDirectory(cloudDirectory.map(d => ({
          id: d.id,
          name: d.name,
          category: d.category,
          phone: d.phone,
          email: d.email,
          address: d.address,
          website: d.website,
          rating: d.rating,
          notes: d.notes
        })));
      }

      const { data: cloudEmergency } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id);
      
      if (cloudEmergency) {
        setEmergencyContacts(cloudEmergency.map(c => ({
          id: c.id,
          name: c.name,
          relationship: c.relationship,
          phone: c.phone,
          email: c.email,
          isPrimary: c.is_primary
        })));
      }
    };

    if (!isInitialLoad) {
      fetchCloudData();
    }
  }, [user, isInitialLoad]);

  // Save to LocalStorage
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_profiles', JSON.stringify(profiles)); }, [profiles, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_vaccines', JSON.stringify(vaccines)); }, [vaccines, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_medications', JSON.stringify(medications)); }, [medications, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_allergies', JSON.stringify(allergies)); }, [allergies, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_surgeries', JSON.stringify(surgeries)); }, [surgeries, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_vet_visits', JSON.stringify(vetVisits)); }, [vetVisits, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_appointments', JSON.stringify(appointments)); }, [appointments, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_emergency_contacts', JSON.stringify(emergencyContacts)); }, [emergencyContacts, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_sitter_instructions', JSON.stringify(sitterInstructions)); }, [sitterInstructions, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_lost_pet_flyers', JSON.stringify(lostPetFlyers)); }, [lostPetFlyers, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_directory', JSON.stringify(directory)); }, [directory, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_journal', JSON.stringify(journal)); }, [journal, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_memories', JSON.stringify(memories)); }, [memories, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_albums', JSON.stringify(albums)); }, [albums, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_travel_checklist', JSON.stringify(travelChecklist)); }, [travelChecklist, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_vet_visit_preps', JSON.stringify(vetVisitPreps)); }, [vetVisitPreps, isInitialLoad]);
  useEffect(() => { if (!isInitialLoad) localStorage.setItem('pet_subscription_plan', JSON.stringify(plan)); }, [plan, isInitialLoad]);


  // Handlers
  const addProfile = (p: DogProfile) => setProfiles(prev => [...prev, p]);
  const updateProfile = (p: DogProfile) => setProfiles(prev => prev.map(item => item.id === p.id ? p : item));
  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    setVaccines(prev => prev.filter(v => v.dogId !== id));
    setMedications(prev => prev.filter(m => m.dogId !== id));
    setAllergies(prev => prev.filter(a => a.dogId !== id));
    setSurgeries(prev => prev.filter(s => s.dogId !== id));
    setVetVisits(prev => prev.filter(v => v.dogId !== id));
    setAppointments(prev => prev.filter(a => a.dogId !== id));
    setSitterInstructions(prev => prev.filter(s => s.dogId !== id));
    setLostPetFlyers(prev => prev.filter(f => f.dogId !== id));
    setJournal(prev => prev.filter(j => j.dogId !== id));
    setMemories(prev => prev.filter(m => m.dogId !== id));
    setAlbums(prev => prev.filter(a => a.dogId !== id));
  };

  const addVaccine = (v: VaccineRecord) => setVaccines(prev => [...prev, v]);
  const updateVaccine = (v: VaccineRecord) => setVaccines(prev => prev.map(i => i.id === v.id ? v : i));
  const deleteVaccine = (id: string) => setVaccines(prev => prev.filter(i => i.id !== id));

  const addMedication = (m: Medication) => setMedications(prev => [...prev, m]);
  const updateMedication = (m: Medication) => setMedications(prev => prev.map(i => i.id === m.id ? m : i));
  const deleteMedication = (id: string) => setMedications(prev => prev.filter(i => i.id !== id));

  const addAllergy = (a: Allergy) => setAllergies(prev => [...prev, a]);
  const updateAllergy = (a: Allergy) => setAllergies(prev => prev.map(i => i.id === a.id ? a : i));
  const deleteAllergy = (id: string) => setAllergies(prev => prev.filter(i => i.id !== id));

  const addSurgery = (s: Surgery) => setSurgeries(prev => [...prev, s]);
  const updateSurgery = (s: Surgery) => setSurgeries(prev => prev.map(i => i.id === s.id ? s : i));
  const deleteSurgery = (id: string) => setSurgeries(prev => prev.filter(i => i.id !== id));

  const addVetVisit = (v: VetVisit) => setVetVisits(prev => [...prev, v]);
  const updateVetVisit = (v: VetVisit) => setVetVisits(prev => prev.map(i => i.id === v.id ? v : i));
  const deleteVetVisit = (id: string) => setVetVisits(prev => prev.filter(i => i.id !== id));

  const addAppointment = (a: Appointment) => setAppointments(prev => [...prev, a]);
  const updateAppointment = (a: Appointment) => setAppointments(prev => prev.map(item => item.id === a.id ? a : item));
  const deleteAppointment = (id: string) => setAppointments(prev => prev.filter(a => a.id !== id));

  const addEmergencyContact = (c: EmergencyContact) => setEmergencyContacts(prev => [...prev, c]);
  const updateEmergencyContact = (c: EmergencyContact) => setEmergencyContacts(prev => prev.map(item => item.id === c.id ? c : item));
  const deleteEmergencyContact = (id: string) => setEmergencyContacts(prev => prev.filter(c => c.id !== id));

  const updateSitterInstructions = (instr: PetSitterInstructions) => {
    setSitterInstructions(prev => {
      const exists = prev.find(s => s.dogId === instr.dogId);
      if (exists) return prev.map(s => s.dogId === instr.dogId ? instr : s);
      return [...prev, instr];
    });
  };

  const updateLostPetFlyer = (flyer: LostPetFlyer) => {
    setLostPetFlyers(prev => {
      const exists = prev.find(f => f.dogId === flyer.dogId);
      if (exists) return prev.map(f => f.dogId === flyer.dogId ? flyer : f);
      return [...prev, flyer];
    });
  };

  const addDirectoryEntry = (e: DirectoryEntry) => setDirectory(prev => [...prev, e]);
  const updateDirectoryEntry = (e: DirectoryEntry) => setDirectory(prev => prev.map(i => i.id === e.id ? e : i));
  const deleteDirectoryEntry = (id: string) => setDirectory(prev => prev.filter(i => i.id !== id));

  const addJournalEntry = (e: JournalEntry) => setJournal(prev => [...prev, e]);
  const updateJournalEntry = (e: JournalEntry) => setJournal(prev => prev.map(i => i.id === e.id ? e : i));
  const deleteJournalEntry = (id: string) => setJournal(prev => prev.filter(i => i.id !== id));

  const addMemoryItem = (i: MemoryItem) => setMemories(prev => [...prev, i]);
  const updateMemoryItem = (i: MemoryItem) => setMemories(prev => prev.map(m => m.id === i.id ? i : m));
  const deleteMemoryItem = (id: string) => setMemories(prev => prev.filter(i => i.id !== id));
  const addAlbum = (a: Album) => setAlbums(prev => [...prev, a]);
  const deleteAlbum = (id: string) => {
    setAlbums(prev => prev.filter(a => a.id !== id));
    setMemories(prev => prev.map(m => m.albumId === id ? { ...m, albumId: undefined } : m));
  };

  const updateTravelChecklist = (items: TravelChecklistItem[]) => setTravelChecklist(items);
  const addTravelItem = (item: TravelChecklistItem) => setTravelChecklist(prev => [...prev, item]);
  const deleteTravelItem = (id: string) => setTravelChecklist(prev => prev.filter(i => i.id !== id));
  const toggleTravelItem = (id: string) => {
    setTravelChecklist(prev => prev.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const addVetVisitPrep = (p: VetVisitPrep) => setVetVisitPreps(prev => [...prev, p]);
  const updateVetVisitPrep = (p: VetVisitPrep) => setVetVisitPreps(prev => prev.map(i => i.id === p.id ? p : i));
  const deleteVetVisitPrep = (id: string) => setVetVisitPreps(prev => prev.filter(i => i.id !== id));

  const addWeightEntry = (dogId: string, entry: WeightEntry) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === dogId) {
        return {
          ...p,
          currentWeight: entry.weight,
          weightHistory: [...(p.weightHistory || []), entry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        };
      }
      return p;
    }));
  };

  return (
    <PetContext.Provider value={{
      profiles, vaccines, medications, allergies, surgeries, vetVisits, appointments, emergencyContacts, sitterInstructions, lostPetFlyers,
      directory, journal, memories, albums, travelChecklist, products, vetVisitPreps, plan,
      addProfile, updateProfile, deleteProfile,
      addVaccine, updateVaccine, deleteVaccine,
      addMedication, updateMedication, deleteMedication,
      addAllergy, updateAllergy, deleteAllergy,
      addSurgery, updateSurgery, deleteSurgery,
      addVetVisit, updateVetVisit, deleteVetVisit,
      addAppointment, updateAppointment, deleteAppointment,
      addEmergencyContact, updateEmergencyContact, deleteEmergencyContact,
      updateSitterInstructions, updateLostPetFlyer,
      addDirectoryEntry, updateDirectoryEntry, deleteDirectoryEntry,
      addJournalEntry, updateJournalEntry, deleteJournalEntry,
      addMemoryItem, updateMemoryItem, deleteMemoryItem, addAlbum, deleteAlbum,
      updateTravelChecklist, addTravelItem, deleteTravelItem, toggleTravelItem,
      addVetVisitPrep, updateVetVisitPrep, deleteVetVisitPrep,
      addWeightEntry, setPlan
    }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};
