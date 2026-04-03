import React from 'react';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  labels?: { min: string; max: string };
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  onChange,
  labels,
  showValue = true,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        {labels && (
          <span className="text-sm text-[#64748B]">{labels.min}</span>
        )}
        {showValue && (
          <span className="text-lg font-semibold text-[#0A2647]">{value}</span>
        )}
        {labels && (
          <span className="text-sm text-[#64748B]">{labels.max}</span>
        )}
      </div>
      <div className="relative h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#0A2647] to-[#EAB308] rounded-full transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#EAB308] rounded-full shadow-md transition-all duration-200"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    </div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variants = {
    default: 'bg-[#E2E8F0] text-[#1E293B]',
    success: 'bg-[#10B981]/10 text-[#10B981]',
    warning: 'bg-[#EAB308]/10 text-[#EAB308]',
    danger: 'bg-[#EF4444]/10 text-[#EF4444]',
    info: 'bg-[#3B82F6]/10 text-[#3B82F6]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ children, selected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        selected
          ? 'bg-[#0A2647] text-white'
          : 'bg-[#E2E8F0] text-[#64748B] hover:bg-[#E2E8F0]/80 hover:text-[#1E293B]'
      }`}
    >
      {children}
    </button>
  );
};
