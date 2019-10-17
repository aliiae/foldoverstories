import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import React from 'react';

export default function AlertMessage(props) {
  const {
    show, onHide, title, message,
  } = props;
  return (
    <Alert show={show} onClose={onHide} variant="warning" dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}

AlertMessage.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string,
};
AlertMessage.defaultProps = {
  title: 'Heads up!',
};
