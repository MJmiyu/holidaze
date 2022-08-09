import Link from 'next/link';
import styles from '../../../styles/admin/Hotels.module.css';
import commonStyles from '../../../styles/Common.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import { useAPI } from '../../../util/APIContext';
import AdminNav from '../../../components/AdminNav';
import Loading from '../../../components/Loading';

const Hotels = () => {
  const { get } = useAPI();

  const { data, error } = useSWR('hotels', get);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotels</div>;
  }
  const hotels = data.data;

  return (
    <div className={commonStyles.Page}>
      <HolidazeAdminHead />
      <AdminNav />
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
