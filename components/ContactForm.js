import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import styles from './ContactForm.module.css';

const schema = yup.object().shape({
  name: yup.string().required('Enter your first name here'),
  email: yup
    .string()
    .required('Enter an email address')
    .email('Enter a valid email address'),
  subject: yup.string().required('Enter a subject'),
  message: yup.string().required('Enter your message'),
});

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback((data) => {
    setSubmitted(true);
    console.log(data);
  }, []);

  return (
    <>
      {submitted && <div>Submitted successfully</div>}

      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <span>{errors.name.message}</span>}
        <input placeholder="Enter your name here" {...register('firstName')} />

        {errors.email && <span>{errors.email.message}</span>}
        <input placeholder="Email address" {...register('email')} />

        {errors.subject && <span>{errors.subject.message}</span>}
        <input placeholder="Enter a subject here" {...register('subject')} />

        {errors.message && <span>{errors.message.message}</span>}
        <input placeholder="Enter your message here" {...register('message')} />

        <button>Submit</button>
      </form>
    </>
  );
};

export default ContactForm;
