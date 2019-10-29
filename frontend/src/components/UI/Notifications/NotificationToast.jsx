import React, { useCallback, useEffect } from 'react';
import Message from 'react-bulma-components/lib/components/message';
import Button from 'react-bulma-components/lib/components/button';
import PropTypes from 'prop-types';
import { formatTimeStampTimeOnly } from '../../dateFormatters';
import { NOTIFICATION_DURATION } from '../../../settings';

const NotificationToast = (props) => {
  const {
    message, time, removeNotification, id, roomTitle,
  } = props;
  const close = useCallback(() => {
    removeNotification(id);
  }, [id, removeNotification]);
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, NOTIFICATION_DURATION);
    return () => clearTimeout(timer);
  }, [close]);

  const username = 'username' in message ? message.username : null;
  const notificationMessage = {};
  switch (message.type) {
    case 'room.text':
      notificationMessage.text = (
        <>
          <strong>{username}</strong> wrote to <strong>{roomTitle}</strong>
        </>
      );
      notificationMessage.color = 'info';
      break;
    case 'room.leave':
      notificationMessage.text = (
        <>
          <strong>{username}</strong> finished their part in <strong>{roomTitle}</strong>
        </>
      );
      notificationMessage.color = 'danger';
      break;
    case 'room.join':
      notificationMessage.text = (
        <>
          <strong>{username}</strong> joined <strong>{roomTitle}</strong>
        </>
      );
      notificationMessage.color = 'warning';
      break;
    case 'room.finish':
      notificationMessage.text = (
        <>
          <strong>{roomTitle}</strong> is finished and ready to be read!
        </>
      );
      notificationMessage.color = 'success';
      break;
    default:
      notificationMessage.text = `${roomTitle} has been updated`;
      notificationMessage.color = 'primary';
  }
  return (
    <Message color={notificationMessage.color}>
      <Message.Header className="notification-header">
        <strong>{roomTitle}</strong>
        <small>{formatTimeStampTimeOnly(time)}</small>
        <Button remove onClick={close} />
      </Message.Header>
      <Message.Body>{notificationMessage.text}</Message.Body>
    </Message>
  );
};

NotificationToast.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.shape({
    type: PropTypes.string.isRequired,
    username: PropTypes.string,
  }).isRequired,
  roomTitle: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  removeNotification: PropTypes.func.isRequired,
};

export default React.memo(NotificationToast);
