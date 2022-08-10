import HotelForm from '../../../components/HotelForm';
import { HolidazeAdminHead } from '../../../components/Head';
import styles from '../../../styles/admin/Hotel.module.css';
import AdminNav from '../../../components/AdminNav';
import Page from '../../../components/Page';
import Title from '../../../components/Title';

const CreateHotel = () => {
  return (
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Create hotel</Title>

      <HotelForm />
    </Page>
  );
};

export default CreateHotel;
