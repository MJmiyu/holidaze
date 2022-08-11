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
    reset,
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
      } else {
        reset();
        console.log('Add toast');
      }
    },
    [post, reset]
  );

  return (
    <>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Name"
          error={errors.name}
          placeholder="Name"
          {...register('name')}
        />

        <Input
          title="Email address"
          error={errors.email}
          placeholder="Email address"
          {...register('email')}
        />

        <Input
          title="Subject"
          error={errors.subject}
          placeholder="Subject"
          {...register('subject')}
        />

        <Textarea
          title="Message"
          error={errors.message}
          placeholder="Message"
          {...register('message')}
        />

        <Button>Submit</Button>
      </form>
    </>
  );
};

export default ContactForm;
