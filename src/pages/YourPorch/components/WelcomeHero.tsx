import React from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * WelcomeHero Component
 * The primary greeting card for the Your Porch page.
 * Displays a warm welcome, dynamic greeting, and primary navigation actions.
 */

export const WelcomeHero: React.FC = () => {
  const navigate = useNavigate();
  const pets: any[] = [];
  
  // Logic for dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Determine display name for hero text
  const primaryPetName = pets && pets.length > 0 ? pets[0].name : null;
  const greeting = getGreeting();

  return (
    <div className="bg-white rounded-[32px] p-12 shadow-sm flex items-center justify-between w-full relative overflow-hidden">
      {/* Left side: Text and Actions */}
      <div className="z-10 max-w-xl">
        <h1 className="text-5xl font-serif text-[#4A4238] mb-4">
          {greeting}, User
        </h1>
        <p className="text-xl text-[#8C847A] mb-8 font-light">
          {primaryPetName 
            ? `Everything for you and ${primaryPetName} is waiting inside.` 
            : "Everything for you and your dogs is waiting inside."}
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/my-dogs')}
            className="bg-[#C17C6B] text-white px-8 py-3 rounded-full font-medium hover:bg-[#A86B5C] transition-colors"
          >
            View My Dogs
          </button>
          <button 
            onClick={() => navigate('/calendar')}
            className="border-2 border-[#C17C6B] text-[#C17C6B] px-8 py-3 rounded-full font-medium hover:bg-[#FAF7F2] transition-colors"
          >
            Today's Schedule
          </button>
        </div>
      </div>

      {/* Right side: Stitch Illustration Container */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Subtle decorative background elements */}
        <div className="absolute inset-0 bg-[#FAF7F2] rounded-full opacity-50 border border-[#C17C6B]/20" />
        
        {/* 
           Stitch Illustration
           Note: Assets belong in src/assets/stitch/
           Replacing placeholder with standard pathing 
        */}
        <img 
          src="/assets/stitch/stitch-porch-home.png" 
          alt="Stitch" 
          className="relative z-10 w-48 h-auto object-contain"
        />
        
        {/* Decorative foliage placeholders */}
        <div className="absolute -bottom-2 -right-2 text-[#A4B494] opacity-40">
          {/* Sage leaves icon/svg would be placed here */}
        </div>
      </div>
    </div>
  );
};