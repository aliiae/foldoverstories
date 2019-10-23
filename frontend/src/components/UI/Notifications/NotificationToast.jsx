import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';
import { formatTimeStampTimeOnly } from '../../dateFormatters';
import { NOTIFICATION_DURATION, TITLE_DELIMITER } from '../../../settings';

const NotificationToast = (props) => {
  const [show, setShow] = useState(true);
  const {
    message, time, removeNotification, id, roomTitle,
  } = props;
  const username = 'username' in message ? message.username : null;
  let text;
  let title;
  switch (message.type) {
    case 'room.text':
      text = (
        <>
          <strong>{username}</strong> wrote to <strong>{roomTitle}</strong>
        </>
      );
      title = `${roomTitle} ${TITLE_DELIMITER} new text`;
      break;
    case 'room.leave':
      text = (
        <>
          <strong>{username}</strong> finished their part in <strong>{roomTitle}</strong>
        </>
      );
      title = `${roomTitle} ${TITLE_DELIMITER} user finished`;
      break;
    case 'room.join':
      text = (
        <>
          <strong>{username}</strong> joined <strong>{roomTitle}</strong>
        </>
      );
      title = `${roomTitle} ${TITLE_DELIMITER} user joined`;
      break;
    case 'room.finish':
      text = (
        <>
          <strong>{roomTitle}</strong> is finished and ready to be read!
        </>
      );
      title = `${roomTitle} is finished`;
      break;
    default:
      text = `${roomTitle} has been updated`;
      title = roomTitle;
  }
  return (
    <Toast
      onClose={() => {
        setShow(false);
        removeNotification(id);
      }}
      show={show}
      delay={NOTIFICATION_DURATION}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto">{title}</strong>
        <small>{formatTimeStampTimeOnly(time)}</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
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
