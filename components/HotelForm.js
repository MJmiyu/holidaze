import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import styles from './HotelForm.module.css';
import { useAuthAPI } from '../util/AuthAPIContext';

const schema = yup.object().shape({
  name: yup.string().required('Enter the hotel name'),
  description: yup.string().required('Enter a description'),
  address: yup.string().required('Enter an address'),
  price: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be greater than 0')
    .required('Enter a price'),
});

const HotelForm = ({ hotel }) => {
  const editing = !!hotel;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: editing ? hotel.attributes.name : '',
      description: editing ? hotel.attributes.description : '',
      address: editing ? hotel.attributes.address : '',
      price: editing ? hotel.attributes.price : 1000,
    },
  });

  const { authPost, authPut } = useAuthAPI();

  const onSubmit = useCallback(
    async (data) => {
      if (editing) {
        const success = await authPut('hotels', hotel.id, data);

        if (success) {
          window.location.reload();
        } else {
          console.error('Failed creating hotel');
        }
      } else {
        const success = await authPost('hotels', data);

        if (!success) {
          console.error('Failed creating hotel');
        }
      }
    },
    [editing, hotel, authPost, authPut]
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

        {errors.price && <span>{errors.price.message}</span>}
        <input placeholder="Enter a price here" {...register('price')} />

        <button>Submit</button>
      </form>
    </>
  );
};

export default HotelForm;
