import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-[#0A2647] text-white hover:bg-[#1E3A5F] active:scale-95',
    secondary: 'bg-[#EAB308] text-[#0A2647] hover:bg-[#D4A006] active:scale-95',
    outline: 'border-2 border-[#0A2647] text-[#0A2647] hover:bg-[#0A2647] hover:text-white',
    ghost: 'text-[#64748B] hover:bg-gray-100 hover:text-[#1E293B]',
    success: 'bg-[#10B981] text-white hover:bg-[#059669] active:scale-95',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
