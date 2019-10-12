import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';
import { formatTimeStampTimeOnly } from '../dateFormatters';
import { NOTIFICATION_DURATION } from '../../settings';

const NotificationToast = React.memo((props) => {
  const [show, setShow] = useState(true);
  const { text, time, remove, id } = props;
  return (
    <Toast
      onClose={() => {
        setShow(false);
        remove(id);
      }}
      show={show}
      delay={NOTIFICATION_DURATION}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto">Heads up!</strong>
        <small>{formatTimeStampTimeOnly(time)}</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
});

NotificationToast.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  remove: PropTypes.func.isRequired,
};

export default NotificationToast;
