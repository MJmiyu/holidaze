import Link from 'next/link';
import styles from './Nav.module.css';
import Search from './Search';

const Nav = () => {
  return (
    <div className={styles.Nav}>
      <Link href="/">Home</Link>
      <Link href="/hotels">Hotels</Link>
      <Link href="/contact">Contact</Link>
      <Search />
    </div>
  );
};

export default Nav;
