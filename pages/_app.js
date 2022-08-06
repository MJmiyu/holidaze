import '../styles/globals.css';
import { AuthProvider } from '../util/AuthContext';
import { FetcherProvider } from '../util/FetcherContext';

const Holidaze = ({ Component, pageProps }) => {
  return (
    <FetcherProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </FetcherProvider>
  );
};

export default Holidaze;
