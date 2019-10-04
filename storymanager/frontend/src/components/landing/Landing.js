import React, { useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

import RoomDashboard from './RoomDashboard';
import StartButton from './StartNewStoryButton';
import { WEBSITE_TITLE } from '../../settings';

export default function Landing() {
  useEffect(() => {
    document.title = `${WEBSITE_TITLE}`;
  });

  return (
    <div>
      <Jumbotron className="mt-3 paper">
        <h1 className="display-3">{`Welcome to ${WEBSITE_TITLE} !`}</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt, nulla quis
          porttitor
          auctor, sapien.
        </p>
        <hr className="my-4" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt, nulla quis
          porttitor
          auctor, sapien.
        </p>
        <p className="text-center">
          <StartButton />
        </p>
      </Jumbotron>
      <RoomDashboard />
    </div>
  );
}
