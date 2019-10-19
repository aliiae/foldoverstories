import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ErrorModal({ error }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (error && error.username) {
      setShow(true);
      setMessage('Sorry, this username is already taken. Please choose another one.');
    }
  }, [error]);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Oops!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ErrorModal.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
    username: PropTypes.arrayOf(PropTypes.string),
  })]),
};
ErrorModal.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

export default connect(mapStateToProps)(ErrorModal);
