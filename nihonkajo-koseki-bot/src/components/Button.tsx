import React from 'react'

interface ButtonProps {
  text: string;
  icon?: React.ReactNode
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?:  'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: any
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  variant = '',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  className,
  type
}) => {
  const variantClass =
    variant === 'primary'
      ? 'bg-azureBlue text-white'
      : variant === 'secondary'
      ? 'bg-brightBlue text-white'
      : 'bg-neutral-200 text-gray-500 text-opacity-55';

  const sizeClass =
      size === 'medium'
      ? 'max-w-[150px] py-[10px] pb-2 text-sm font-bold rounded'
      : 'py-3 text-lg font-semibold rounded-md';

  const baseClass = `flex items-center gap-3 justify-center shadow-md ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${fullWidth ? 'w-full' : ''}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      type={type}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
