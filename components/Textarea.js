import styles from './Textarea.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';

const Textarea = forwardRef(({ className, ...rest }, ref) => {
  return (
    <textarea
      className={cn(styles.Textarea, { [className]: !!className })}
      ref={ref}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
