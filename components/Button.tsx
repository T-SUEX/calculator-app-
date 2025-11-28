import React from 'react';
import { ButtonVariant } from '../types';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant: ButtonVariant;
  doubleWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant, doubleWidth }) => {
  const baseStyles = "h-16 sm:h-20 text-2xl font-medium rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center select-none";
  
  const variantStyles = {
    [ButtonVariant.PRIMARY]: "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600",
    [ButtonVariant.SECONDARY]: "bg-gray-300 text-gray-900 hover:bg-gray-200 active:bg-white",
    [ButtonVariant.ACCENT]: "bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-300 shadow-lg shadow-orange-500/20",
  };

  const widthStyle = doubleWidth ? "col-span-2 aspect-[2/1]" : "col-span-1 aspect-square";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;