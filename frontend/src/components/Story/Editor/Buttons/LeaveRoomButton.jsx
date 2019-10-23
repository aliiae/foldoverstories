import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { leaveRoom } from '../../../../store/actions/story';

export function LeaveButton(props) {
  return (
    <Button
      type="button"
      variant="danger"
      size="sm"
      className="shadow-button"
      data-test="story-leave-button"
      {...props}
    >
      Leave this story
    </Button>
  );
}

function LeaveRoomButton({ dispatchLeaveRoom, roomTitle }) {
  const onClick = () => {
    dispatchLeaveRoom(roomTitle);
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
      <LeaveButton onClick={onClick} />
    </OverlayTrigger>
  );
}

LeaveRoomButton.propTypes = {
  dispatchLeaveRoom: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  dispatchLeaveRoom: leaveRoom,
};

export default connect(null, mapDispatchToProps)(LeaveRoomButton);
