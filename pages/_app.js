import '../styles/globals.css';
import { AuthAPIProvider } from '../util/AuthAPIContext';
import { APIProvider } from '../util/APIContext';

const Holidaze = ({ Component, pageProps }) => {
  return (
    <APIProvider>
      <AuthAPIProvider>
        <Component {...pageProps} />
      </AuthAPIProvider>
    </APIProvider>
  );
};

export default Holidaze;
