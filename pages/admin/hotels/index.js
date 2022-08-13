import styles from '../../../styles/admin/Hotels.module.css';
import useSWR from 'swr';
import { HolidazeAdminHead } from '../../../components/Head';
import AdminNav from '../../../components/AdminNav';
import Loading from '../../../components/Loading';
import NextLink from '../../../components/NextLink';
import { useAuthAPI } from '../../../util/AuthAPIContext';
import Page from '../../../components/Page';
import Title from '../../../components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Paragraph from '../../../components/Paragraph';
import Stars from '../../../components/Stars';
import Button from '../../../components/Button';
import SubTitle from '../../../components/SubTitle';
import { useCallback } from 'react';

const Hotels = () => {
  const { authGet, authDelete } = useAuthAPI();

  const { data, error } = useSWR('hotels', authGet);

  const onDeleteHotel = useCallback(
    async (hotel) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${hotel.attributes.name}?`
        )
      )
        return;

      const result = await authDelete('hotels', hotel.id);

      if (result) {
        window.location.reload();
      }
    },
    [authDelete]
  );

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

      <div className={styles.Hotels}>
        {hotels.map((hotel) => {
          const {
            id,
            attributes: { name, price, stars },
          } = hotel;

          return (
            <div className={styles.Hotel}>
              <SubTitle>{name}</SubTitle>

              <Stars stars={stars} />

              <Paragraph>Price: {price} NOK</Paragraph>

              <div className={styles.HotelButtons}>
                <NextLink
                  className={styles.EditHotelLink}
                  key={id}
                  href={{ pathname: '/admin/hotels/[id]', query: { id } }}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={styles.EditHotelIcon}
                  />
                  Edit
                </NextLink>

                <Button color="red" onClick={() => onDeleteHotel(hotel)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default Hotels;
