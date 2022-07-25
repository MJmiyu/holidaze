import Head from 'next/head';
import styles from '../../styles/admin/Login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Holidaze Admin</title>
        <meta name="description" content="Admin page for holidaze" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      LOGIN
    </div>
  );
};

export default Login;
