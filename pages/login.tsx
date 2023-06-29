import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { FaGithub } from 'react-icons/fa';

// import Context from '@/hooks/Context'
import { Message_data } from "@/hooks/Context";
import NavBar from '../components/NavBar'
import { log } from 'console'
import Input from '@/components/Input';
import axios from 'axios';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}


const Login = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPW] = useState('')
  const [wrong,setWrong] = useState('')
  // const { message, setMessage, isBack, setisBack } = useContext(Message_data);

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])

  const router = useRouter();

  const auth = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }, [email, password, router])

  const register = useCallback(async () => {

    const formalRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    let timer;
    



    if (!email.match(emailRegex) || !password.match(formalRegex)  ) {
   
        clearTimeout(timer)
        setWrong('invalid input')
      
        timer = setTimeout(() =>{
          setWrong('')
        },2000)
        return
      }
    

    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })

      auth()
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, auth])


  return (
    <>
      <div className='container-home h-[100vh]'>
        <div className='flex justify-center items-center w-100 h-[100vh]'>
          <div className='w-[500px] border mt-[20%] p-10 rounded-[5px] shadow-md mb-[100px]'>
              
            <div className='flex flex-col w-[300px] top-0 bottom-0 left-0 right-0 m-auto gap-4'>
            <div className="text-red-500 m-auto" >{wrong?wrong:null}</div>
              {variant === 'register' && (
                <Input
                  label="User name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(ev: any) => setName(ev.target.value)}
                />

              )}

              <Input
                label="Email address"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev: any) => setPW(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />

              <button
                onClick={variant === 'login' ? auth : register}
                className="hover:bg-emerald-400
                border rounded border-blue-300 w-[100px] p-2 text-zinc-600"
              >
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
   
              <div 
                    onClick={()=> signIn('github',{callbackUrl: '/'})}
                    className='
                  w-10 
                  h-10
                
                  rounded-full
                  flex 
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                  m-auto
                  '>  <FaGithub size={30}/> </div>
                  


              <p className="text-neutral-500 mx-5 mt-12  text-center">
                {variant === 'login'
                  ? 'No account yet ?'
                  : 'Already have account?'}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-2 hover:underline cursor-pointer"
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>



    </>
  )
};

export default Login;