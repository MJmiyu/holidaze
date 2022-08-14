import { useRouter } from 'next/router';
import styles from '../../styles/Hotel.module.css';
import Nav from '../../components/Nav';
import useSWR from 'swr';
import { HolidazeHead } from '../../components/Head';
import { useAPI } from '../../util/APIContext';
import { useCallback, useState } from 'react';
import BookHotelForm from '../../components/BookHotelForm';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Page from '../../components/Page';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import Stars from '../../components/Stars';
import Paragraph from '../../components/Paragraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import HotelImage from '../../components/HotelImage';
import Notification from '../../components/Notification';

const Hotel = () => {
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState();

  const router = useRouter();
  const { id } = router.query;

  const { get } = useAPI();

  const { data, error } = useSWR('hotels/' + id, get);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const onBooking = useCallback(() => {
    setNotification({ message: 'Booking succsessful' });
    closeModal();
  }, [closeModal]);

  const onError = useCallback(() => {
    setNotification({ type: 'error', message: 'Booking failed' });
    closeModal();
  }, [closeModal]);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  const hotel = data.data;

  const {
    attributes: { name, stars, description, address, price, image },
  } = hotel;

  const imageUrl = image.data
    ? image.data.attributes.formats.small.url
    : '/placeholder.png';

  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>{name}</Title>

      <div className={styles.HotelContainer}>
        <HotelImage
          alt="Image of the hotel"
          src={imageUrl}
          width={500}
          height={500}
        />

        <Paragraph>{description}</Paragraph>

        <Paragraph>
          <FontAwesomeIcon icon={faLocationDot} /> {address}
        </Paragraph>

        <div className={styles.HotelInfo}>
          <Stars stars={stars} />

          <Paragraph>
            Price: <span className={styles.Bold}>{price}</span> NOK
          </Paragraph>

          <Button onClick={openModal}>Book room</Button>
        </div>
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <BookHotelForm
            hotel={hotel}
            onBooking={onBooking}
            onError={onError}
          />
        </Modal>
      )}

      {notification && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </Page>
  );
};

export default Hotel;
