import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AlertIcon({ className }: any) {
  return (
    <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 ${className}`}
  >
    <path
      d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="#F00000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
}
