import useSWR from 'swr';
import { HolidazeAdminHead } from '../../components/Head';
import styles from '../../styles/Common.module.css';
import { useAuth } from '../../util/AuthContext';

const Messages = () => {
  const { authFetcher } = useAuth();

  const { data, error } = useSWR('messages', authFetcher);

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
          <div key={message.id}>
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
