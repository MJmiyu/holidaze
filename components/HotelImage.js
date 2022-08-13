import Image from 'next/image';
import styles from './HotelImage.module.css';

const HotelImage = (props) => {
  return <Image className={styles.HotelImage} {...props} />;
};

export default HotelImage;
