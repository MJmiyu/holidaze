import { HolidazeAdminHead } from '../../components/Head';
import styles from '../../styles/admin/Login.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthAPI } from '../../util/AuthAPIContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Page from '../../components/Page';
import Title from '../../components/Title';

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
    <Page>
      <HolidazeAdminHead />

      <Title>Holidaze admin login</Title>

      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Username"
          placeholder="Username"
          error={errors.name}
          {...register('username')}
        />

        <Input
          type="password"
          title="Password"
          placeholder="Password"
          error={errors.password}
          {...register('password')}
        />

        <Button>Login</Button>
      </form>
    </Page>
  );
};

export default LoginPage;
