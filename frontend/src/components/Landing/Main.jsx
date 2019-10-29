import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Columns from 'react-bulma-components/lib/components/columns';
import { WEBSITE_TITLE } from '../../settings';
import RoomDashboard from './RoomDashboard/RoomDashboard';
import WelcomeHero from './WelcomeHero';
import { authPropType } from '../commonPropTypes';
import AnimateLoad from '../wrappers/animateLoad';

function Landing({ auth }) {
  useEffect(() => {
    document.title = `${WEBSITE_TITLE}`;
  }, []);
  return (
    <>
      <Columns centered className="is-vcentered full-page is-marginless">
        <Columns.Column size={8}>
          <WelcomeHero />
          {auth && auth.isAuthenticated && (
            <RoomDashboard />
          )}
        </Columns.Column>
      </Columns>
    </>
  );
}

Landing.propTypes = { auth: authPropType };
Landing.defaultProps = { auth: null };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AnimateLoad(Landing));
