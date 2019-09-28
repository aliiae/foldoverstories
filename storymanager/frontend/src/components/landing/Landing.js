import React from 'react';
import RoomDashboard from './RoomDashboard';
import StartButton from './StartNewStoryButton';

export default function Landing() {
  const title = 'Paper Stories';
  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-3">
          {`Welcome to ${title} !`}
        </h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nam tincidunt, nulla quis porttitor auctor,
          sapien.
        </p>
        <hr className="my-4" />
        <p>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nam tincidunt, nulla quis porttitor auctor,
          sapien.
        </p>
        <p className="lead text-center">
          <StartButton />
        </p>
      </div>
      <RoomDashboard />
    </div>
  );
}
