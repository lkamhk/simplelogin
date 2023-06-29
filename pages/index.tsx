import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPageContext } from "next"
import { getSession, useSession } from "next-auth/react"
import NavBar from '../components/NavBar'
import useCurrentUser from '../hooks/useCurrentUser'
const inter = Inter({ subsets: ['latin'] });


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);


  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,

      }
    }
  }

  return {
    props: { session }
  }
}


export default function Home() {


  const router = useRouter();
  const { data: session } = useSession();
  const [eMail, seteMail] = useState(null);


  useEffect(() => {

    if (session)
      seteMail(session.user.email || null)


  }, [session])


  return (
    // <Context.Provider value={userName}>

    <main
      className={`flex h-[100vh] flex-col items-center justify-content-center ${inter.className}`}
    >
      <NavBar />
      <div className='flex w-[500px] flex-col mt-[100px] border p-[100px] items-center justify-center'>

        <h5>Logged in as: {eMail ? eMail : 'Loading...'}</h5>
        <p>
          { }
        </p>
      </div>

    </main>
    // </Context.Provider>
  )
}
