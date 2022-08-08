import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import styles from './ContactForm.module.css';
import { useAPI } from '../util/APIContext';

const schema = yup.object().shape({
  name: yup.string().required('Enter your name here'),
  email: yup
    .string()
    .required('Enter an email address')
    .email('Enter a valid email address'),
  subject: yup.string().required('Enter a subject'),
  message: yup.string().required('Enter your message'),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { post } = useAPI();

  const onSubmit = useCallback(
    async (data) => {
      const success = await post('messages', data);

      if (!success) {
        console.error('Failed sending messages');
      }
    },
    [post]
  );

  return (
    <>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <span>{errors.name.message}</span>}
        <input placeholder="Enter your name here" {...register('name')} />

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
