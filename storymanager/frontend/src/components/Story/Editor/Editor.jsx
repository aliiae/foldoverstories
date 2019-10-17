import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';
import { authPropType, matchPropType, usersPropType } from '../../commonPropTypes';
import { getRoomStatus } from '../../../store/actions/room';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInternetStatus from '../../../hooks/useInternetStatus';
import useWebsocket from '../../../hooks/useWebsocket';
import EditorContainerTwoCols from './EditorContainerTwoCols';
import EditorContent from './EditorContent';
import RoomUsers from '../RoomUsers';

function Editor(props) {
  const {
    getRoomStatusConnect, match, roomIsFinished, auth, users,
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
    getRoomStatusConnect(roomTitle);
    document.title = `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, [getRoomStatusConnect, roomTitle]);
  if (userIsLoading || isAuthenticated === null || roomIsFinished === null || !roomTitle) {
    return <LoadingSpinner />;
  }
  // EditorContainerTwoCols needs two children: a side panel and main content
  return (
    <EditorContainerTwoCols>
      <RoomUsers roomTitle={roomTitle} />
      <EditorContent roomTitle={roomTitle} />
    </EditorContainerTwoCols>
  );
}

Editor.propTypes = {
  match: matchPropType.isRequired,
  getRoomStatusConnect: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getRoomStatusConnect: getRoomStatus })(Editor);
