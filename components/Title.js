import styles from './Title.module.css';

const Title = ({ children }) => {
  return <h3 className={styles.Title}>{children}</h3>;
};

export default Title;
