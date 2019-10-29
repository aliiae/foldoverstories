import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Field, Control, Label, Input, Help,
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import { Link } from 'react-router-dom';
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

  handleChange({ target }) {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  }

  handleValidation(target) {
    const { name, value } = target;
    const { formValues, formErrors, formValidity } = this.state;

    formValidity[name] = value.length > 0;
    formErrors[name] = formValidity[name] ? '' : 'This field is required';

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
        formValidity[name] = value === formValues.password;
        formErrors[name] = formValidity[name] ? '' : 'Passwords should match';
      }
    }

    this.setState({
      formErrors,
      formValidity,
    });
  }

  handleSubmit(e) {
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
  }

  render() {
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <div>
        <Field>
          <Label>Username</Label>
          <Control>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={formValues.username}
              onChange={this.handleChange}
              color={formErrors.username ? 'danger' : null}
            />
          </Control>
          <Help color="danger">
            {formErrors.username}
          </Help>
        </Field>
        <Field>
          <Label>Password</Label>
          <Control>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={this.handleChange}
              color={(formErrors.password ? 'danger' : null)
              || (formValues.password && !formErrors.password ? 'success' : null)}
            />
            <Help color="danger">
              {formErrors.password}
            </Help>
          </Control>
        </Field>
        <Field>
          <Label>Confirm Password</Label>
          <Control>
            <Input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={formValues.password2}
              onChange={this.handleChange}
              color={(formErrors.password2 ? 'danger' : null)
              || (formValues.password2 && !formErrors.password2 ? 'success' : null)}
            />
            <Help color="danger">
              {formErrors.password2}
            </Help>
          </Control>
        </Field>
        <Button
          color="primary"
          type="submit"
          state={isSubmitting ? 'loading' : null}
          disabled={isSubmitting}
          onClick={this.handleSubmit}
        >
          Register
        </Button>
        <p className="is-size-7">
          Already have an account?
          {' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  dispatchRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = { dispatchRegister: register };

export default connect(null, mapDispatchToProps)(RegisterForm);
