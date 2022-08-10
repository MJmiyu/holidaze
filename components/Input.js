import styles from './Input.module.css';
import { forwardRef } from 'react';
import InputError from './InputError';

const Input = forwardRef(({ error, ...rest }, ref) => {
  return (
    <div className={styles.InputContainer}>
      <input className={styles.Input} ref={ref} {...rest} />

      <InputError error={error} />
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
