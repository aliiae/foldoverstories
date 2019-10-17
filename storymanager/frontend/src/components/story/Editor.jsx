import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authPropType, matchPropType } from '../commonPropTypes';
import { getRoomStatus } from '../../store/actions/room';
import LoadingSpinner from '../shared/LoadingSpinner';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../settings';
import useInternetStatus from '../../hooks/useInternetStatus';
import useWebsocket from '../../hooks/useWebsocket';
import EditorContainer from './EditorContainer';
import EditorContent from './EditorContent';

function Editor(props) {
  const {
    getRoomStatusConnect, match, roomIsFinished, auth, isLastTurn, usernames,
  } = props;
  const { isLoading: userIsLoading } = auth;
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
    console.log('status');
    getRoomStatusConnect(roomTitle);
    document.title = `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, [roomTitle, isLastTurn, roomIsFinished]);

  if (userIsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <EditorContainer roomTitle={roomTitle}>
      <EditorContent roomTitle={roomTitle} />
    </EditorContainer>
  );
}

Editor.propTypes = {
  match: matchPropType.isRequired,
  getRoomStatusConnect: PropTypes.func.isRequired,
  roomIsFinished: PropTypes.bool,
  isLastTurn: PropTypes.bool,
  auth: authPropType,
  usernames: PropTypes.arrayOf(PropTypes.string),
};

Editor.defaultProps = {
  roomIsFinished: null,
  isLastTurn: null,
  auth: null,
  usernames: null,
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.finished_at !== null,
  auth: state.auth,
  lastTurn: state.story.last_turn,
  usernames: state.story.users.map((user) => user.username),
});

export default connect(mapStateToProps, { getRoomStatusConnect: getRoomStatus })(Editor);
