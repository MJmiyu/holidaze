import useSWR from 'swr';
import { HolidazeAdminHead } from '../../components/Head';
import { STRAPI_URL } from '../../constants/strapi';
import styles from '../../styles/Common.module.css';
import { authenticatedFetcher } from '../../swrFetcher';
import { useAuth } from '../../util/AuthContext';

const Messages = () => {
  const { jwt } = useAuth();

  const { data, error } = useSWR(
    STRAPI_URL + 'messages',
    authenticatedFetcher(jwt)
  );

  if (!data) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Failed to load messages</div>;
  }

  const messages = data.data;

  return (
    <div className={styles.container}>
      <HolidazeAdminHead />

      {messages.map((message) => {
        return (
          <div>
            <div>{message.name}</div>
            <div>{message.email}</div>
            <div>{message.subject}</div>
            <div>{message.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
