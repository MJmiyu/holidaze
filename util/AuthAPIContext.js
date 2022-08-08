import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useState } from 'react';
import { STRAPI_URL } from '../constants/strapi';
import { isLocal } from './isLocal';

const LOCAL_STORAGE_JWT_KEY = 'HOLIDAZE_JWT';

const getJwt = () => {
  if (isLocal()) {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
    return jwt ?? null;
  }
};

const storeJwt = (jwt) => {
  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, jwt);
};

const AuthAPIContext = createContext({});

export const AuthAPIProvider = ({ children }) => {
  const [jwt, setJwt] = useState(getJwt());

  const router = useRouter();

  const login = useCallback(
    async (username, password) => {
      try {
        const body = JSON.stringify({ identifier: username, password });
        const response = await fetch(STRAPI_URL + 'auth/local', {
          method: 'POST',
          body,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new Error('Error logging in received HTTP ' + response.status);
        }

        const { jwt, error } = await response.json();

        if (error) {
          throw new Error('Error logging in:', error);
        }

        setJwt(jwt);
        storeJwt(jwt);

        router.push('/admin/hotels');
      } catch (e) {
        console.error(e);
        router.push('/admin');
      }
    },
    [router]
  );

  const authGet = useCallback(
    async (url) => {
      try {
        const result = await fetch(STRAPI_URL + url, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (result.status === 404) {
          router.push('/');
        }

        if (result.status === 403 || result.status === 401) {
          router.push('/admin');
        }

        const json = await result.json();
        return json;
      } catch (e) {
        console.error(e);
      }
    },
    [router]
  );

  const contextValue = {
    authGet,
    login,
  };

  return (
    <AuthAPIContext.Provider value={contextValue}>
      {children}
    </AuthAPIContext.Provider>
  );
};

export const useAuthAPI = () => useContext(AuthAPIContext);
