import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import Nav from '../components/Nav';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Holidaze</title>
        <meta name="description" content="Hotels in Bergen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      Contact
      <ContactForm />
    </div>
  );
};

export default Contact;
