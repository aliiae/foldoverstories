import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bulma-components/lib/components/navbar';
import StartNewStoryWrapper from '../../../Story/Editor/StartNewStoryWrapper';
import AuthButtons from './AuthButtons';

const Menu = () => (
  <Navbar.Menu>
    <Navbar.Container position="start">
      <Navbar.Item renderAs="div">
        <Link to="/how-to-play">
          <Navbar.Link arrowless>How to Play</Navbar.Link>
        </Link>
      </Navbar.Item>
      <Navbar.Item renderAs="div">
        <StartNewStoryWrapper>
          <Navbar.Link arrowless>Start a New Story</Navbar.Link>
        </StartNewStoryWrapper>
      </Navbar.Item>
    </Navbar.Container>
    <Navbar.Container position="end">
      <AuthButtons />
    </Navbar.Container>
  </Navbar.Menu>
);

export default Menu;
