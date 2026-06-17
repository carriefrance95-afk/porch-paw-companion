export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
}

export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  gotchaDate?: string;
  currentWeight: number;
  weightHistory: WeightEntry[];
  microchipId?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  photoUrl?: string;
}

export interface VaccineRecord {
  id: string;
  dogId: string;
  vaccineName: string;
  dateAdministered: string;
  nextDueDate: string;
  notes?: string;
}

export interface Medication {
  id: string;
  dogId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  active: boolean;
  notes?: string;
}

export interface Allergy {
  id: string;
  dogId: string;
  allergen: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  notes?: string;
}

export interface Surgery {
  id: string;
  dogId: string;
  procedure: string;
  date: string;
  notes?: string;
}

export interface VetVisit {
  id: string;
  dogId: string;
  date: string;
  reason: string;
  notes: string;
  veterinarian?: string;
}

export type HealthEvent = 
  | ({ type: 'vaccine' } & VaccineRecord)
  | ({ type: 'medication' } & Medication)
  | ({ type: 'surgery' } & Surgery)
  | ({ type: 'vetVisit' } & VetVisit)
  | ({ type: 'allergy' } & Allergy);

export interface Appointment {
  id: string;
  dogId: string;
  type: 'Vet' | 'Groomer' | 'Trainer' | 'Other';
  date: string;
  time: string;
  providerName: string;
  providerAddress?: string;
  notes?: string;
  completed: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface PetSitterInstructions {
  dogId: string;
  feedingSchedule: string;
  medicationGuide: string;
  behavioralNotes?: string;
  favoriteToys?: string;
  routines?: string;
  emergencyNotes?: string;
}

export interface LostPetFlyer {
  dogId: string;
  lastSeenDate: string;
  lastSeenLocation: string;
  reward?: string;
  contactPhone: string;
  notes?: string;
}

// Milestone 4 Types

export interface DirectoryEntry {
  id: string;
  name: string;
  category: 'Vet' | 'Groomer' | 'Trainer' | 'Walker' | 'Other';
  phone: string;
  email?: string;
  address?: string;
  website?: string;
  rating?: number;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  dogId: string;
  date: string;
  mood: 'Happy' | 'Calm' | 'Energetic' | 'Anxious' | 'Sleepy';
  behaviorNotes: string;
  dietNotes?: string;
  exerciseNotes?: string;
  tags: string[];
}

export interface MemoryItem {
  id: string;
  dogId: string;
  date: string;
  title: string;
  description?: string;
  imageUrl: string;
  type: 'Photo' | 'Video';
  albumId?: string;
}

export interface Album {
  id: string;
  dogId: string;
  name: string;
  description?: string;
}

export interface TravelChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  category: 'Essentials' | 'Health' | 'Comfort' | 'Activity';
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Treats' | 'Meals' | 'Special Occasions';
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'Cookbooks' | 'Gear' | 'Digital';
}
