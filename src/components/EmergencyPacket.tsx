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
      <div className="flex justify-between items-center border-b-4 border-black pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-1">Emergency Care Packet</h1>
          <p className="text-xl font-bold text-gray-600 tracking-wide">Essential info for {dog.name}</p>
        </div>
        <ShieldAlert size={64} className="text-black" />
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Photo & Basic Info */}
        <div className="col-span-1 space-y-6">
          <div className="aspect-square bg-gray-100 border-2 border-black rounded-lg overflow-hidden">
            {dog.photoUrl ? (
              <img src={dog.photoUrl} alt={dog.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase italic">No Photo</div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-black uppercase text-gray-500">Name</p>
              <p className="text-xl font-bold">{dog.name}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-gray-500">Breed</p>
              <p className="text-sm font-bold">{dog.breed}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-gray-500">Birthday</p>
              <p className="text-sm font-bold">{dog.birthDate}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-gray-500">Microchip ID</p>
              <p className="text-sm font-bold">{dog.microchipId || 'None listed'}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-gray-500">Insurance</p>
              <p className="text-sm font-bold">{dog.insuranceProvider || 'None listed'}</p>
              {dog.insurancePolicyNumber && <p className="text-xs font-bold">{dog.insurancePolicyNumber}</p>}
            </div>
          </div>
        </div>

        {/* Right Columns - Medical & Contacts */}
        <div className="col-span-2 space-y-8">
          {/* Medical Alerts */}
          {(allergies.length > 0 || activeMeds.length > 0) && (
            <div className="bg-gray-100 p-6 border-l-8 border-black">
              <h2 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                <ShieldAlert size={20} /> Medical Alerts
              </h2>
              {allergies.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-black uppercase text-gray-500 mb-1">Allergies</p>
                  <p className="text-sm font-bold text-red-600">{allergies.map(a => a.allergen).join(', ')}</p>
                </div>
              )}
              {activeMeds.length > 0 && (
                <div>
                  <p className="text-xs font-black uppercase text-gray-500 mb-1">Active Medications</p>
                  <ul className="text-sm font-bold list-disc list-inside">
                    {activeMeds.map(m => (
                      <li key={m.id}>{m.name} - {m.dosage} ({m.frequency})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Emergency Contacts */}
          <div>
            <h2 className="text-lg font-black uppercase border-b-2 border-black mb-4 flex items-center gap-2">
              <Phone size={20} /> Emergency Contacts
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {contacts.map(c => (
                <div key={c.id} className="border border-gray-200 p-3 rounded">
                  <p className="text-sm font-black">{c.name}</p>
                  <p className="text-xs text-gray-600">{c.relationship}</p>
                  <p className="text-sm font-bold mt-1">{c.phone}</p>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-sm italic col-span-2">No contacts listed.</p>}
            </div>
          </div>

          {/* Sitter Instructions */}
          {instructions && (
            <div>
              <h2 className="text-lg font-black uppercase border-b-2 border-black mb-4 flex items-center gap-2">
                <ClipboardList size={20} /> Care Instructions
              </h2>
              <div className="space-y-4">
                {instructions.feedingSchedule && (
                  <div>
                    <p className="text-xs font-black uppercase text-gray-500">Feeding Schedule</p>
                    <p className="text-sm font-medium">{instructions.feedingSchedule}</p>
                  </div>
                )}
                {instructions.behavioralNotes && (
                  <div>
                    <p className="text-xs font-black uppercase text-gray-500">Behavioral Notes</p>
                    <p className="text-sm font-medium">{instructions.behavioralNotes}</p>
                  </div>
                )}
                {instructions.emergencyNotes && (
                  <div className="bg-yellow-50 p-3 border border-yellow-200">
                    <p className="text-xs font-black uppercase text-yellow-800">Emergency Notes</p>
                    <p className="text-sm font-bold text-yellow-900">{instructions.emergencyNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Vaccine Summary */}
          <div>
            <h2 className="text-lg font-black uppercase border-b-2 border-black mb-4 flex items-center gap-2">
              <Heart size={20} /> Recent Vaccinations
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {vaccines.slice(0, 4).map(v => (
                <div key={v.id} className="flex justify-between text-sm border-b border-gray-100 py-1">
                  <span className="font-bold">{v.vaccineName}</span>
                  <span className="text-gray-600">{v.dateAdministered}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldAlert size={20} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Porch & Paw Companion • Emergency Data</span>
        </div>
        <p className="text-[10px] text-gray-400 italic">Printed on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default EmergencyPacket;
