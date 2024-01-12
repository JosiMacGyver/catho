// import { Layout } from '@/components/commons/Layout';
import type { AppProps } from 'next/app';


export default function App({ Component, pageProps }: AppProps) {
  return (
    
      <Component {...pageProps} />
 
  );
}