export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  weight: number;
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
