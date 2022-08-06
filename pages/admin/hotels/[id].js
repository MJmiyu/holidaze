import { useRouter } from 'next/router';
import styles from '../../../styles/Hotel.module.css';
import Nav from '../../../components/Nav';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import { useFetcher } from '../../../util/FetcherContext';

const EditHotel = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = useFetcher();

  const { data: hotel, error } = useSWR('hotels/' + id, fetcher);

  if (!hotel) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  return (
    <div className={styles.container}>
      <HolidazeAdminHead />
      <Nav />
      Hotel with id : {hotel.id}
      Name: {hotel.name}
      Description: {hotel.description}
      Address: {hotel.address}
      Price: {hotel.price}
    </div>
  );
};

export default EditHotel;
