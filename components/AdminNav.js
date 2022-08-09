import Link from 'next/link';
import styles from './AdminNav.module.css';

const AdminNav = () => {
  return (
    <div className={styles.AdminNav}>
      <Link href="/admin/hotels">Hotels</Link>
      <Link href="/admin/bookings">Bookings</Link>
      <Link href="/admin/messages">Messages</Link>
    </div>
  );
};

export default AdminNav;
