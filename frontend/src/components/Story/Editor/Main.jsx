import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';
import {
  authPropType, matchPropType, usersPropType, userStatusPropType,
} from '../../commonPropTypes';
import { getRoomStatus } from '../../../store/actions/story';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useWebsocket from '../../../hooks/useWebsocket';
import TwoColsContainer from './TwoColsContainer';
import RoomUsers from '../RoomUsers';
import Content from './Content';
import { mapStatusToEmoji } from '../Status';
import AnimateLoad from '../../wrappers/animateLoad';

function getPageTitle(roomTitle, status) {
  if (!status) {
    return `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }
  const emoji = mapStatusToEmoji[status];
  return `${emoji}${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
}

function Editor(props) {
  const {
    dispatchGetRoomStatus, match, roomIsFinished, auth, users, userStatus,
  } = props;
  const roomTitle = match.params.id;
  const usernames = users ? users.map((user) => user.username) : null;
  useWebsocket({
    user: auth.user,
    token: auth.token,
    roomTitle,
    roomIsFinished,
    usernames,
  });
  useEffect(() => {
    dispatchGetRoomStatus(roomTitle);
  }, [dispatchGetRoomStatus, roomTitle]);
  useEffect(() => {
    document.title = getPageTitle(roomTitle, roomIsFinished ? 'ROOM_FINISHED' : userStatus);
  }, [roomTitle, userStatus, roomIsFinished]);
  const { isLoading: userIsLoading, isAuthenticated } = auth;
  if (userIsLoading || isAuthenticated === null || roomIsFinished === null || !roomTitle) {
    return <LoadingSpinner />;
  }
  return (
    <TwoColsContainer>
      <Content roomTitle={roomTitle} />
      <RoomUsers roomTitle={roomTitle} />
    </TwoColsContainer>
  );
}

Editor.propTypes = {
  match: matchPropType.isRequired,
  dispatchGetRoomStatus: PropTypes.func.isRequired,
  auth: authPropType,
  roomIsFinished: PropTypes.bool,
  users: usersPropType,
  userStatus: userStatusPropType,
};

Editor.defaultProps = {
  auth: null,
  roomIsFinished: null,
  users: null,
  userStatus: null,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  roomIsFinished: state.story.finishedAt !== null,
  users: state.story.users,
  userStatus: state.story.userStatus,
});
const mapDispatchToProps = { dispatchGetRoomStatus: getRoomStatus };

export default connect(mapStateToProps, mapDispatchToProps)(AnimateLoad(Editor));
