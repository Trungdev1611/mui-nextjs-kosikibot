import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EyeClosed({ className }: any) {
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
      d="M2.062 12.3479C1.97866 12.1234 1.97866 11.8764 2.062 11.6519C2.8737 9.68373 4.25152 8.00091 6.02077 6.81677C7.79003 5.63263 9.87105 5.00049 12 5.00049C14.129 5.00049 16.21 5.63263 17.9792 6.81677C19.7485 8.00091 21.1263 9.68373 21.938 11.6519C22.0213 11.8764 22.0213 12.1234 21.938 12.3479C21.1263 14.316 19.7485 15.9988 17.9792 17.183C16.21 18.3671 14.129 18.9993 12 18.9993C9.87105 18.9993 7.79003 18.3671 6.02077 17.183C4.25152 15.9988 2.8737 14.316 2.062 12.3479Z"
      stroke="#123968"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14.9999C13.6569 14.9999 15 13.6567 15 11.9999C15 10.343 13.6569 8.99987 12 8.99987C10.3431 8.99987 9 10.343 9 11.9999C9 13.6567 10.3431 14.9999 12 14.9999Z"
      stroke="#123968"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
}
