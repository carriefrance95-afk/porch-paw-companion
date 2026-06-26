import React from 'react';
import type { DogProfile, VaccineRecord, Medication, Allergy, EmergencyContact, PetSitterInstructions } from '../types';
import { ShieldAlert, Phone, Heart, ClipboardList, Info } from 'lucide-react';

interface EmergencyPacketProps {
  dog: DogProfile;
  vaccines: VaccineRecord[];
  medications: Medication[];
  allergies: Allergy[];
  contacts: EmergencyContact[];
  instructions?: PetSitterInstructions;
}

const EmergencyPacket: React.FC<EmergencyPacketProps> = ({ 
  dog, vaccines, medications, allergies, contacts, instructions 
}) => {
  const activeMeds = medications.filter(m => m.active);

  return (
    <div className="bg-white text-black p-10 max-w-4xl mx-auto border-2 border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-black pb-6 mb-8 gap-6">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Porchside Pet Life Logo" className="w-20 h-20 rounded-full object-contain" />
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-1">Emergency Care Packet</h1>
            <p className="text-xl font-bold text-gray-600 tracking-wide">Essential info for {dog.name}</p>
          </div>
        </div>
        <div className="bg-[#D47B4C] text-white rounded-3xl px-6 py-4 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] opacity-90">Porchside Pet Life by Porch & Paw</p>
          <p className="text-2xl font-black">Ready for action</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8">
        {/* Left Column - Photo & Basic Info */}
        <div className="space-y-6">
          <div className="aspect-square bg-[#F6EFE5] border-4 border-[#5C4934] rounded-3xl overflow-hidden">
            {dog.photoUrl ? (
              <img src={dog.photoUrl} alt={dog.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#8C7B6A] font-bold uppercase italic">No Photo</div>
            )}
          </div>

          <div className="space-y-4 bg-[#F7EFE6] p-6 rounded-3xl border border-[#D9B08C] shadow-sm">
            <div>
              <p className="text-xs font-black uppercase text-[#5C4934]">Name</p>
              <p className="text-2xl font-black">{dog.name}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-[#5C4934]">Breed</p>
              <p className="text-sm font-bold">{dog.breed}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-[#5C4934]">Birthday</p>
              <p className="text-sm font-bold">{dog.birthDate}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-[#5C4934]">Microchip ID</p>
              <p className="text-sm font-bold">{dog.microchipId || 'None listed'}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-[#5C4934]">Insurance</p>
              <p className="text-sm font-bold">{dog.insuranceProvider || 'None listed'}</p>
              {dog.insurancePolicyNumber && <p className="text-xs font-bold">{dog.insurancePolicyNumber}</p>}
            </div>
          </div>
        </div>

        {/* Right Column - Medical, Contacts & Instructions */}
        <div className="space-y-8">
          {(allergies.length > 0 || activeMeds.length > 0) && (
            <div className="bg-[#F4F1E8] p-6 rounded-3xl border border-[#D9B08C] shadow-sm">
              <h2 className="text-lg font-black uppercase mb-4 flex items-center gap-2 text-[#5C4934]">
                <ShieldAlert size={20} /> Medical Alerts
              </h2>
              {allergies.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-black uppercase text-[#5C4934] mb-1">Allergies</p>
                  <p className="text-sm font-bold text-[#B0351A]">{allergies.map(a => a.allergen).join(', ')}</p>
                </div>
              )}
              {activeMeds.length > 0 && (
                <div>
                  <p className="text-xs font-black uppercase text-[#5C4934] mb-1">Active Medications</p>
                  <ul className="text-sm font-bold list-disc list-inside">
                    {activeMeds.map(m => (
                      <li key={m.id}>{m.name} - {m.dosage} ({m.frequency})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="bg-[#F6EFE5] p-6 rounded-3xl border border-[#D47B4C] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black uppercase text-[#5C4934] flex items-center gap-2">
                <Phone size={20} /> Emergency Contacts
              </h2>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C7B6A]">Keep close</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {contacts.map(c => (
                <div key={c.id} className="bg-white p-4 rounded-3xl border border-[#D9B08C]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-[#5C4934]">{c.name}</p>
                      <p className="text-xs text-[#8C7B6A]">{c.relationship}</p>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D47B4C]">{c.priority || 'Secondary'}</span>
                  </div>
                  <p className="mt-3 text-sm font-bold">{c.phone}</p>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-sm italic text-[#8C7B6A]">No contacts listed.</p>}
            </div>
          </div>

          {instructions && (
            <div className="bg-[#F5F2EC] p-6 rounded-3xl border border-[#D9B08C] shadow-sm">
              <h2 className="text-lg font-black uppercase mb-4 text-[#5C4934] flex items-center gap-2">
                <ClipboardList size={20} /> Care Instructions
              </h2>
              <div className="grid gap-4">
                {instructions.feedingSchedule && (
                  <div>
                    <p className="text-xs font-black uppercase text-[#5C4934]">Feeding Schedule</p>
                    <p className="text-sm font-medium">{instructions.feedingSchedule}</p>
                  </div>
                )}
                {instructions.medicationGuide && (
                  <div>
                    <p className="text-xs font-black uppercase text-[#5C4934]">Medication Guide</p>
                    <p className="text-sm font-medium">{instructions.medicationGuide}</p>
                  </div>
                )}
                {instructions.walkRoutine && (
                  <div>
                    <p className="text-xs font-black uppercase text-[#5C4934]">Walk Routine</p>
                    <p className="text-sm font-medium">{instructions.walkRoutine}</p>
                  </div>
                )}
                {instructions.accessInstructions && (
                  <div>
                    <p className="text-xs font-black uppercase text-[#5C4934]">Access Instructions</p>
                    <p className="text-sm font-medium">{instructions.accessInstructions}</p>
                  </div>
                )}
                {instructions.keyLocations && (
                  <div>
                    <p className="text-xs font-black uppercase text-[#5C4934]">Key Locations</p>
                    <p className="text-sm font-medium">{instructions.keyLocations}</p>
                  </div>
                )}
                {instructions.houseRules && (
                  <div className="bg-[#FFFFFF] p-4 rounded-3xl border border-[#D9B08C]">
                    <p className="text-xs font-black uppercase text-[#5C4934] mb-2">House Rules</p>
                    <p className="text-sm font-medium">{instructions.houseRules}</p>
                  </div>
                )}
                {instructions.emergencyNotes && (
                  <div className="bg-[#FFF4E6] p-4 rounded-3xl border border-[#D47B4C]">
                    <p className="text-xs font-black uppercase text-[#B24F2B] mb-2">Emergency Notes</p>
                    <p className="text-sm font-bold text-[#8C4B2D]">{instructions.emergencyNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-[#F7EFE6] p-6 rounded-3xl border border-[#D9B08C] shadow-sm">
            <h2 className="text-lg font-black uppercase border-b border-[#D47B4C] mb-4 text-[#5C4934] flex items-center gap-2">
              <Heart size={20} /> Recent Vaccinations
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {vaccines.slice(0, 4).map(v => (
                <div key={v.id} className="flex justify-between text-sm border-b border-gray-200 py-1">
                  <span className="font-bold">{v.vaccineName}</span>
                  <span className="text-gray-600">{v.dateAdministered}</span>
                </div>
              ))}
              {vaccines.length === 0 && <p className="text-sm italic text-[#8C7B6A]">No vaccine records available.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <ShieldAlert size={20} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Porchside Pet Life • Emergency Data</span>
        </div>
        <p className="text-[10px] text-gray-400 italic">Printed on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default EmergencyPacket;
