import React, { createContext, useContext, useState, useEffect } from 'react';
import { DogProfile, VaccineRecord, Medication, Allergy, Surgery } from '../types';

interface PetContextType {
  profiles: DogProfile[];
  vaccines: VaccineRecord[];
  medications: Medication[];
  allergies: Allergy[];
  surgeries: Surgery[];
  addProfile: (profile: DogProfile) => void;
  updateProfile: (profile: DogProfile) => void;
  deleteProfile: (id: string) => void;
  addVaccine: (vaccine: VaccineRecord) => void;
  addMedication: (medication: Medication) => void;
  addAllergy: (allergy: Allergy) => void;
  addSurgery: (surgery: Surgery) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<DogProfile[]>([]);
  const [vaccines, setVaccines] = useState<VaccineRecord[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);

  useEffect(() => {
    const storedProfiles = localStorage.getItem('pet_profiles');
    const storedVaccines = localStorage.getItem('pet_vaccines');
    const storedMedications = localStorage.getItem('pet_medications');
    const storedAllergies = localStorage.getItem('pet_allergies');
    const storedSurgeries = localStorage.getItem('pet_surgeries');

    if (storedProfiles) setProfiles(JSON.parse(storedProfiles));
    if (storedVaccines) setVaccines(JSON.parse(storedVaccines));
    if (storedMedications) setMedications(JSON.parse(storedMedications));
    if (storedAllergies) setAllergies(JSON.parse(storedAllergies));
    if (storedSurgeries) setSurgeries(JSON.parse(storedSurgeries));
  }, []);

  useEffect(() => {
    localStorage.setItem('pet_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('pet_vaccines', JSON.stringify(vaccines));
  }, [vaccines]);

  useEffect(() => {
    localStorage.setItem('pet_medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('pet_allergies', JSON.stringify(allergies));
  }, [allergies]);

  useEffect(() => {
    localStorage.setItem('pet_surgeries', JSON.stringify(surgeries));
  }, [surgeries]);

  const addProfile = (profile: DogProfile) => setProfiles([...profiles, profile]);
  const updateProfile = (profile: DogProfile) => setProfiles(profiles.map(p => p.id === profile.id ? profile : p));
  const deleteProfile = (id: string) => setProfiles(profiles.filter(p => p.id !== id));
  
  const addVaccine = (vaccine: VaccineRecord) => setVaccines([...vaccines, vaccine]);
  const addMedication = (medication: Medication) => setMedications([...medications, medication]);
  const addAllergy = (allergy: Allergy) => setAllergies([...allergies, allergy]);
  const addSurgery = (surgery: Surgery) => setSurgeries([...surgeries, surgery]);

  return (
    <PetContext.Provider value={{
      profiles, vaccines, medications, allergies, surgeries,
      addProfile, updateProfile, deleteProfile,
      addVaccine, addMedication, addAllergy, addSurgery
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
