import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        rounded-2xl
        bg-[#BF6A43]
        px-6
        py-4
        font-semibold
        text-white
        shadow-md
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:bg-[#A85B38]
        hover:shadow-lg
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;