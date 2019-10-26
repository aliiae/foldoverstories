import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import StartButton from '../Story/Editor/Buttons/StartButton';
import TypistWithoutCursor from '../UI/TypistWithoutCursor';

function WelcomeJumbotron() {
  return (
    <Jumbotron className="text-center">
      <h1 className="display-3">Welcome to Fold&#8209;over Stories</h1>
      <TypistWithoutCursor>
        <p className="lead text-muted text-monospace text-center">
          a creative, collaborative, storytelling game
        </p>
      </TypistWithoutCursor>
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

export default React.memo(WelcomeJumbotron);
