import React from 'react';

interface TextareaFieldProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  register: any;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  register,
  ...rest
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full flex-auto p-4 border rounded-[2px] text-sm font-light border-[#6F6F6F]"
      {...register}
      {...rest}
    />
  );
};

export default TextareaField;
