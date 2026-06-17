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
