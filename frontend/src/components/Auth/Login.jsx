import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bulma-components/lib/components/card';
import Heading from 'react-bulma-components/lib/components/heading';
import {
  Field, Control, Label, Input,
} from 'react-bulma-components/lib/components/form';

import Button from 'react-bulma-components/lib/components/button';
import { login } from '../../store/actions/auth';
import AnimateLoad from '../wrappers/animateLoad';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../settings';
import CardContainer from './CardContainer';

function Login(props) {
  const [form, setValues] = useState({
    username: '',
    password: '',
  });
  const { dispatchLogin, isAuthenticated } = props;
  const history = useHistory();
  if (isAuthenticated) {
    history.goBack(); // redirects to the previous page
  }
  useEffect(() => {
    document.title = `Login ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatchLogin(username, password);
  };

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CardContainer>
      <Card.Content>
        <Heading>Login</Heading>
        <div>
          <Field>
            <Label>Username</Label>
            <Control>
              <Input
                type="text"
                placeholder="Username"
                name="username"
                onChange={onChange}
                value={form.username}
                required
              />
            </Control>
          </Field>
          <Field>
            <Label>Password</Label>
            <Control>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
                value={form.password}
                required
              />
            </Control>
          </Field>
          <Button color="primary" type="submit" onClick={onSubmit}>Login</Button>
          <p className="is-size-7">
            Don&apos;t have an account?
            {' '}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </Card.Content>
    </CardContainer>
  );
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
Login.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = { dispatchLogin: login };

export default connect(mapStateToProps, mapDispatchToProps)(AnimateLoad(Login));
