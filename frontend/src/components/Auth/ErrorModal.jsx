import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bulma-components/lib/components/modal';
import { clearErrors } from '../../store/actions/messages';

function ErrorModal({ error, dispatchClearErrors }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (error && error.nonFieldErrors && error.nonFieldErrors[0] === 'Incorrect Credentials') {
      setShow(true);
      setMessage('Incorrect username or password.');
    } else if (error && error.username) {
      setShow(true);
      setMessage('Sorry, this username is already taken. Please choose another one.');
    }
  }, [error]);
  const handleClose = () => {
    setShow(false);
    dispatchClearErrors();
  };

  return (
    <Modal show={show} onClose={handleClose} closeOnBlur>
      <Modal.Card>
        <Modal.Card.Head onClose={handleClose}>
          <Modal.Card.Title>Oops!</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>{message}</Modal.Card.Body>
        <Modal.Card.Foot />
      </Modal.Card>
    </Modal>
  );
}

ErrorModal.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
    username: PropTypes.arrayOf(PropTypes.string),
  }), PropTypes.shape({
    nonFieldErrors: PropTypes.arrayOf(PropTypes.string),
  })]),
  dispatchClearErrors: PropTypes.func.isRequired,
};
ErrorModal.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
});
const mapDispatchToProps = {
  dispatchClearErrors: clearErrors,
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
