import React from 'react';
import {Link} from "react-router-dom";

export class Register extends React.Component {
  state = {
    username: '',
    password: '',
    password2: '',
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
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

export default Register;