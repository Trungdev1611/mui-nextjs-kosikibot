import React from 'react';

export default function FormField({
  label,
  children,
  required,
  className = '',
  labelClassName = '',
  ...props
}: any) {
  return (
    <div className={`flex items-center gap-5 ${className}`} {...props}>
      <label
        className={`flex items-center justify-between text-[#4D4D4D] text-sm font-bold flex-3 min-w-[200px] ${labelClassName}`}
      >
        {label}
        {required && (
          <span className="w-[50px] py-[6px] rounded-[5px] text-white bg-[#F94C4A] font-bold text-xs text-center">
            必須
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
