import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Hotels.module.css';
import Nav from '../components/Nav';
import useSWR from 'swr';
import fetcher from '../swrFetcher';

const Hotels = () => {
  const { data: hotels, error } = useSWR('/api/hotels', fetcher);

  if (!hotels) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Failed to load hotels</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Hotels in Bergen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      Hotels
      {hotels.map((hotel) => {
        return (
          <Link
            key={hotel.id}
            href={{ pathname: 'hotel/[id]', query: { id: hotel.id } }}
          >
            {hotel.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
