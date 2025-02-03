'use client'

import { useState } from 'react';
import { EyeClosed, EyeOpen } from './icons';
import React from 'react'
export default function InputField({
  type,
  placeholder,
  LeftIcon,
  RightIcon,
  register,
  label,
  className,
  ...props
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className='flex items-center'>
      {label && <div className='text-[#4D4D4D] min-w-[100px] text-sm font-bold'>{label}</div>}
      <div
        className={`flex w-full min-h-[45px] items-center px-4 py-[10px] justify-between border rounded-sm gap-4 border-mediumGray ${className ? className : ""}`}
      >
        {LeftIcon && (
          <span className="inset-y-0 left-4 flex items-center text-gray-400">
            <LeftIcon className="w-5 h-5" />
          </span>
        )}

        <input
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          placeholder={placeholder}
          className={`flex-1 text-sm font-light bg-transparent`}
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
    </div>

  );
}
