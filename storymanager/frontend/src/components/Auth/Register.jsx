import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Formik } from 'formik';

import { string, object as yupObject, ref as yupRef } from 'yup';
import { register } from '../../store/actions/auth';


function Register(props) {
  const { registerConnect, isAuthenticated, error } = props;
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (error && error.username) {
      setShowError(true);
      setMessage('Sorry, this username is already taken. Please choose another one.');
    }
  }, [error]);
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
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

  const onSubmit = ({ username, password }) => {
    registerConnect({ username, password });
  };

  const schema = yupObject({
    username: string().required('Please choose a username'),
    password: string().min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    password2: string().oneOf([yupRef('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });
  const formik = (
    <Formik
      initialValues={{
        username: '',
        password: '',
        password2: '',
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
      render={(
        {
          errors, handleChange, handleSubmit, values, status,
        },
      ) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username || (!!status && !!status.username)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
              {status && status.username ? status.username : ''}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={values.password2}
              onChange={handleChange}
              isInvalid={!!errors.password2}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password2}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">Register</Button>
          <Form.Text>
            Already have an account?
            {' '}
            <Link to="/login">Login</Link>
          </Form.Text>
        </Form>
      )}
    />
  );

  return (
    <Container className="pt-3 pb-3">
      <Col md={6} className="m-auto">
        <Card>
          <Card.Body>
            <Card.Title>
              <h1 className="text-center">Register</h1>
            </Card.Title>
            {formik}
          </Card.Body>
        </Card>
      </Col>
      {errorModal}
    </Container>
  );
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  registerConnect: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
    username: PropTypes.arrayOf(PropTypes.string),
  })]),
};
Register.defaultProps = {
  isAuthenticated: false,
  error: null,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps,
  { registerConnect: register })(Register);
