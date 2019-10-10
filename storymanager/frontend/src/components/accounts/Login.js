import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { login } from '../../store/actions/auth';

function Login(props) {
  const [form, setValues] = useState({
    username: '',
    password: '',
  });
  const {
    loginConnect, isAuthenticated, history, error,
  } = props;
  if (isAuthenticated) {
    history.goBack(); // redirects to the previous page
  }

  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (error && error.non_field_errors && error.non_field_errors[0] === 'Incorrect Credentials') {
      setShowError(true);
      setMessage('Incorrect username or password.');
    }
  }, [props]);
  const handleClose = () => {
    setShowError(false);
  };
  const errorModal = (
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

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    loginConnect(username, password);
  };

  const onChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container className="pt-3 pb-3">
      <Col md={6} className="m-auto">
        <Card>
          <Card.Body>
            <Card.Title>
              <h1 className="text-center">Login</h1>
            </Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="fromLoginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={onChange}
                  value={form.username}
                  required
                />
              </Form.Group>
              <Form.Group controlId="fromLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                  value={form.password}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">Login</Button>
              <Form.Text>
                Don&apos;t have an account?
                {' '}
                <Link to="/register">Register</Link>
              </Form.Text>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      {errorModal}
    </Container>
  );
}

Login.propTypes = {
  loginConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      non_field_errors: PropTypes.arrayOf(PropTypes.string),
    })]),
};
Login.defaultProps = {
  isAuthenticated: false,
  error: null,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, { loginConnect: login })(Login);
