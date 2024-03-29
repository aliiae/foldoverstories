import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bulma-components/lib/components/navbar';
import StartNewStoryWrapper from '../../../Story/Editor/StartNewStoryWrapper';
import AuthButtons from './AuthButtons';


export default function Menu() {
  return (
    <Navbar.Menu>
      <Navbar.Container position="start">
        <Navbar.Item renderAs="div" className="has-text-weight-bold">
          <Link to="/how-to-play">
            <Navbar.Link arrowless className="question-button">How to Play</Navbar.Link>
          </Link>
        </Navbar.Item>
        <Navbar.Item renderAs="div" className="has-text-weight-bold">
          <StartNewStoryWrapper>
            <Navbar.Link arrowless className="start-button">Start a New Story</Navbar.Link>
          </StartNewStoryWrapper>
        </Navbar.Item>
      </Navbar.Container>
      <Navbar.Container position="end">
        <AuthButtons />
      </Navbar.Container>
    </Navbar.Menu>
  );
}
