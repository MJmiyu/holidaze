import useSWR from 'swr';
import AdminNav from '../../components/AdminNav';
import { HolidazeAdminHead } from '../../components/Head';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import Title from '../../components/Title';
import styles from '../../styles/admin/Messages.module.css';
import { useAuthAPI } from '../../util/AuthAPIContext';

const Messages = () => {
  const { authGet } = useAuthAPI();

  const { data, error } = useSWR('messages', authGet);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <div>Failed to load messages</div>;
  }

  const messages = data.data;

  return (
    <Page>
      <HolidazeAdminHead />

      <AdminNav />

      <Title>Messages</Title>

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
    </Page>
  );
};

export default Messages;
