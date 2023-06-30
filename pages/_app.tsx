import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Raleway, Montserrat, Ubuntu, Orbitron } from 'next/font/google'

const raleway = Raleway({
  variable: "--raleway-font",
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});
const montserrat = Montserrat({
  variable: "--montserrat-font",
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

const ubuntu = Ubuntu({
  variable: "--ubuntu-font",
  weight: ['300', '400', '500', '700'],
  subsets: ['latin']
});

const orbitron = Orbitron({
  variable: "--ubuntu-font",
  weight: [ '400', '500', '700'],
  subsets: ['latin']
});


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (<>
            <style jsx global>{`


        html{
          font-family: ${montserrat.style.fontFamily};
        }
        .ubuntu{
          font-family: ${ubuntu.style.fontFamily};
        }
        .orbitron{
          font-family: ${orbitron.style.fontFamily};
        }
        .montserrat{
          font-family: ${montserrat.style.fontFamily};
          font-Weight: 500;
        }

        .raleway{
          font-family: ${raleway.style.fontFamily};
        }
        
      `}</style >
    <SessionProvider session={session}>

      <Component {...pageProps} />
      

    </SessionProvider>
   
  </>
  );
}
