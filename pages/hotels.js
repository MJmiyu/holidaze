import Link from 'next/link';
import styles from '../styles/Hotels.module.css';
import Nav from '../components/Nav';
import useSWR from 'swr';
import fetcher from '../swrFetcher';
import { HolidazeHead } from '../components/Head';

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
      <HolidazeHead />
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
