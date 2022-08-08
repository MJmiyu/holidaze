import Link from 'next/link';
import styles from '../../styles/Hotels.module.css';
import useSWR from 'swr';
import { useAPI } from '../../util/APIContext';
import { HolidazeHead } from '../../components/Head';
import Nav from '../../components/Nav';

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
      <HolidazeHead />
      <Nav />
      Hotels
      {hotels.map((hotel) => {
        const {
          id,
          attributes: { name },
        } = hotel;

        return (
          <Link key={id} href={{ pathname: 'hotels/[id]', query: { id } }}>
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
