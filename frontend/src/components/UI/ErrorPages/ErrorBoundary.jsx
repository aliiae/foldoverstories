import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { errorsPropType } from '../../commonPropTypes';
import PageNotFound404 from './PageNotFound404';
import Login from '../../Auth/Login';
import ServerError500 from './ServerError500';

function ErrorBoundary({ children, errors }) {
  if (errors) {
    if (errors.status === 404) {
      return <PageNotFound404 />;
    }
    if (errors.status === 401) {
      return <Login />;
    }
    if (errors.status === 500) {
      return <ServerError500 />;
    }
  }
  return children;
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  errors: errorsPropType,
};
ErrorBoundary.defaultProps = {
  children: null,
  errors: null,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(ErrorBoundary);
