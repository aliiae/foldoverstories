import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { WEBSITE_TITLE } from '../../settings';
import RoomDashboard from './RoomDashboard/RoomDashboard';
import WelcomeJumbotron from './WelcomeJumbotron';
import { authPropType } from '../commonPropTypes';
import AnimateLoad from '../wrappers/animateLoad';

const AnimatedRoomDashboard = AnimateLoad(RoomDashboard);
const AnimatedWelcome = AnimateLoad(WelcomeJumbotron);

function Landing({ auth }) {
  useEffect(() => {
    document.title = `${WEBSITE_TITLE}`;
  }, []);
  return (
    <>
      <div className="full-page">
        <div className="align-center">
          <AnimatedWelcome />
        </div>
        {auth && auth.isAuthenticated && <AnimatedRoomDashboard />}
      </div>
    </>
  );
}

Landing.propTypes = { auth: authPropType };
Landing.defaultProps = { auth: null };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
