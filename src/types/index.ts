export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
}

export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  gotchaDate?: string;
  currentWeight: number;
  goalWeight?: number;
  weightHistory: WeightEntry[];
  microchipId?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  photoUrl?: string;
}

export interface Attachment {
  id: string;
  label: string;
  url: string;
}

export interface VaccineRecord {
  id: string;
  dogId: string;
  vaccineName: string;
  dateAdministered: string;
  nextDueDate: string;
  notes?: string;
  attachments?: Attachment[];
}

export interface Medication {
  id: string;
  dogId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  dueDate?: string;
  active: boolean;
  notes?: string;
  attachments?: Attachment[];
}

export interface Allergy {
  id: string;
  dogId: string;
  allergen: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  nextReviewDate?: string;
  notes?: string;
  attachments?: Attachment[];
}

export interface Surgery {
  id: string;
  dogId: string;
  procedure: string;
  date: string;
  followUpDate?: string;
  notes?: string;
  attachments?: Attachment[];
}

export interface VetVisit {
  id: string;
  dogId: string;
  date: string;
  reason: string;
  notes: string;
  veterinarian?: string;
  followUpDate?: string;
  attachments?: Attachment[];
}

export type HealthEvent = 
  | ({ type: 'vaccine' } & VaccineRecord)
  | ({ type: 'medication' } & Medication)
  | ({ type: 'surgery' } & Surgery)
  | ({ type: 'vetVisit' } & VetVisit)
  | ({ type: 'allergy' } & Allergy);

export interface RecurrenceRule {
  frequency: 'None' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  interval: number;
  daysOfWeek?: Array<'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'>;
  endsOn?: string;
}

export interface Appointment {
  id: string;
  dogId: string;
  type: 'Vet' | 'Groomer' | 'Trainer' | 'Medication' | 'Vaccination' | 'Birthday' | 'Other';
  title?: string;
  date: string;
  time?: string;
  providerName?: string;
  providerAddress?: string;
  location?: string;
  notes?: string;
  priority?: 'Low' | 'Medium' | 'High';
  completed: boolean;
  recurrence?: RecurrenceRule;
  externalSource?: 'google' | 'apple';
  externalId?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
  priority?: 'Primary' | 'Secondary' | 'Backup';
  order?: number;
}

export interface PetSitterInstructions {
  dogId: string;
  feedingSchedule: string;
  medicationGuide: string;
  behavioralNotes?: string;
  favoriteToys?: string;
  routines?: string;
  emergencyNotes?: string;
  houseRules?: string;
  accessInstructions?: string;
  walkRoutine?: string;
  keyLocations?: string;
}

export interface LostPetFlyer {
  dogId: string;
  lastSeenDate: string;
  lastSeenLocation: string;
  reward?: string;
  contactPhone: string;
  notes?: string;
  photoUrls?: string[];
  qrData?: string;
  socialCaption?: string;
}

// Milestone 4 Types

export interface DirectoryEntry {
  id: string;
  name: string;
  category: 'Vet' | 'Veterinarian' | 'Emergency Vet' | 'Groomer' | 'Trainer' | 'Boarding' | 'Pet Sitter' | 'Walker' | 'Other';
  phone: string;
  email?: string;
  address?: string;
  website?: string;
  directions?: string;
  lastVisit?: string;
  nextAppointment?: string;
  favorite?: boolean;
  documents?: Attachment[];
  linkedSystems?: Array<'Vet Prep' | 'Reminders' | 'Emergency Packet'>;
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
  category: 'Treats' | 'Meals' | 'Special Occasions' | 'Wellness';
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  prepTime?: string;
  kitchenTip?: string;
  nutritionalWarning?: string;
}

export interface DigitalResource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Guides' | 'Printables' | 'Articles' | 'Products';
  tag?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'Cookbooks' | 'Gear' | 'Digital';
}

export type SubscriptionPlan = 'Free' | 'Wellness' | 'Memory' | 'Premium';

export interface VetVisitPrep {
  id: string;
  dogId: string;
  title: string;
  date: string;
  symptoms: string[];
  questions: string[];
  notes?: string;
  includeWeightHistory: boolean;
  includeMedications: boolean;
  includeVaccines: boolean;
  photos?: Attachment[];
  videos?: Attachment[];
  documents?: Attachment[];
  diagnosis?: string;
  recommendations?: string;
  completed?: boolean;
  completedAt?: string;
}
