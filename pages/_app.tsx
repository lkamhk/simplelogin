import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Context from '@/hooks/Context';
import NavBar from '../components/NavBar'
export default function App({ Component, pageProps }: AppProps) {

  return (<>
    <Context>

 
      <Component {...pageProps} />

    </Context>
      {/* <NavBar />
      <Component {...pageProps} /> */}
  </>
  );
}
