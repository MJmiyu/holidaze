import { useRouter } from 'next/router';
import styles from '../../../styles/admin/Hotel.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import HotelForm from '../../../components/HotelForm';
import AdminNav from '../../../components/AdminNav';
import Loading from '../../../components/Loading';
import { useAuthAPI } from '../../../util/AuthAPIContext';
import Page from '../../../components/Page';
import Title from '../../../components/Title';

const EditHotel = () => {
  const router = useRouter();
  const { id } = router.query;

  const { authGet } = useAuthAPI();

  const { data, error, mutate } = useSWR('hotels/' + id, authGet);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  const hotel = data.data;

  return (
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Edit hotel</Title>

      <HotelForm hotel={hotel} mutate={mutate} />
    </Page>
  );
};

export default EditHotel;
