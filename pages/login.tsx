import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useState, useEffect, useCallback, useRef } from 'react'
import { FaGithub } from 'react-icons/fa';
import Footer from '@/components/Footer';
// import { Message_data } from "@/hooks/Context";
import NavBar from '../components/NavBar'
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
  const [wrong, setWrong] = useState('')
  const [ischecked, setIsChecked] = useState(false)
  const [variant, setVariant] = useState('login')
  const btnRef = useRef(null);
  const router = useRouter();
  // const { message, setMessage, isBack, setisBack } = useContext(Message_data);
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])
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
    if (!email.match(emailRegex)) {
      clearTimeout(timer)
      setWrong(`Please enter a valid email address.`)
      timer = setTimeout(() => {
        setWrong('')
      }, 2000)
      return
    }
    if (!password.match(formalRegex)) {
      clearTimeout(timer)
      setWrong(`Please enter a valid Password address(a-z 0-9)`)
      timer = setTimeout(() => {
        setWrong('')
      }, 2000)
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

  useEffect(() => {

    if(variant === 'login'){
      setIsChecked(true)
    }else if(variant === 'register'){
      if(!true)
      setIsChecked(false)
    }
 
  })
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full h-full '>
        <h1 className=' text-xl font-extrabold text mt-[50px]'>Simple Login</h1>
        {/* login-form*/}
        <div className='flex backdrop-blur-sm border my-[50px] p-10 rounded-[5px] shadow-md mb-[100px] xs:border-none xs:shadow-none xs:w-full xs:h-full '>
          <div className='flex flex-col w-[300px] top-0 bottom-0 left-0 right-0 m-auto gap-4 '>
            <h1 className='font-bold '> {variant === 'login' ? 'Sign in' : 'Sign up'} </h1>
            <div className="text-red-500 m-auto text-base h-2" >{wrong ? wrong : null}</div>
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
            {variant === 'register' && (
              <>
                <div className='text-zinc-650'>
                  <input type='checkbox' id="agree-privacy" className='inline' onChange={() => setIsChecked(!ischecked)} />
                  <span className='ml-2 text-sm'>I agree to the terms of <Link href='https://www.freeprivacypolicy.com/live/82510e13-8abc-44ce-9d6f-7b717f4fe72e' target='_blank' className='hover:underline'>the Privacy Policy</Link></span>
                </div>
              </>
            )}
            <button
              onClick={variant === 'login' ? auth : register}
              className={`hover:bg-emerald-400
                border rounded border-blue-300 w-[100px] p-2 text-zinc-650 mxs:w-full
                disabled:opacity-40
                disabled:hover:bg-transparent
                `}
              ref={btnRef}
              disabled={!ischecked}
            >
              {variant === 'login' ? 'Login' : 'Submit'}
            </button>
            <div
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className='
                  w-full
                  hover:scale-110
                  flex 
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                  m-auto
                  '> Sign in with Github &nbsp; <FaGithub size={30} /> </div>
            <p className="inline-block text-neutral-650 mx-5 mt-12  text-center text-sm">
              <span> {variant === 'login'
                ? 'No account yet ?'
                : 'Already have account?'}  </span>
              <span
                onClick={toggleVariant}
                className=" text-zinc-900 ml-2 hover:underline cursor-pointer"
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
          <p></p>
        </div>
        <p></p>
      </div>
      <Footer />
    </>
  )
};
export default Login;