import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import styles from './HotelForm.module.css';
import { useAuthAPI } from '../util/AuthAPIContext';
import { useRouter } from 'next/router';
import UploadImage from './UploadImage';
import Input from './Input';
import Button from './Button';
import Textarea from './Textarea';

const schema = yup.object().shape({
  name: yup.string().required('Enter the hotel name'),
  description: yup.string().required('Enter a description'),
  address: yup.string().required('Enter an address'),
  price: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be greater than 0')
    .required('Enter a price'),
  stars: yup
    .number()
    .min(1, 'Must be a number between 1 and 5')
    .max(5, 'Must be a number between 1 and 5')
    .typeError('Must be a number')
    .required('Enter a star rating'),
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
      stars: editing ? hotel.attributes.stars : 3,
    },
  });

  const { authPost, authPut, authDelete, uploadImage, deleteImage } =
    useAuthAPI();

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

  const onDeleteHotel = useCallback(async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${hotel.attributes.name}?`
      )
    )
      return;

    const result = await authDelete('hotels', hotel.id);

    if (result) {
      router.push('/admin/hotels');
    }
  }, [authDelete, hotel, router]);

  const onCancel = useCallback(() => {
    router.push('/admin/hotels');
  }, [router]);

  return (
    <div className={styles.FormContainer}>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Name"
          error={errors.name}
          placeholder="Name"
          {...register('name')}
        />

        <Textarea
          title="Description"
          error={errors.description}
          placeholder="Description"
          {...register('description')}
        />

        <Input
          title="Address"
          error={errors.address}
          placeholder="Address"
          {...register('address')}
        />

        <Input
          title="Price"
          error={errors.price}
          placeholder="Price"
          {...register('price')}
        />

        <Input
          title="Stars"
          error={errors.stars}
          placeholder="Star rating"
          {...register('stars')}
        />

        <div className={styles.ButtonContainer}>
          <Button>Save</Button>

          <Button type="button" color="gray" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="button" color="red" onClick={onDeleteHotel}>
            Delete
          </Button>
        </div>
      </form>

      <UploadImage
        image={editing ? hotel.attributes.image.data : undefined}
        setFile={setFile}
      />
    </div>
  );
};

export default HotelForm;
