import React, { useEffect, useMemo, useState } from "react";
import {
  BookHeart, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3,
  CookingPot, Dog, HeartPulse, Home, Minus, PawPrint, Plus, ShieldCheck,
  Sprout, UserRound,
} from "lucide-react";
import { supabase } from "../utils/supabaseClient";

type DogProfile = {
  name: string; breed: string; sex: string; lifeStage: string; birthday: string; weight: string;
};

const UNITED_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"];
const CANADIAN_PROVINCES = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"];

const createEmptyDogProfile = (): DogProfile => ({ name: "", breed: "", sex: "", lifeStage: "", birthday: "", weight: "" });

const getDetectedTimeZone = () => {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York"; }
  catch { return "America/New_York"; }
};

const getFriendlyTimeZoneName = (timeZone: string) => {
  const knownTimeZones: Record<string, string> = { "America/New_York": "Eastern Time", "America/Chicago": "Central Time", "America/Denver": "Mountain Time", "America/Los_Angeles": "Pacific Time" };
  return knownTimeZones[timeZone] || timeZone.replaceAll("_", " ").replaceAll("/", " · ");
};

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [dogCount, setDogCount] = useState(1);
  const [porchLoaded, setPorchLoaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [timeZone] = useState(getDetectedTimeZone);
  const [country, setCountry] = useState("United States");
  const [stateProvince, setStateProvince] = useState("");
  const [dogProfiles, setDogProfiles] = useState<DogProfile[]>([createEmptyDogProfile()]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);

  const totalSteps = 5;
  const friendlyTimeZone = useMemo(() => getFriendlyTimeZoneName(timeZone), [timeZone]);
  const locationSuggestions = useMemo(() => (country === "United States" ? UNITED_STATES : country === "Canada" ? CANADIAN_PROVINCES : []), [country]);
  const currentDog = dogProfiles[currentDogIndex] || createEmptyDogProfile();
  const displayName = preferredName.trim() || firstName.trim() || "friend";
  const dogNames = dogProfiles.map((d) => d.name.trim()).filter(Boolean);
  const porchOwnerText = dogNames.length === 1 ? `${dogNames[0]}'s new porch` : "your family's porch";

  useEffect(() => {
    const timer = window.setTimeout(() => setPorchLoaded(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setDogProfiles((prev: DogProfile[]) => {
      if (prev.length < dogCount) return [...prev, ...Array.from({ length: dogCount - prev.length }, createEmptyDogProfile)];
      return prev.slice(0, dogCount);
    });
    setCurrentDogIndex((prev) => Math.min(prev, dogCount - 1));
  }, [dogCount]);

  const completeOnboarding = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) return;

    try {
      await supabase.from('profiles').upsert({ id: userId, name: `${firstName} ${lastName}`.trim(), first_name: firstName, last_name: lastName, time_zone: timeZone, country, state_province: stateProvince });
      const petsToInsert = dogProfiles.map(dog => ({ owner_id: userId, name: dog.name, breed: dog.breed, sex: dog.sex, life_stage: dog.lifeStage, birthday: dog.birthday || null, weight: dog.weight ? parseFloat(dog.weight) : null }));
      await supabase.from('pets').insert(petsToInsert);
      localStorage.setItem(`onboarding_complete_${userId}`, "true");
      window.dispatchEvent(new Event("porchside:onboarding-complete"));
      window.location.href = '/';
    } catch (err) { console.error("Onboarding Error:", err); }
  };

  const nextStep = () => { step === 4 && currentDogIndex < dogCount - 1 ? setCurrentDogIndex(p => p + 1) : setStep(p => Math.min(p + 1, totalSteps)); };
  const prevStep = () => { step === 4 && currentDogIndex > 0 ? setCurrentDogIndex(p => p - 1) : setStep(p => Math.max(p - 1, 1)); };
  const updateCurrentDog = (field: keyof DogProfile, value: string) => setDogProfiles(prev => prev.map((d, i) => i === currentDogIndex ? { ...d, [field]: value } : d));
  const isCurrentStepValid = () => step === 3 ? firstName.trim().length > 0 : step === 4 ? currentDog.name.trim().length > 0 : true;

  // ... [PASTE YOUR EXISTING <style>...</style> BLOCK HERE]
  // ... [PASTE YOUR EXISTING return ( ... ) JSX BLOCK HERE]
};

export default OnboardingWizard;