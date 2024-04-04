import { ChakraProvider } from '@chakra-ui/react';
import { Silkscreen } from 'next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Nav } from '@/components/common';
import { StateProvider } from '@/store';
import { theme } from '../styles/theme';

const silkscreen = Silkscreen({ weight: ['400', '700'], subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Quai Miners</title>
        <meta name="description" content="Mint your Quai Miner NFTs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <StateProvider>
          <main className={silkscreen.className}>
            <Nav />
            <Component {...pageProps} />
          </main>
        </StateProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
