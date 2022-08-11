import styles from './SubTitle.module.css';

const SubTitle = ({ children }) => {
  return <h4 className={styles.SubTitle}>{children}</h4>;
};

export default SubTitle;
