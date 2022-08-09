import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import styles from './ContactForm.module.css';
import { useAPI } from '../util/APIContext';
import Input from './Input';
import Button from './Button';
import Textarea from './Textarea';

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
      const result = await post('messages', data);

      if (!result) {
        console.error('Failed sending messages');
      }
    },
    [post]
  );

  return (
    <>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <span>{errors.name.message}</span>}
        <Input placeholder="Enter your name here" {...register('name')} />

        {errors.email && <span>{errors.email.message}</span>}
        <Input placeholder="Email address" {...register('email')} />

        {errors.subject && <span>{errors.subject.message}</span>}
        <Input placeholder="Enter a subject here" {...register('subject')} />

        {errors.message && <span>{errors.message.message}</span>}
        <Textarea
          placeholder="Enter your message here"
          {...register('message')}
        />

        <Button>Submit</Button>
      </form>
    </>
  );
};

export default ContactForm;
