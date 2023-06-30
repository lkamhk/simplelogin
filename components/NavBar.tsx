import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
const NavBar = () => {

  const router = useRouter()


  return (
    <>
 
        <div className='flex bg-zinc-700 text-white items-center justify-between p-5'>

            <div className='ml-[10px] '> <h1 className='font-bold text-xl raleway'>Simple Login</h1></div>
            

              <button onClick={() => { signOut() }} className="inline-block mx-2 borde rounded-[15px] bg-zinc-300  shadow-sm p-[10px] text-zinc-500 text-sm font-semibold cursor-pointer ">
                Logout
              </button>
    
        </div>
    </>
  )
}

export default NavBar
