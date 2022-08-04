import { createContext, useCallback, useContext, useState } from 'react';
import { STRAPI_URL } from '../constants/strapi';

const LOCAL_STORAGE_JWT_KEY = 'HOLIDAZE_JWT';

const isLocal = () => typeof window !== 'undefined';

const getJwt = () => {
  if (isLocal()) {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
    return jwt ?? null;
  }
};

const storeJwt = (jwt) => {
  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, jwt);
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(getJwt());
  const [error, setError] = useState(false);

  const login = useCallback(async (username, password) => {
    const body = JSON.stringify({ identifier: username, password });
    const response = await fetch(STRAPI_URL + 'auth/local', {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const { jwt, error } = await response.json();

    if (error) {
      console.error(error);
      setError(true);
      return;
    }

    setJwt(jwt);
    storeJwt(jwt);
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, error, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
