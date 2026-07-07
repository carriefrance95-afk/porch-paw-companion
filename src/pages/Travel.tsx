import React from 'react';
import ComingSoon from '../components/ComingSoon';

const Travel: React.FC = () => {
  return (
    <ComingSoon
      title="Travel & Adventure"
      description="Your companion's packing assistant and travel log for handling trips, hotel stays, pet-friendly locations, and outdoor excursions cleanly."
      features={[
        "Interactive pet packing lists tailored to your trip duration and destination weather",
        "Pet-friendly location directory and emergency planning maps while away from home",
        "Adventure logs to track your favorite trails, compliance rules, and park memories"
      ]}
    />
  );
};

export default Travel;
