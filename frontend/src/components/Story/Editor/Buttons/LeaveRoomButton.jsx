import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bulma-components/lib/components/button';
import { getRoomStatus, leaveRoom } from '../../../../store/actions/story';
import { websocketStatusPropType } from '../../../commonPropTypes';

export function LeaveButton(props) {
  return (
    <Button
      type="button"
      color="danger"
      className="has-tooltip-bottom"
      data-test="story-leave-button"
      data-tooltip="When you leave the story, you won&apos;t be able to contribute anymore,
          but still can read the result when all the other authors finish as well"
      {...props}
    >
      Leave this story
    </Button>
  );
}

function LeaveRoomButton(props) {
  const {
    dispatchLeaveRoom, roomTitle, websocketStatus, dispatchGetRoomStatus,
  } = props;
  const onClick = () => {
    dispatchLeaveRoom(roomTitle);
    if (websocketStatus !== 1) {
      dispatchGetRoomStatus(roomTitle);
    }
  };
  return (
    <LeaveButton onClick={onClick} />
  );
}

LeaveRoomButton.propTypes = {
  dispatchLeaveRoom: PropTypes.func.isRequired,
  dispatchGetRoomStatus: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  websocketStatus: websocketStatusPropType,
};
LeaveRoomButton.defaultProps = {
  websocketStatus: null,
};

const mapStateToProps = (state) => ({
  websocketStatus: state.websockets.ws.status,
});
const mapDispatchToProps = {
  dispatchLeaveRoom: leaveRoom,
  dispatchGetRoomStatus: getRoomStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRoomButton);
