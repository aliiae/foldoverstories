import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { leaveRoom } from '../../../../store/actions/room';

function LeaveRoomButton({ leaveRoomConnect, roomTitle }) {
  const onClick = () => {
    leaveRoomConnect(roomTitle);
  };
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip id="leaveRoomButton">
          When you leave the story, you won&apos;t be able to contribute anymore,
          but still can read the result when all the other authors finish too
        </Tooltip>
      )}
    >
      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={onClick}
        className="shadow-button"
        data-test="story-leave-button"
      >
        Leave this story
      </Button>
    </OverlayTrigger>
  );
}

LeaveRoomButton.propTypes = {
  leaveRoomConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  leaveRoomConnect: leaveRoom,
};

export default connect(null, mapDispatchToProps)(LeaveRoomButton);
