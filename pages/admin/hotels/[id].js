import { useRouter } from 'next/router';
import styles from '../../../styles/admin/Hotel.module.css';
import commonStyles from '../../../styles/Common.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import HotelForm from '../../../components/HotelForm';
import AdminNav from '../../../components/AdminNav';
import Loading from '../../../components/Loading';
import { useAuthAPI } from '../../../util/AuthAPIContext';

const EditHotel = () => {
  const router = useRouter();
  const { id } = router.query;

  const { authGet } = useAuthAPI();

  const { data, error } = useSWR('hotels/' + id, authGet);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  const hotel = data.data;

  return (
    <div className={commonStyles.Page}>
      <HolidazeAdminHead />

      <AdminNav />

      <HotelForm hotel={hotel} />
    </div>
  );
};

export default EditHotel;
