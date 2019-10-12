import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { WEBSITE_TITLE } from '../../settings';
import RoomDashboard from './RoomDashboard';
import WelcomeJumbotron from './WelcomeJumbotron';


export default function Landing() {
  useEffect(() => {
    document.title = `${WEBSITE_TITLE}`;
  }, []);
  return (
    <>
      <Container className="align-center">
        <WelcomeJumbotron />
      </Container>
      <RoomDashboard />
    </>
  );
}
