import { useCallback } from 'react';
import useSWR from 'swr';
import AdminNav from '../../components/AdminNav';
import Button from '../../components/Button';
import { HolidazeAdminHead } from '../../components/Head';
import Loading from '../../components/Loading';
import Page from '../../components/Page';
import Paragraph from '../../components/Paragraph';
import Title from '../../components/Title';
import styles from '../../styles/admin/Messages.module.css';
import { useAuthAPI } from '../../util/AuthAPIContext';

const Messages = () => {
  const { authGet, authDelete } = useAuthAPI();

  const { data, error, mutate } = useSWR('messages', authGet);

  const onDeleteMessage = useCallback(
    async (id) => {
      if (!window.confirm('Are your sure you wish to delete this message?')) {
        return;
      }
      const result = await authDelete('/messages', id);

      if (result) {
        mutate();
      }
    },
    [authDelete, mutate]
  );

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

      <div className={styles.Messages}>
        {messages.map((message) => {
          const {
            id,
            attributes: { name, email, subject, message: userMessage },
          } = message;

          return (
            <div className={styles.MessageRow} key={message.id}>
              <div className={styles.Name}>{name}</div>

              <div className={styles.Email}>{email}</div>

              <Paragraph className={styles.Subject}>
                Subject: {subject}
              </Paragraph>

              <Paragraph className={styles.Message}>{userMessage}</Paragraph>

              <div className={styles.DeleteMessage}>
                <Button color="red" onClick={() => onDeleteMessage(id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default Messages;
