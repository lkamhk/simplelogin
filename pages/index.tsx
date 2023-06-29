import Image from 'next/image'
import { Inter } from 'next/font/google'
import { createContext, useContext, useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import Context from '@/hooks/Context'
import { Message_data } from "@/hooks/Context";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import NavBar from '../components/NavBar'
import useCurrentUser from '@/hooks/useCurrentUser'
const inter = Inter({ subsets: ['latin'] });


export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);
console.log(session)

  if(!session){
    return {
      redirect:{
        destination: '/login',
        permanent: false,
      
      }
    }
  }

  return {
    props:{}
  }
}


export default function Home() {
const data = useCurrentUser();
   const router = useRouter()
const [email,setEmail] = useState(null)
   
  // if (typeof window !== 'undefined') {
  //   // Perform localStorage action
  //   const item = localStorage.getItem('state')
  //   const sitem = sessionStorage.getItem('state')
  //   if(item === 'logout' || !item){
  //     router.push('login');
  //   }
    
  // }
 useEffect(() => {
  console.log('use: '+ email)
  
  setEmail(data?.data?.name)
 },[data])


  return (
  // <Context.Provider value={userName}>
  
    <main
      className={`flex h-[100vh] flex-col items-center justify-content-center ${inter.className}`}
    >
  <NavBar/>
    <h1>You are Logined</h1>
    <h5>Logged in as: {data?.data?.email}</h5>
    </main>
  // </Context.Provider>
  )
}
