import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  type DogProfile, type VaccineRecord, type Medication, type Allergy, type Surgery, type VetVisit, type WeightEntry,
  type Appointment, type EmergencyContact, type PetSitterInstructions, type LostPetFlyer,
  type DirectoryEntry, type JournalEntry, type MemoryItem, type Album, type TravelChecklistItem
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
  toggleTravelItem: (id: string) => void;
  
  // Helper Methods
  addWeightEntry: (dogId: string, entry: WeightEntry) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  // Load from LocalStorage
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
  }, []);

  // Save to LocalStorage
  useEffect(() => { localStorage.setItem('pet_profiles', JSON.stringify(profiles)); }, [profiles]);
  useEffect(() => { localStorage.setItem('pet_vaccines', JSON.stringify(vaccines)); }, [vaccines]);
  useEffect(() => { localStorage.setItem('pet_medications', JSON.stringify(medications)); }, [medications]);
  useEffect(() => { localStorage.setItem('pet_allergies', JSON.stringify(allergies)); }, [allergies]);
  useEffect(() => { localStorage.setItem('pet_surgeries', JSON.stringify(surgeries)); }, [surgeries]);
  useEffect(() => { localStorage.setItem('pet_vet_visits', JSON.stringify(vetVisits)); }, [vetVisits]);
  useEffect(() => { localStorage.setItem('pet_appointments', JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem('pet_emergency_contacts', JSON.stringify(emergencyContacts)); }, [emergencyContacts]);
  useEffect(() => { localStorage.setItem('pet_sitter_instructions', JSON.stringify(sitterInstructions)); }, [sitterInstructions]);
  useEffect(() => { localStorage.setItem('pet_lost_pet_flyers', JSON.stringify(lostPetFlyers)); }, [lostPetFlyers]);
  useEffect(() => { localStorage.setItem('pet_directory', JSON.stringify(directory)); }, [directory]);
  useEffect(() => { localStorage.setItem('pet_journal', JSON.stringify(journal)); }, [journal]);
  useEffect(() => { localStorage.setItem('pet_memories', JSON.stringify(memories)); }, [memories]);
  useEffect(() => { localStorage.setItem('pet_albums', JSON.stringify(albums)); }, [albums]);
  useEffect(() => { localStorage.setItem('pet_travel_checklist', JSON.stringify(travelChecklist)); }, [travelChecklist]);

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
  const toggleTravelItem = (id: string) => {
    setTravelChecklist(prev => prev.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

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
      directory, journal, memories, albums, travelChecklist,
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
      updateTravelChecklist, toggleTravelItem,
      addWeightEntry
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
