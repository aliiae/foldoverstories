import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notification from 'react-bulma-components/lib/components/notification';
import Button from 'react-bulma-components/lib/components/button';

function AlertMessage(props) {
  const { message } = props;
  const [show, setShow] = useState(true);
  const close = () => setShow(false);
  return (
    <Notification className={!show ? 'is-hidden' : ''} color="warning">
      {message}
      <Button remove onClick={close} />
    </Notification>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AlertMessage;
