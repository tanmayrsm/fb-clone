import Image from 'next/image'
import React from 'react'
import {signIn} from 'next-auth/react';

const Login = () => {
  return (
    <div className='flex flex-col items-center mx-auto'>
      <Image src='https://cdn-icons-png.flaticon.com/512/124/124010.png' className='rounded-full' height={240} width={240} alt='fb logo' />
      <a onClick={() => signIn()} className='px-20 py-4 z-10 text-2xl cursor-pointer mt-16 bg-blue-500 rounded-md text-white'>
        Login
      </a>
    </div>
  )
}

export default Login
