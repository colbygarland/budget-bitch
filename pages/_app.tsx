import type { AppProps } from 'next/app';
import { StoreProvider, rootStore } from '../stores/rootStore';
import { PageHead } from '../components/PageHead';
import '../services/firebase';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { firebaseAuth } from '../services/firebase';
import { useRouter } from 'next/router';
import { GlobalStyle } from '../theme/global';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.replace('/login');
      }
    });
  }, []);
  return (
    <StoreProvider value={rootStore}>
      <PageHead />
      <GlobalStyle />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreProvider>
  );
}

export default MyApp;
