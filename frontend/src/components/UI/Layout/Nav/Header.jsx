import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import StartNewStoryWrapper from '../../../Story/Editor/StartNewStoryWrapper';
import Logo from '../../Figure/Logo';
import AuthButtons from './AuthButtons';

function Header() {
  return (
    <header>
      <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <Logo data-test="logo" />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Item>
              <LinkContainer exact to="/how-to-play">
                <Nav.Link data-test="how-to-play-link">
                  How to Play
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item className="ml-sm-1">
              <StartNewStoryWrapper>
                <Nav.Link>Start a New Story</Nav.Link>
              </StartNewStoryWrapper>
            </Nav.Item>
          </Nav>
          <AuthButtons />
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default React.memo(Header);
