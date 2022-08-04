import { HolidazeAdminHead } from '../../components/Head';
import commonStyles from '../../styles/Common.module.css';
import styles from '../../styles/admin/Login.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../util/AuthContext';

const schema = yup.object().shape({
  username: yup.string().required('Enter your username or email'),
  password: yup.string().required('Enter a password'),
});

const LoginPage = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(({ username, password }) => {
    login(username, password);
  });

  return (
    <div className={commonStyles.container}>
      <HolidazeAdminHead />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <span>{errors.username.message}</span>}
        <input placeholder="Username" {...register('username')} />

        {errors.email && <span>{errors.password.message}</span>}
        <input placeholder="Password" {...register('password')} />

        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
