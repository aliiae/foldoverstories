import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { WEBSITE_TITLE } from '../../settings';
import StartButton from './StartNewStoryButton';

function WelcomeText() {
  return <>{`Welcome to ${WEBSITE_TITLE}!`}</>;
}

export default function WelcomeJumbotron() {
  return (
    <Jumbotron className="text-center">
      <h1 className="display-3"><WelcomeText /></h1>
      <hr className="my-4 section-break" />
      <p className="lead text-center">
        Check out
        {' '}
        <Link to="/how-to-play">how to play</Link>
        {' '}
        and start your fold-over story, by yourself or with friends!
      </p>
      <p className="text-center">
        <StartButton />
      </p>
    </Jumbotron>
  );
}
