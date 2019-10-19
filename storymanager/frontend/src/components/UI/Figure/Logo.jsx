import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import SvgFoldoverLogo from './SvgFoldoverLogo';
import { clearRoomTitle } from '../../../store/actions/room';

function Logo({ dispatchClearRoomTitle }) {
  return (
    <Navbar.Brand
      as={Link}
      exact="true"
      to="/"
      className="align-items-center"
      onClick={dispatchClearRoomTitle}
    >
      <div style={{ display: 'flex' }}>
        <SvgFoldoverLogo width="32" height="32" />
        <span className="mr-1 ml-1 logo-text">
          <span>FOLD</span>
          <span>-OVER</span>
        </span>
        <span>STORIES</span>
      </div>
    </Navbar.Brand>
  );
}

Logo.propTypes = {
  dispatchClearRoomTitle: PropTypes.func.isRequired,
};
const mapDispatchToProps = { dispatchClearRoomTitle: clearRoomTitle };

export default connect(null, mapDispatchToProps)(Logo);
