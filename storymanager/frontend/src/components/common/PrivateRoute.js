import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      }
      if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      }
      return <Component {...props} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(React.Component),
  auth: PropTypes.objectOf(PropTypes.object),
};

PrivateRoute.defaultProps = {
  component: {},
  auth: {},
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
