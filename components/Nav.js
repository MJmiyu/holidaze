import Link from 'next/link';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <div className={styles.Nav}>
      <Link href="/">Home</Link>
      <Link href="/hotels">Hotels</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
};

export default Nav;
