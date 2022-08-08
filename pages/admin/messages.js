import useSWR from 'swr';
import { HolidazeAdminHead } from '../../components/Head';
import styles from '../../styles/Common.module.css';
import { useAuthAPI } from '../../util/AuthAPIContext';

const Messages = () => {
  const { authGet } = useAuthAPI();

  const { data, error } = useSWR('messages', authGet);

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
            <div>{message.attributes.name}</div>
            <div>{message.attributes.email}</div>
            <div>{message.attributes.subject}</div>
            <div>{message.attributes.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
