import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Hotel.module.css';
import Nav from '../../components/Nav';
import fetcher from '../../swrFetcher';
import useSWR from 'swr';

const Hotel = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: hotel, error } = useSWR('/api/hotel/' + id, fetcher);

  if (!hotel) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Hotels in Bergen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      Hotel with id : {hotel.id}
      Name: {hotel.name}
      Description: {hotel.description}
      Address: {hotel.address}
      Price: {hotel.price}
    </div>
  );
};

export default Hotel;
