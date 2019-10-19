import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import StartNewStoryWrapper from '../../../Story/Editor/StartNewStoryWrapper';
import Logo from '../../Figure/Logo';
import Auth from './Auth';

function Header() {
  return (
    <header>
      <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <Logo data-test="logo" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={Link} exact="true" to="/how-to-play" data-test="how-to-play-link">
              How to Play
            </Nav.Link>
          </Nav>
          <Nav className="ml-md-1">
            <StartNewStoryWrapper>
              <Nav.Link>Start a New Story</Nav.Link>
            </StartNewStoryWrapper>
          </Nav>
          <Auth />
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default React.memo(Header);
