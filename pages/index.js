import { HolidazeHead } from '../components/Head';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <HolidazeHead />
      <Nav />
      HOLIDAZE
    </div>
  );
};

export default Home;
