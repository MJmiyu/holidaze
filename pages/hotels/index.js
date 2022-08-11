import styles from '../../styles/Hotels.module.css';
import useSWR from 'swr';
import { useAPI } from '../../util/APIContext';
import { HolidazeHead } from '../../components/Head';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading';
import NextLink from '../../components/NextLink';
import Page from '../../components/Page';
import Title from '../../components/Title';
import SubTitle from '../../components/SubTitle';
import Image from 'next/image';
import Stars from '../../components/Stars';

const Hotels = () => {
  const { get } = useAPI();

  const { data, error } = useSWR('hotels', get);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load hotels</div>;
  }

  const hotels = data.data;

  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>Our hotels</Title>

      <div className={styles.Hotels}>
        {hotels.map((hotel) => {
          const {
            id,
            attributes: { name, image },
          } = hotel;

          const imageUrl = image.data
            ? image.data.attributes.formats.small.url
            : '/placeholder.png';

          return (
            <NextLink
              key={id}
              href={{ pathname: '/hotels/[id]', query: { id } }}
            >
              <div className={styles.Hotel}>
                <SubTitle>{name}</SubTitle>

                <Image
                  src={imageUrl}
                  alt="A picture of the hotel"
                  width={300}
                  height={300}
                />

                <div className={styles.HoteInfo}>
                  <Stars stars={hotel.attributes.stars} />
                </div>
              </div>
            </NextLink>
          );
        })}
      </div>
    </Page>
  );
};

export default Hotels;
