import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { WEBSITE_TITLE } from '../../settings';
import RoomDashboard from './RoomDashboard/RoomDashboard';
import WelcomeJumbotron from './WelcomeJumbotron';
import { authPropType } from '../commonPropTypes';
import AnimateLoad from '../UI/AnimateLoad';

const AnimatedRoomDashboard = AnimateLoad(RoomDashboard);
const AnimatedWelcome = AnimateLoad(WelcomeJumbotron);

function Landing({ auth }) {
  useEffect(() => {
    document.title = `${WEBSITE_TITLE}`;
  }, []);
  return (
    <>
      <Container className="align-center">
        <AnimatedWelcome />
      </Container>
      {auth && auth.isAuthenticated && <AnimatedRoomDashboard />}
    </>
  );
}

Landing.propTypes = { auth: authPropType };
Landing.defaultProps = { auth: null };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
