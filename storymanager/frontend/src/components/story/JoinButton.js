import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUserIntoRoom } from '../../actions/room';

function JoinButton(props) {
  const {
    addUserIntoRoomConnect, roomTitle, isAuthenticated, sendWsMessage,
  } = props;
  const onClick = () => {
    addUserIntoRoomConnect(roomTitle);
    sendWsMessage(JSON.stringify({ msg_type: 'room.join', command: 'join', room: roomTitle }));
  };

  return (
    <>
      <Link
        className="btn btn-warning btn-sm mt-3 shadow-button"
        onClick={onClick}
        to={isAuthenticated ? `/story/${roomTitle}` : '/login'}
      >
        Join
      </Link>
    </>
  );
}

JoinButton.propTypes = {
  addUserIntoRoomConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  sendWsMessage: PropTypes.func.isRequired,
};

JoinButton.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => ({
  usernames: state.story.usernames,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addUserIntoRoomConnect: addUserIntoRoom })(JoinButton);
