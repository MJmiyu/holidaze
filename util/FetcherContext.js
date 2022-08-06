import { useRouter } from 'next/router';
import { createContext, useCallback, useContext } from 'react';
import { STRAPI_URL } from '../constants/strapi';

const FetcherContext = createContext(async () => {});

export const FetcherProvider = ({ children }) => {
  const router = useRouter();

  const fetcher = useCallback(
    async (url) => {
      try {
        const result = await fetch(STRAPI_URL + url);

        if (result.status === 404) {
          router.push('/');
        }

        const json = await result.json();
        return json;
      } catch (e) {
        console.error(e);
      }
    },
    [router]
  );

  return (
    <FetcherContext.Provider value={fetcher}>
      {children}
    </FetcherContext.Provider>
  );
};

export const useFetcher = () => useContext(FetcherContext);
