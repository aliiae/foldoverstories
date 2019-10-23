import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';
import {
  authPropType, errorsPropType, matchPropType, usersPropType, userStatusPropType,
} from '../../commonPropTypes';
import { getRoomStatus } from '../../../store/actions/story';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInternetStatus from '../../../hooks/useInternetStatus';
import useWebsocket from '../../../hooks/useWebsocket';
import TwoColsContainer from './TwoColsContainer';
import RoomUsers from '../RoomUsers';
import Content from './Content';
import { mapStatusToEmoji } from '../Status';

function getPageTitle(roomTitle, status) {
  if (!status) {
    return `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }
  const emoji = mapStatusToEmoji[status];
  return `${emoji}${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
}

function Editor(props) {
  const {
    errors, dispatchGetRoomStatus, match, roomIsFinished, auth, users, userStatus,
  } = props;
  const { isOnline } = useInternetStatus();
  const roomTitle = match.params.id;
  const usernames = users ? users.map((user) => user.username) : null;
  useWebsocket({
    isOnline,
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

  if (errors) {
    if (errors.status === 404) {
      return <Redirect to="/not-found" />;
    }
    if (errors.status === 401) {
      return <Redirect to="/login" />;
    }
  }
  const { isLoading: userIsLoading, isAuthenticated } = auth;
  if (userIsLoading || isAuthenticated === null || roomIsFinished === null || !roomTitle) {
    return <LoadingSpinner />;
  }
  // TwoColsContainer needs two ordered children: a side panel and main content
  return (
    <TwoColsContainer>
      <RoomUsers roomTitle={roomTitle} />
      <Content roomTitle={roomTitle} />
    </TwoColsContainer>
  );
}

Editor.propTypes = {
  match: matchPropType.isRequired,
  dispatchGetRoomStatus: PropTypes.func.isRequired,
  auth: authPropType,
  roomIsFinished: PropTypes.bool,
  users: usersPropType,
  errors: errorsPropType,
  userStatus: userStatusPropType,
};

Editor.defaultProps = {
  auth: null,
  roomIsFinished: null,
  users: null,
  errors: null,
  userStatus: null,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  roomIsFinished: state.story.finishedAt !== null,
  users: state.story.users,
  errors: state.errors,
  userStatus: state.story.userStatus,
});
const mapDispatchToProps = { dispatchGetRoomStatus: getRoomStatus };

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
