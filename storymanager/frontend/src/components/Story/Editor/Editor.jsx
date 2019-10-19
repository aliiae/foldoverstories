import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';
import { authPropType, matchPropType, usersPropType } from '../../commonPropTypes';
import { getRoomStatus } from '../../../store/actions/room';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInternetStatus from '../../../hooks/useInternetStatus';
import useWebsocket from '../../../hooks/useWebsocket';
import TwoColsContainer from './TwoColsContainer';
import RoomUsers from '../RoomUsers';
import Content from './Content';

function Editor(props) {
  const {
    dispatchGetRoomStatus, match, roomIsFinished, auth, users,
  } = props;
  const { isLoading: userIsLoading, isAuthenticated } = auth;
  const roomTitle = match.params.id;
  const { isOnline } = useInternetStatus();
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
};

Editor.defaultProps = {
  auth: null,
  roomIsFinished: null,
  users: null,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  roomIsFinished: state.room.finishedAt !== null,
  users: state.room.users,
});
const mapDispatchToProps = { dispatchGetRoomStatus: getRoomStatus };

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
