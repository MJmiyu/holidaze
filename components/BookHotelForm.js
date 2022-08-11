import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo, useState } from 'react';
import styles from './BookHotelForm.module.css';
import { useAPI } from '../util/APIContext';
import { format, addDays, differenceInDays, isAfter } from 'date-fns';
import Input from './Input';
import Button from './Button';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Enter an email address')
    .email('Enter a valid email address'),
  fromDate: yup.date().required('Enter when you are booking from'),
  toDate: yup.date().required('Enter when you are booking to'),
  rooms: yup.number().required('Enter the number of rooms your are booking'),
});

const today = () => {
  const today = new Date();
  return format(today, 'yyyy-MM-dd');
};

const tomorrow = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  return format(tomorrow, 'yyyy-MM-dd');
};

const BookHotelForm = ({
  hotel: {
    attributes: { price },
  },
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      fromDate: today(),
      toDate: tomorrow(),
      rooms: 1,
    },
  });

  const { fromDate, toDate, rooms } = watch();

  const bookingPrice = useMemo(() => {
    const days = differenceInDays(new Date(toDate), new Date(fromDate));
    return days * price * rooms;
  }, [fromDate, toDate, rooms, price]);

  const isToDateAfterFromDate = useMemo(() => {
    return isAfter(new Date(toDate), new Date(fromDate));
  }, [toDate, fromDate]);

  const { post } = useAPI();

  const onSubmit = useCallback(
    async (data) => {
      const result = await post('bookings', data);

      if (!result) {
        console.error('Failed sending messages');
      }
    },
    [post]
  );

  return (
    <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        title="Email"
        error={errors.email}
        placeholder="Email"
        {...register('email')}
      />

      <Input
        title="From"
        error={errors.fromDate}
        type="date"
        placeholder="From"
        {...register('fromDate')}
      />

      <Input
        title="To"
        error={errors.toDate}
        type="date"
        placeholder="To"
        {...register('toDate')}
      />

      <Input
        title="Rooms"
        error={errors.rooms}
        placeholder="Rooms"
        {...register('rooms')}
      />

      {isToDateAfterFromDate && <>Current booking price: {bookingPrice}</>}

      <Button>Order</Button>
    </form>
  );
};

export default BookHotelForm;
