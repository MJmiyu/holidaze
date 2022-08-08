import { useRouter } from 'next/router';
import styles from '../../styles/Hotel.module.css';
import Nav from '../../components/Nav';
import useSWR from 'swr';
import { HolidazeHead } from '../../components/Head';
import { useAPI } from '../../util/APIContext';

const Hotel = () => {
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

  const {
    attributes: { name, description, address, price },
  } = data.data;

  return (
    <div className={styles.container}>
      <HolidazeHead />
      <Nav />
      Hotel with id : {id}
      Name: {name}
      Description: {description}
      Address: {address}
      Price: {price}
    </div>
  );
};

export default Hotel;
