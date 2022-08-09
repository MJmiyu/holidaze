import { useRouter } from 'next/router';
import styles from '../../../styles/admin/Hotel.module.css';
import commonStyles from '../../../styles/Common.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import { useAPI } from '../../../util/APIContext';
import HotelForm from '../../../components/HotelForm';
import AdminNav from '../../../components/AdminNav';
import Loading from '../../../components/Loading';

const EditHotel = () => {
  const router = useRouter();
  const { id } = router.query;

  const { get } = useAPI();

  const { data, error } = useSWR('hotels/' + id, get);

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
      Hotel with id : {hotel.id}
      Name: {hotel.attributes.name}
      Description: {hotel.attributes.description}
      Address: {hotel.attributes.address}
      Price: {hotel.attributes.price}
      <HotelForm hotel={hotel} />
    </div>
  );
};

export default EditHotel;
