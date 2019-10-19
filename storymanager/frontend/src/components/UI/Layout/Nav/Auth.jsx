import React from 'react';
import { connect } from 'react-redux';
import RegisterLogin from './RegisterLogin';
import Logout from './Logout';
import { authDefaultPropType, authPropType } from '../../../commonPropTypes';

function Auth({ auth }) {
  if (!auth || auth.isLoading) {
    return null;
  }
  if (auth.isAuthenticated) {
    return <Logout username={auth.user.username} />;
  }
  return (
    <RegisterLogin />
  );
}

Auth.propTypes = {
  auth: authPropType,
};
Auth.defaultProps = {
  auth: authDefaultPropType,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Auth);
