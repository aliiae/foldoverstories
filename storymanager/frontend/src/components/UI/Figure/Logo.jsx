import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import SvgFoldoverLogo from './SvgFoldoverLogo';
import { clearRoomTitle } from '../../../store/actions/room';

function Logo({ clearRoomTitleConnect }) {
  return (
    <LinkContainer to="/" onClick={clearRoomTitleConnect}>
      <Navbar.Brand className="align-items-center">
        <div style={{ display: 'flex' }}>
          <SvgFoldoverLogo width="32" height="32" />
          <span className="mr-1 ml-1 logo-text">
            <span>FOLD</span>
            <span>-OVER</span>
          </span>
          <span>STORIES</span>
        </div>
      </Navbar.Brand>
    </LinkContainer>
  );
}

Logo.propTypes = {
  clearRoomTitleConnect: PropTypes.func.isRequired,
};

export default connect(null, { clearRoomTitleConnect: clearRoomTitle })(Logo);
