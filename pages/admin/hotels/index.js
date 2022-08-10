import styles from '../../../styles/admin/Hotels.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import AdminNav from '../../../components/AdminNav';
import Loading from '../../../components/Loading';
import NextLink from '../../../components/NextLink';
import { useAuthAPI } from '../../../util/AuthAPIContext';
import Page from '../../../components/Page';
import Title from '../../../components/Title';

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
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Hotels</Title>

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
    </Page>
  );
};

export default Hotels;
