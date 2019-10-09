import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Container from 'react-bootstrap/Container';
import { WEBSITE_TITLE } from '../../settings';
import RoomDashboard from './RoomDashboard';
import WelcomeJumbotron from './WelcomeJumbotron';


export default function Landing() {
  useEffect(() => {
    document.title = `${WEBSITE_TITLE}`;
  }, []);
  let location = useLocation();
  console.log(location.key);
  return (
    <>
      <Container className="align-center">
        <WelcomeJumbotron />
      </Container>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
        >
          <RoomDashboard />
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
