import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

export default function AlertMessage(props) {
  const {
    show: showProp, title, message,
  } = props;
  const [show, setShow] = useState(showProp);
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
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
};
AlertMessage.defaultProps = {
  title: 'Heads up!',
};
