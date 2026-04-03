import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} rounded-lg border border-[#E2E8F0]
            text-[#1E293B] placeholder-[#64748B] transition-all duration-200
            focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20
            hover:border-[#64748B] ${error ? 'border-[#EF4444]' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#EF4444]">{error}</p>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 rounded-lg border border-[#E2E8F0]
          text-[#1E293B] placeholder-[#64748B] transition-all duration-200 resize-none
          focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20
          hover:border-[#64748B] ${className}`}
        {...props}
      />
    </div>
  );
};
