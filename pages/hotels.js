import Link from 'next/link';
import styles from '../styles/Hotels.module.css';
import Nav from '../components/Nav';
import useSWR from 'swr';
import { fetcher } from '../swrFetcher';
import { HolidazeHead } from '../components/Head';
import { STRAPI_URL } from '../constants/strapi';

const Hotels = () => {
  const { data, error } = useSWR(STRAPI_URL + 'hotels', fetcher);

  if (!data) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Failed to load hotels</div>;
  }

  const hotels = data.data;

  return (
    <div className={styles.container}>
      <HolidazeHead />
      <Nav />
      Hotels
      {hotels.map((hotel) => {
        const {
          id,
          attributes: { name },
        } = hotel;

        return (
          <Link key={id} href={{ pathname: 'hotel/[id]', query: { id } }}>
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
