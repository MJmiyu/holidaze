import styles from '../styles/Contact.module.css';
import Nav from '../components/Nav';
import ContactForm from '../components/ContactForm';
import { HolidazeHead } from '../components/Head';

const Contact = () => {
  return (
    <div className={styles.container}>
      <HolidazeHead />
      <Nav />
      Contact
      <ContactForm />
    </div>
  );
};

export default Contact;
