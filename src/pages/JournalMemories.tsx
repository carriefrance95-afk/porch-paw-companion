import React from 'react';
import ComingSoon from '../components/ComingSoon';

const JournalMemories: React.FC = () => {
  return (
    <ComingSoon
      title="Journal & Memories"
      description="A beautiful, dedicated digital memory vault designed specifically to preserve your dog's life story, milestones, and daily captured moments."
      features={[
        "Media preservation vault for photos, videos, and daily logs",
        "Milestone tracking for growth, birthdays, and achievements",
        "Family data sharing so the whole household can contribute to the memory timeline"
      ]}
    />
  );
};

export default JournalMemories;
