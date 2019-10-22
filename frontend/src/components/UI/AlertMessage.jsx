import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

function AlertMessage(props) {
  const { title, message } = props;
  const [show, setShow] = useState(true);
  const onHide = () => {
    setShow(false);
  };
  return (
    <Alert show={show} onClose={onHide} variant="warning" dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
};
AlertMessage.defaultProps = {
  title: 'Heads up!',
};

export default AlertMessage;
