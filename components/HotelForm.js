import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import styles from './HotelForm.module.css';
import { useAuthAPI } from '../util/AuthAPIContext';
import { useRouter } from 'next/router';
import UploadImage from './UploadImage';

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
  const [file, setFile] = useState();

  const editing = !!hotel;

  const router = useRouter();

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

  const { authPost, authPut, uploadImage, deleteImage } = useAuthAPI();

  const editHotel = useCallback(
    async (data, file) => {
      const result = await authPut('hotels', hotel.id, data);

      if (result) {
        if (file) {
          const success = await uploadImage(file, hotel.id);

          if (success && hotel.attributes.image.data) {
            await deleteImage(hotel.attributes.image.data.id);
          }
        }

        window.location.reload();
      } else {
        console.error('Failed creating hotel');
      }
    },
    [hotel, authPut, uploadImage, deleteImage]
  );

  const createHotel = useCallback(
    async (data, file) => {
      const result = await authPost('hotels', data);

      if (result) {
        const hotelId = result.data.id;

        if (file) {
          await uploadImage(file, hotelId);
        }

        router.push('/admin/hotels/' + hotelId);
      } else {
        console.error('Failed creating hotel');
      }
    },
    [authPost, uploadImage, router]
  );

  const onSubmit = useCallback(
    (data) => {
      if (editing) {
        editHotel(data, file);
      } else {
        createHotel(data, file);
      }
    },
    [editing, file, editHotel, createHotel]
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

      <UploadImage
        image={editing ? hotel.attributes.image.data : undefined}
        setFile={setFile}
      />
    </>
  );
};

export default HotelForm;
