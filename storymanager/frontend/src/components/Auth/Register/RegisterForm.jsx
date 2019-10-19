import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function RegisterForm(props) {
  const {
    errors, handleChange, handleSubmit, values, status,
  } = props;
  return (
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
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    password2: PropTypes.string,
  })]).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    password2: PropTypes.string,
  })]).isRequired,
  status: PropTypes.objectOf(PropTypes.object),
};
RegisterForm.defaultProps = { status: null };
