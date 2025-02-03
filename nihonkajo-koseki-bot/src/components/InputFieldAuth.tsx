'use client'

import { useState } from 'react';
import { EyeClosed, EyeOpen } from './icons';
import React from 'react'
export default function InputFieldAuth({
  label,
  type,
  placeholder,
  LeftIcon,
  RightIcon,
  register,
  error,
  ...props
}: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label className="block text-txt-secondary text-lg font-semibold mb-2">
        {label}
      </label>
      <div
        className={`flex w-full items-center p-4 justify-between border rounded-lg gap-4 border-gray-pastel`}
      >
        {LeftIcon && (
          <span className="inset-y-0 left-4 flex items-center text-gray-400">
            <LeftIcon className="w-5 h-5" />
          </span>
        )}

        <input
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          placeholder={placeholder}
          className={`flex-1 text-sm text-txt-secondary font-normal bg-transparent`}
          {...register}
          {...props}
        />

        {type === 'password' ? (
          <span
            onClick={handlePasswordToggle}
            className=" inset-y-0 right-4 flex items-center cursor-pointer"
          >
            {isPasswordVisible ? <EyeOpen /> : <EyeClosed />}
          </span>
        ) : (
          RightIcon && (
            <span className=" inset-y-0 right-4 flex items-center text-gray-400">
              <RightIcon className="w-5 h-5" />
            </span>
          )
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
