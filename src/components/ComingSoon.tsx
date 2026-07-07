import React from 'react';

interface ComingSoonProps {
  title: string;
  description: string;
  features?: string[];
  externalLink?: {
    label: string;
    url: string;
  };
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description, features, externalLink }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="max-w-2xl bg-[#F4F0EA] border border-[#B6A799]/30 rounded-2xl p-8 md:p-12 shadow-sm">
        {/* Animated Construction/Roadmap Icon */}
        <div className="w-20 h-20 bg-[#B55D3B]/10 text-[#B55D3B] rounded-full flex items-center justify-center text-4xl mb-6 mx-auto animate-pulse">
          🛠️
        </div>

        {/* Section Title */}
        <h2 className="text-3xl font-serif font-bold text-[#2D2A27] mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[#2D2A27]/80 text-base mb-8 max-w-md mx-auto leading-relaxed">
          {description}
        </p>

        {/* Optional Roadmap Feature Sneak Peek */}
        {features && features.length > 0 && (
          <div className="bg-[#FDFBF7] border border-[#B6A799]/20 rounded-xl p-6 text-left mb-8">
            <h3 className="text-xs uppercase tracking-wider text-[#7A7A59] font-bold mb-3">
              What We're Building For Phase 2:
            </h3>
            <ul className="space-y-2 m-0 p-0 list-none">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2D2A27] font-medium">
                  <span className="text-[#B55D3B] mt-0.5">🐾</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Optional External Link Button (For the Shopify Store) */}
        {externalLink && (
          <a
            href={externalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#B55D3B] hover:bg-[#A04F31] text-white font-bold text-sm px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg no-underline"
          >
            {externalLink.label}
            <span className="ml-2">→</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
