import { useRouter } from 'next/router';
import { createContext, useCallback, useContext } from 'react';
import { STRAPI_URL } from '../constants/strapi';

const APIContext = createContext(async () => {});

export const APIProvider = ({ children }) => {
  const router = useRouter();

  const get = useCallback(
    async (url) => {
      try {
        const response = await fetch(STRAPI_URL + url);

        if (response.status === 404) {
          router.push('/');
        }

        const json = await response.json();
        return json;
      } catch (e) {
        console.error(e);
      }
    },
    [router]
  );

  const post = useCallback(async (url, data) => {
    try {
      const body = JSON.stringify({ data });

      const response = await fetch(STRAPI_URL + url, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(
          'Received HTTP ' + response.status + ' on reqquest to ',
          url,
          JSON.stringify(body, null, 2)
        );
      }

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  });

  const contextValue = {
    get,
    post,
  };

  return (
    <APIContext.Provider value={contextValue}>{children}</APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
