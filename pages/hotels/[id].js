import { useRouter } from 'next/router';
import styles from '../../styles/Hotel.module.css';
import Nav from '../../components/Nav';
import useSWR from 'swr';
import { HolidazeHead } from '../../components/Head';
import { useAPI } from '../../util/APIContext';
import { useState } from 'react';
import BookHotelForm from '../../components/BookHotelForm';
import { STRAPI_URL } from '../../constants/strapi';
import urlJoin from 'url-join';
import Image from 'next/image';

const Hotel = () => {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { get } = useAPI();

  const { data, error } = useSWR('hotels/' + id, get);

  if (!data) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Failed to load hotel</div>;
  }

  const hotel = data.data;

  const {
    attributes: { name, description, address, price, image },
  } = hotel;

  const imageUrl = image.data ? image.data.attributes.url : null;

  return (
    <div className={styles.container}>
      <HolidazeHead />
      <Nav />
      Hotel with id : {id}
      Name: {name}
      Description: {description}
      Address: {address}
      Price: {price}
      {imageUrl && (
        <Image
          src={urlJoin(STRAPI_URL, image.data.attributes.url)}
          width={300}
          height={200}
        />
      )}
      <button onClick={() => setShowModal(true)}>Book room</button>
      {showModal && (
        <>
          <BookHotelForm hotel={hotel} />
          <button onClick={() => setShowModal(false)}>Close</button>
        </>
      )}
    </div>
  );
};

export default Hotel;
