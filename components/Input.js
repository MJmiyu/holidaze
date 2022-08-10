import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';

const Input = forwardRef(({ className, ...rest }, ref) => {
  return (
    <input
      className={cn(styles.Input, { [className]: !!className })}
      ref={ref}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
export default Input;
