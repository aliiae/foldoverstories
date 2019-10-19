import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { register } from '../../../store/actions/auth';

// mostly taken from https://blog.logrocket.com/building-better-react-forms-with-formik/
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        username: '',
        password: '',
        password2: '',
      },
      formErrors: {
        username: '',
        password: '',
        password2: '',
      },
      formValidity: {
        username: false,
        password: false,
        password2: '',
      },
      isSubmitting: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = (target) => {
    const { name, value } = target;
    const { formErrors, formValidity } = this.state;

    formValidity[name] = value.length > 0;
    formErrors[name] = formValidity[name] ? '' : `${name} is required and cannot be empty`;

    if (formValidity[name]) {
      if (name === 'username') {
        formValidity[name] = /^[a-z0-9_-]+$/i.test(value);
        formErrors[name] = formValidity[name]
          ? '' : 'Username can only contain Latin letters, digits, underscore _, and hyphen -';
      }
      if (name === 'password') {
        formValidity[name] = value.length >= 6;
        formErrors[name] = formValidity[name] ? '' : 'Password should contain at least 6 characters';
      }
      if (name === 'password2') {
        const { password } = this.state;
        formValidity[name] = value === password;
        formErrors[name] = formValidity[name] ? '' : 'Passwords should match';
      }
    }

    this.setState({
      formErrors,
      formValidity,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      const { dispatchRegister } = this.props;
      dispatchRegister({
        username: formValues.username,
        password: formValues.password,
      });
      this.setState({ isSubmitting: false });
    } else {
      Object.entries(formValues).forEach(([name, value]) => {
        this.handleValidation({
          name,
          value,
        });
      });
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <Form noValidate onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={formValues.username}
            onChange={this.handleChange}
            isInvalid={!!formErrors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={this.handleChange}
            isInvalid={!!formErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={formValues.password2}
            onChange={this.handleChange}
            isInvalid={formErrors.password2}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password2}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner animation="border" size="sm">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : 'Register'}
        </Button>
        <Form.Text>
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </Form.Text>
      </Form>
    );
  }
}

RegisterForm.propTypes = {
  dispatchRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = { dispatchRegister: register };
export default connect(null, mapDispatchToProps)(RegisterForm);
