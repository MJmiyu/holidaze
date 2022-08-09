import { HolidazeAdminHead } from '../../components/Head';
import commonStyles from '../../styles/Common.module.css';
import styles from '../../styles/admin/Login.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthAPI } from '../../util/AuthAPIContext';
import AdminNav from '../../components/AdminNav';
import Input from '../../components/Input';
import Button from '../../components/Button';

const schema = yup.object().shape({
  username: yup.string().required('Enter your username or email'),
  password: yup.string().required('Enter a password'),
});

const LoginPage = () => {
  const { login } = useAuthAPI();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    ({ username, password }) => {
      login(username, password);
    },
    [login]
  );

  return (
    <div className={commonStyles.Page}>
      <HolidazeAdminHead />
      Login
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <span>{errors.username.message}</span>}
        <Input placeholder="Username" {...register('username')} />

        {errors.email && <span>{errors.password.message}</span>}
        <Input placeholder="Password" {...register('password')} />

        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
