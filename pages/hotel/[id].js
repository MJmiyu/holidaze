import { useRouter } from 'next/router';
import styles from '../../styles/Hotel.module.css';
import Nav from '../../components/Nav';
import fetcher from '../../swrFetcher';
import useSWR from 'swr';
import { HolidazeHead } from '../../components/Head';

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
      <HolidazeHead />
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
