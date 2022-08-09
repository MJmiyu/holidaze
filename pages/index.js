import { HolidazeHead } from '../components/Head';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';
import commonStyles from '../styles/Common.module.css';

const Home = () => {
  return (
    <div className={commonStyles.Page}>
      <HolidazeHead />
      <Nav />
      HOLIDAZE
    </div>
  );
};

export default Home;
