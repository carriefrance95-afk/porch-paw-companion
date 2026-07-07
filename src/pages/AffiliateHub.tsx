import React from 'react';
import ComingSoon from '../components/ComingSoon';

const AffiliateHub: React.FC = () => {
  return (
    <ComingSoon
      title="Partner Perks & Rewards"
      description="We are partnering with trusted pet nutrition, gear, and healthcare brands to pass exclusive discounts and early-access offers straight to our community."
      features={[
        "Curated discounts on high-quality pet food, safety gear, and daily essentials",
        "Exclusive subscriber-only promotions and seasonal gift crates",
        "Direct point tracking and rewards integrations for premium tier accounts"
      ]}
    />
  );
};

export default AffiliateHub;
