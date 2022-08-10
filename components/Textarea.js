import styles from './Textarea.module.css';
import { forwardRef } from 'react';
import InputError from './InputError';

const Textarea = forwardRef(({ error, ...rest }, ref) => {
  return (
    <div className={styles.TextareaContainer}>
      <textarea className={styles.Textarea} ref={ref} {...rest} />

      <InputError error={error} />
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
