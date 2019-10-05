import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ModalContainer({ error }) {
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (error && error.non_field_errors && error.non_field_errors[0] === 'Incorrect Credentials') {
      setShowError(true);
      setMessage('Incorrect username or password.');
    }
  }, []);
  const handleClose = () => {
    setShowError(false);
  };
  return (
    <>
      <Modal show={showError} onHide={handleClose}>
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
    </>
  );
}
