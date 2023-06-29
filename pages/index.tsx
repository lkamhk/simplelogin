import { useState, useEffect } from 'react'
import { NextPageContext } from "next"
import { getSession, useSession } from "next-auth/react"
import NavBar from '../components/NavBar'


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
}


export default function Home() {


  const { data: session } = useSession();
  const [eMail, seteMail] = useState(null);

 function getUser() {
    seteMail(session.user.email)
  }


useEffect(()=>{
  getUser()
},[])

  return (
      <>

    <main className='flex h-[100vh] flex-col items-center justify-content-center'>
      <NavBar />
      <div className='flex w-[500px] flex-col mt-[100px] border p-[100px] items-center justify-center'>

        <h5>Logged in as: {eMail ? eMail : 'Loading...'}</h5>

      </div>

    </main>
    </>
  );
}
