import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';
import { authPropType, matchPropType } from '../../commonPropTypes';
import { getRoomStatus } from '../../../store/actions/room';
import LoadingSpinner from '../../UI/LoadingSpinner';
import useInternetStatus from '../../../hooks/useInternetStatus';
import useWebsocket from '../../../hooks/useWebsocket';
import EditorContainerTwoCols from './EditorContainerTwoCols';
import EditorContent from './EditorContent';
import RoomUsers from '../RoomUsers';

function Editor(props) {
  const {
    getRoomStatusConnect, match, roomIsFinished, auth, usernames,
  } = props;
  const { isLoading: userIsLoading, isAuthenticated } = auth;
  const roomTitle = match.params.id;
  const { isOnline } = useInternetStatus();
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
  roomIsFinished: PropTypes.bool,
  auth: authPropType,
  usernames: PropTypes.arrayOf(PropTypes.string),
};

Editor.defaultProps = {
  roomIsFinished: null,
  auth: null,
  usernames: null,
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.finished_at !== null,
  auth: state.auth,
  usernames: state.story.users.map((user) => user.username),
});

export default connect(mapStateToProps, { getRoomStatusConnect: getRoomStatus })(Editor);
