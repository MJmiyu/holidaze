import Head from 'next/head';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Hotels in Bergen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      HOLIDAZE
    </div>
  );
};

export default Home;
