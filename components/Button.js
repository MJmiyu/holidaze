import styles from './Button.module.css';
import cn from 'classnames';

const Button = ({ className, children, ...rest }) => {
  return (
    <button
      className={cn(styles.Button, { [className]: !!className })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
