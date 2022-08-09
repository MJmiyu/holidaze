import HotelForm from '../../../components/HotelForm';
import { HolidazeAdminHead } from '../../../components/Head';
import styles from '../../../styles/admin/Hotel.module.css';
import commonStyles from '../../../styles/Common.module.css';
import AdminNav from '../../../components/AdminNav';

const CreateHotel = () => {
  return (
    <div className={commonStyles.Page}>
      <HolidazeAdminHead />
      <AdminNav />
      Create Hotel
      <HotelForm />
    </div>
  );
};

export default CreateHotel;
