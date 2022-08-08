import useSWR from 'swr';
import { HolidazeAdminHead } from '../../components/Head';
import { useAuthAPI } from '../../util/AuthAPIContext';

const Bookings = () => {
  const { authGet } = useAuthAPI();

  const { data, error } = useSWR('bookings', authGet);

  if (!data) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>Error fetching bookings</div>;
  }

  const bookings = data.data;
  return (
    <div>
      <HolidazeAdminHead />
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
