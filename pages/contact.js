import styles from '../styles/Contact.module.css';
import Nav from '../components/Nav';
import ContactForm from '../components/ContactForm';
import { HolidazeHead } from '../components/Head';
import Title from '../components/Title';
import Page from '../components/Page';

const Contact = () => {
  return (
    <Page>
      <HolidazeHead />

      <Nav />

      <Title>Contact us</Title>

      <ContactForm />
    </Page>
  );
};

export default Contact;
