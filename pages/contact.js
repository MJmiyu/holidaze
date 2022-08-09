import commonStyles from '../styles/Common.module.css';
import styles from '../styles/Contact.module.css';
import Nav from '../components/Nav';
import ContactForm from '../components/ContactForm';
import { HolidazeHead } from '../components/Head';

const Contact = () => {
  return (
    <div className={commonStyles.Page}>
      <HolidazeHead />
      <Nav />
      Contact
      <ContactForm />
    </div>
  );
};

export default Contact;
