import useSWR from 'swr';
import { HolidazeAdminHead } from '../../components/Head';
import { useAuth } from '../../util/AuthContext';

const Bookings = () => {
  const { authFetcher } = useAuth();

  const { data, error } = useSWR('bookings', authFetcher);

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
