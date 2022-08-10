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
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Page from '../../components/Page';
import Title from '../../components/Title';

const Hotel = () => {
  const [showModal, setShowModal] = useState(false);

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

  const {
    attributes: { name, description, address, price, image },
  } = hotel;

  const imageUrl = image.data ? image.data.attributes.url : null;

  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>{name}</Title>

      {/* Hotel with id : {id}
      Name: {name}
      Description: {description}
      Address: {address}
      Price: {price} */}

      {imageUrl && (
        <Image
          alt=""
          src={urlJoin(STRAPI_URL, image.data.attributes.url)}
          width={300}
          height={200}
        />
      )}

      <Button onClick={() => setShowModal(true)}>Book room</Button>

      {showModal && (
        <>
          <BookHotelForm hotel={hotel} />
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </>
      )}
    </Page>
  );
};

export default Hotel;
