import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <LoadingSpinner />;
      }
      if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      }
      return <Component {...props} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  auth: PropTypes.shape({
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
  }),
};

PrivateRoute.defaultProps = {
  component: () => {},
  auth: {},
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
