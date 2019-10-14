import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';
import { formatTimeStampTimeOnly } from '../dateFormatters';
import { NOTIFICATION_DURATION } from '../../settings';

const NotificationToast = React.memo((props) => {
  const [show, setShow] = useState(true);
  const {
    text, title, time, removeNotification, id,
  } = props;
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
});

NotificationToast.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  remove: PropTypes.func.isRequired,
};

NotificationToast.defaultProps = {
  title: 'Heads up!',
};

export default NotificationToast;
