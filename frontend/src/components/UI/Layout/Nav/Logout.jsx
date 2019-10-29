import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar';
import { logout } from '../../../../store/actions/auth';

function Logout({ username, dispatchLogout }) {
  const history = useHistory();

  const onClick = () => {
    dispatchLogout().then(() => {
      history.push('/');
    });
  };

  return (
    <>
      <Navbar.Item renderAs="div" className="has-text-centered-touch">
        <strong className="nav-welcome-text">
          {`Welcome, ${username}!`}
        </strong>
      </Navbar.Item>
      <Navbar.Item renderAs="div" className="has-text-centered-touch">
        <Button type="button" color="light" onClick={onClick}>Logout</Button>
      </Navbar.Item>
    </>
  );
}

Logout.propTypes = {
  username: PropTypes.string.isRequired,
  dispatchLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = { dispatchLogout: logout };

export default withRouter(connect(null, mapDispatchToProps)(Logout));
