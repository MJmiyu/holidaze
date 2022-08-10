import styles from './Paragraph.module.css';

const Paragraph = ({ children }) => {
  return <p className={styles.Paragraph}>{children}</p>;
};

export default Paragraph;
