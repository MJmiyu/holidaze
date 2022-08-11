import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import styles from './Stars.module.css';

const starArray = Array.from(Array(5));

const Stars = ({ stars }) => {
  return (
    <>
      {starArray.map((_, i) => {
        return (
          <FontAwesomeIcon
            className={cn(styles.Star, stars > i ? styles.Gold : styles.Gray)}
            icon={faStar}
          />
        );
      })}
    </>
  );
};

export default Stars;
