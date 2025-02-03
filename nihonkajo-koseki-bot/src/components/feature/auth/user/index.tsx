import React from 'react'
import LoginUser from './LoginUser'
import Image from 'next/image'

export default function LoginComponent() {
  return (
    <div>
      <div className='flex h-screen justify-center place-items-center'>
        {/* sectionLeft */}
        <div className='justify-center items-center hidden lg:flex w-1/3 bg-[url(/backgroudlogin.png)] h-full'>
          <Image
            width={161}
            height={90}
            alt='logo'
            src='/imagefuji.png'
            className=''
            quality={100}
          />
        </div>
        {/* sectionright */}
        <div className='flex justify-center items-center p-[10px] pl-0  h-full w-full lg:w2/3 bg-white'>
          <div className='flex flex-col h-full w-full'>
            <div className='bg-white ml-6 lg:hidden'>
              <Image
                width={151}
                height={65}
                alt='logo'
                src='/imagefuji.png'
                className=''
                quality={100}
              />
            </div>
            <LoginUser />
          </div>

        </div>
      </div>
    </div>
  )
}
