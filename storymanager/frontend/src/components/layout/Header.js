import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const propTypes = {
  auth: PropTypes.shape(
    {
      isAuthenticated: PropTypes.boolean,
      token: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
      }),
    },
  ),
  logoutConnect: PropTypes.func.isRequired,
};
const defaultProps = {
  auth: { isAuthenticated: false, token: '', user: {} },
};

export class Header extends React.Component {
  title = 'Paper Stories';

  render() {
    const { auth, logoutConnect } = this.props;
    const { isAuthenticated, user } = auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>
            {user ? `Welcome ${user.username}` : ''}
          </strong>
        </span>
        <li className="nav-item">
          <button
            type="button"
            className="nav-link btn btn-info btn-sm text-light"
            onClick={logoutConnect}
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" href="/">{this.title}</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarTogglerDemo02"
          >
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutConnect: logout })(Header);
