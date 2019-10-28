import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SvgFoldoverLogo from './SvgFoldoverLogo';
import { clearRoomTitle } from '../../../store/actions/story';

function Logo({ dispatchClearRoomTitle }) {
  return (
    <Link to="/" onClick={dispatchClearRoomTitle}>
      <div className="is-flex">
        <SvgFoldoverLogo width="32" height="32" />
        <span className="logo-text">
          <span>FOLD</span>
          <span>-OVER</span>
        </span>
        <span>STORIES</span>
      </div>
    </Link>
  );
}

Logo.propTypes = {
  dispatchClearRoomTitle: PropTypes.func.isRequired,
};
const mapDispatchToProps = { dispatchClearRoomTitle: clearRoomTitle };

export default connect(null, mapDispatchToProps)(React.memo(Logo));
