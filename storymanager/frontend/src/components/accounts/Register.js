import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from "../../actions/auth";
import {createMessage} from '../../actions/messages';

export class Register extends React.Component {
  state = {
    username: '',
    password: '',
    password2: '',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    createMessage: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    const {username, password, password2} = this.state;
    if (password !== password2) {
      this.props.createMessage({passwordsNotMatch: 'Passwords do not match'})
    } else {
      const newUser = {
        username,
        password
      };
      this.props.register(newUser);
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>
    }
    const {username, password, password2} = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h1 className="text-center">Register</h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text"
                     className="form-control"
                     name="username"
                     id="username"
                     onChange={this.onChange}
                     value={username}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                     className="form-control"
                     name="password"
                     id="password"
                     onChange={this.onChange}
                     value={password}/>
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input type="password"
                     className="form-control"
                     name="password2"
                     id="password2"
                     onChange={this.onChange}
                     value={password2}/>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, createMessage})(Register);