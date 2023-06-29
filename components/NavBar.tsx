import React, { useEffect, useState } from 'react'
import { Message_data } from '@/hooks/Context'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
const NavBar = () => {

  const router = useRouter()


  return (
    <>
      <div className='absolute bg-black w-full h-[50px] opacity-20'></div>
        <div className="flex w-full h-[50px] items-center justify-between">
          <div>1</div>
          <div className="fixed  right-5 z-10">

            <button onClick={() => {signOut()}} className="inline-block mx-2 border border-black rounded-[5px] bg-white  shadow-sm p-[10px] text-zinc-900 text-sm cursor-pointer ">
              Logout
            </button>
          </div>
        </div>
      
    </>
  )
}

export default NavBar
