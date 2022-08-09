import styles from '../../../styles/admin/Hotels.module.css';
import commonStyles from '../../../styles/Common.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import AdminNav from '../../../components/AdminNav';
import Loading from '../../../components/Loading';
import NextLink from '../../../components/NextLink';
import { useAuthAPI } from '../../../util/AuthAPIContext';

const Hotels = () => {
  const { authGet } = useAuthAPI();

  const { data, error } = useSWR('hotels', authGet);

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
          <NextLink
            key={hotel.id}
            href={{ pathname: '/admin/hotels/[id]', query: { id: hotel.id } }}
          >
            {hotel.attributes.name}
          </NextLink>
        );
      })}
    </div>
  );
};

export default Hotels;
