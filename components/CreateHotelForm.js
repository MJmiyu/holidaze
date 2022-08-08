import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import styles from './CreateHotelForm.module.css';
import { useAuthAPI } from '../util/AuthAPIContext';

const schema = yup.object().shape({
  name: yup.string().required('Enter the hotel name'),
  description: yup.string().required('Enter a description'),
  address: yup.string().required('Enter an address'),
  price: yup.number().required('Enter a price'),
});

const CreateHotelForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { authPost } = useAuthAPI();

  const onSubmit = useCallback(
    async (data) => {
      const success = await authPost('hotels', data);

      if (!success) {
        console.error('Failed creating hotel');
      }
    },
    [authPost]
  );

  return (
    <>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <span>{errors.name.message}</span>}
        <input placeholder="Enter the hotel name here" {...register('name')} />

        {errors.description && <span>{errors.description.message}</span>}
        <input
          placeholder="Enter a description here"
          {...register('description')}
        />

        {errors.address && <span>{errors.address.message}</span>}
        <input placeholder="Enter an address here" {...register('address')} />

        {errors.proce && <span>{errors.price.message}</span>}
        <input placeholder="Enter a price here" {...register('price')} />

        <button>Submit</button>
      </form>
    </>
  );
};

export default CreateHotelForm;
