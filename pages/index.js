import { HolidazeHead } from '../components/Head';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import Page from '../components/Page';
import HotelImage from '../components/HotelImage';

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

      <HotelImage
        src="/bergen_frontpage.jpg"
        alt="A picture of Bergen"
        width={1024}
        height={681}
      />

      <Paragraph>
        &quot;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.flickr.com/photos/54765068@N00/4390667762"
        >
          lille lungegårdsvann, bergen
        </a>
        &quot; by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.flickr.com/photos/54765068@N00"
        >
          vidart
        </a>
      </Paragraph>
    </Page>
  );
};

export default Home;
