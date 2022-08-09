import useSWR from 'swr';
import AdminNav from '../../components/AdminNav';
import { HolidazeAdminHead } from '../../components/Head';
import Loading from '../../components/Loading';
import { useAuthAPI } from '../../util/AuthAPIContext';
import styles from '../../styles/admin/Bookings.module.css';
import commonStyles from '../../styles/Common.module.css';

const Bookings = () => {
  const { authGet } = useAuthAPI();

  const { data, error } = useSWR('bookings', authGet);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching bookings</div>;
  }

  const bookings = data.data;
  return (
    <div className={commonStyles.Page}>
      <HolidazeAdminHead />
      <AdminNav />
      Bookings
      {bookings.map((booking) => {
        return (
          <div key={booking.id}>
            {booking.attributes.email}
            {booking.attributes.fromDate}
            {booking.attributes.toDate}
            {booking.attributes.rooms}
          </div>
        );
      })}
    </div>
  );
};

export default Bookings;
