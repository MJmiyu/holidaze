import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Hotels in Bergen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      HOLIDAZE
    </div>
  );
}
