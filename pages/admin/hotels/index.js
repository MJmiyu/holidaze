import Link from 'next/link';
import styles from '../../../styles/Hotels.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import Nav from '../../../components/Nav';
import { useAPI } from '../../../util/APIContext';

const Hotels = () => {
  const { get } = useAPI();

  const { data, error } = useSWR('hotels', get);

  if (!data) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Failed to load hotels</div>;
  }
  const hotels = data.data;

  return (
    <div className={styles.container}>
      <HolidazeAdminHead />
      <Nav />
      Hotels
      {hotels.map((hotel) => {
        return (
          <Link
            key={hotel.id}
            href={{ pathname: '/admin/hotels/[id]', query: { id: hotel.id } }}
          >
            {hotel.attributes.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
