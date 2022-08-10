import styles from '../../styles/Hotels.module.css';
import useSWR from 'swr';
import { useAPI } from '../../util/APIContext';
import { HolidazeHead } from '../../components/Head';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading';
import NextLink from '../../components/NextLink';
import Page from '../../components/Page';
import Title from '../../components/Title';

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

      {hotels.map((hotel) => {
        const {
          id,
          attributes: { name },
        } = hotel;

        return (
          <NextLink key={id} href={{ pathname: '/hotels/[id]', query: { id } }}>
            {name}
          </NextLink>
        );
      })}
    </Page>
  );
};

export default Hotels;
