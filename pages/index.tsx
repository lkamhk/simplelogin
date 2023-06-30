import { useState, useEffect } from 'react'
import { NextPageContext } from "next"
import { getSession, useSession } from "next-auth/react"
import NavBar from '../components/NavBar'
import Clock from '@/components/Clock'
import { visitLexicalEnvironment } from 'typescript';


export async function getServerSideProps(context: NextPageContext) {
  const csession = await getSession(context);


  if (!csession) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,

      }
    }
  }

  return {
    props: {}
  }
};



export default function Home() {


  const { data: session, status } = useSession();




  return (
    <>
      <NavBar />
      <div className='flex w-full h-full flex-col items-center justify-center '>
        <div className='m-10'><Clock /></div>

        <h5 className='text-zinc-500'>Logged in as: &nbsp;<p className='inline text-zinc-700 font-bold'>{session?.user?.email}</p></h5>


      </div>
    </>
  );
}
