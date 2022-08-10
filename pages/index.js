import { HolidazeHead } from '../components/Head';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';
import Title from '../components/Title';

import Image from 'next/image';
import Paragraph from '../components/Paragraph';
import Page from '../components/Page';

const Home = () => {
  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>Holidaze</Title>

      <Paragraph>
        Welcome to Holidaze! A hotel booking site for local hotels here in
        lovely Bergen.
      </Paragraph>

      <Image
        className={styles.FrontImage}
        src="/bergen_frontpage.jpg"
        alt="A picture of Bergen"
        width={1024}
        height={681}
      />
    </Page>
  );
};

export default Home;
