import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const propTypes = {
  loginConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const defaultProps = {
  isAuthenticated: false,
};

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { loginConnect } = this.props;
    const { username, password } = this.state;
    loginConnect(username, password);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/story" />;
    }
    const { username, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h1 className="text-center">Login</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                Username
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  onChange={this.onChange}
                  value={username}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={this.onChange}
                  value={password}
                />
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <p>
              Don&apos;t have an account?&nbsp;
              <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginConnect: login })(Login);
