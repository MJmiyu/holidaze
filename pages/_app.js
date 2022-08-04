import '../styles/globals.css';
import { AuthProvider } from '../util/AuthContext';

const Holidaze = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default Holidaze;
