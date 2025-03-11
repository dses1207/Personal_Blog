import '@/styles/globals.css';
import '@/styles/prism-vsc-dark-plus.css';
import '@/styles/prism-plus.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

import LayoutWrapper from '@/components/LayoutWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
