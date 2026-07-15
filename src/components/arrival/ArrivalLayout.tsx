import React from 'react';

interface ArrivalLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'small' | 'medium' | 'large';
}

const widthClasses = {
  small: 'max-w-md',
  medium: 'max-w-2xl',
  large: 'max-w-5xl',
};

const ArrivalLayout: React.FC<ArrivalLayoutProps> = ({
  children,
  maxWidth = 'medium',
}) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-6 sm:px-6 sm:py-10">
      <div className={`mx-auto flex min-h-[calc(100vh-3rem)] w-full items-center justify-center ${widthClasses[maxWidth]}`}>
        <div className="w-full rounded-[24px] border border-[#E8E1D8] bg-white p-6 shadow-[0_10px_30px_rgba(45,42,39,0.08),0_2px_8px_rgba(45,42,39,0.05)] sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ArrivalLayout;