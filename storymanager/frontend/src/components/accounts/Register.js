import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

const propTypes = {
  isAuthenticated: PropTypes.bool,
  registerConnect: PropTypes.func.isRequired,
  createMessageConnect: PropTypes.func.isRequired,
};
const defaultProps = {
  isAuthenticated: false,
};

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password, password2 } = this.state;
    const { createMessageConnect, registerConnect } = this.props;
    if (password !== password2) {
      createMessageConnect({ passwordsNotMatch: 'Passwords do not match' });
    } else {
      const newUser = {
        username,
        password,
      };
      registerConnect(newUser);
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password, password2 } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h1 className="text-center">Register</h1>
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
                  required
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
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password2">
                Confirm Password
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  id="password2"
                  onChange={this.onChange}
                  value={password2}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
            <p>
              Already have an account?
              {' '}
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps,
  { registerConnect: register, createMessageConnect: createMessage })(Register);
