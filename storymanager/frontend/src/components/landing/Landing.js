import React, { useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom';

import RoomDashboard from './RoomDashboard';
import StartButton from './StartNewStoryButton';
import { WEBSITE_TITLE } from '../../settings';
import Container from 'react-bootstrap/Container';

function WelcomeText() {
  return <>{`Welcome to ${WEBSITE_TITLE}!`}</>;
}

export default function Landing() {
  useEffect(() => {
    document.title = `${WEBSITE_TITLE}`;
  }, []);

  return (
    <>
      <Container>
        <Jumbotron className="mt-3">
          <h1 className="display-3"><WelcomeText /></h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt, nulla quis
            porttitor
            auctor, sapien.
          </p>
          <hr className="my-4 section-break" />
          <p>
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
      </Container>
      <div className="dark-bg">
        <RoomDashboard />
      </div>
    </>
  );
}
