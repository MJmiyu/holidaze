import { useRouter } from 'next/router';
import styles from '../../../styles/Hotel.module.css';
import Nav from '../../../components/Nav';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import { useAPI } from '../../../util/APIContext';
import HotelForm from '../../../components/HotelForm';

const EditHotel = () => {
  const router = useRouter();
  const { id } = router.query;

  const { get } = useAPI();

  const { data, error } = useSWR('hotels/' + id, get);

  console.log(data);

  if (!data) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  const hotel = data.data;

  return (
    <div className={styles.container}>
      <HolidazeAdminHead />
      <Nav />
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
