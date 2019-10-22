import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';
import {
  authPropType, errorsPropType, matchPropType, usersPropType,
} from '../../commonPropTypes';
import { getRoomStatus } from '../../../store/actions/story';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInternetStatus from '../../../hooks/useInternetStatus';
import useWebsocket from '../../../hooks/useWebsocket';
import TwoColsContainer from './TwoColsContainer';
import RoomUsers from '../RoomUsers';
import Content from './Content';

function Editor(props) {
  const {
    errors, dispatchGetRoomStatus, match, roomIsFinished, auth, users,
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
    document.title = `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, [dispatchGetRoomStatus, roomTitle]);
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
  // TwoColsContainer needs two children: a side panel and main content
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
};

Editor.defaultProps = {
  auth: null,
  roomIsFinished: null,
  users: null,
  errors: null,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  roomIsFinished: state.story.finishedAt !== null,
  users: state.story.users,
  errors: state.errors,
});
const mapDispatchToProps = { dispatchGetRoomStatus: getRoomStatus };

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
