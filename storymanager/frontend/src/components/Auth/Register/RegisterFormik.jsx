import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { object as yupObject, ref as yupRef, string } from 'yup';
import { Formik } from 'formik';
import { register } from '../../../store/actions/auth';
import RegisterForm from './RegisterForm';

export function RegisterFormik({ dispatchRegister }) {
  const onSubmit = ({ username, password }) => {
    dispatchRegister({
      username,
      password,
    });
  };
  const schema = yupObject({
    username: string()
      .required('Please choose a username'),
    password: string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    password2: string()
      .oneOf([yupRef('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        password2: '',
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
      render={(formikProps) => (
        <RegisterForm {...formikProps} />
      )}
    />
  );
}

RegisterFormik.propTypes = {
  dispatchRegister: PropTypes.func.isRequired,
};
const mapDispatchToProps = { dispatchRegister: register };

export default connect(null, mapDispatchToProps)(RegisterFormik);
