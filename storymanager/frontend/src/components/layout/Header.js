import React from 'react';
import {Link} from "react-router-dom";

export class Header extends React.Component {
  title = "Paper Stories";

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">{this.title}</a>
          <button className="navbar-toggler" type="button"
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse"
               id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;