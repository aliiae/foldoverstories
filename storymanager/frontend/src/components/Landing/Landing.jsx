import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { WEBSITE_TITLE } from '../../settings';
import RoomDashboard from './RoomDashboard';
import WelcomeJumbotron from './WelcomeJumbotron';
import { authPropType } from '../commonPropTypes';


function Landing({ auth }) {
  useEffect(() => {
    document.title = `${WEBSITE_TITLE}`;
  }, []);
  return (
    <>
      <Container className="align-center">
        <WelcomeJumbotron />
      </Container>
      {auth && auth.isAuthenticated && <RoomDashboard />}
    </>
  );
}

Landing.propTypes = { auth: authPropType };
Landing.defaultProps = { auth: null };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
