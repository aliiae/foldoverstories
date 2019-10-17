import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FinishedTextViewer from './FinishedTextViewer';
import PaperContainer from './PaperContainer';
import LeftRoomMessage from './LeftRoomMessage';
import VisibleTextDisplay from './VisibleTextDisplay';
import TextAreaButton from './TextAreaButton';
import WaitingForTurnMessage from './WaitingForTurnMessage';
import LeaveRoomButton from './LeaveRoomButton';
import { getRoomStatus } from '../../store/actions/room';
import { authPropType } from '../commonPropTypes';
import LoadingSpinner from '../shared/LoadingSpinner';

function EditorContent({ roomTitle, ...props }) {
  const {
    auth, usernames, currentTurnUsername, userFinished, userCanWriteNow, isLastTurn, roomIsFinished,
  } = props;
  if (auth === null || roomIsFinished === null) {
    return <LoadingSpinner />;
  }
  const { isLoading: userIsLoading, isAuthenticated, user } = auth;
  if (userIsLoading || isAuthenticated === null) {
    return <LoadingSpinner />;
  }
  if (roomIsFinished || isLastTurn) {
    return <FinishedTextViewer roomTitle={roomTitle} />;
  }
  // if (isLastTurn) {
  //   return (
  //     <>
  //       <p className="lead paper-top-message">This was the last turn!</p>
  //       <p className="paper-bottom-message">
  //         The other authors have finished their parts, so simply
  //         refresh this page to read the completed story.
  //       </p>
  //     </>
  //   );
  // }

  const waitingMessageAndButton = (
    <>
      <WaitingForTurnMessage currentTurnUsername={currentTurnUsername} />
      <Row>
        <Col className="float-right text-right">
          <LeaveRoomButton roomTitle={roomTitle} />
        </Col>
      </Row>
    </>
  );
  let content;
  const isNewUser = !userIsLoading && (!isAuthenticated || !usernames.includes(user.username));
  if (userFinished) {
    content = <LeftRoomMessage />;
  } else if (userCanWriteNow || isNewUser) {
    content = (
      <>
        <VisibleTextDisplay roomTitle={roomTitle} isNewUser={isNewUser} />
        <TextAreaButton roomTitle={roomTitle} isNewUser={isNewUser} />
      </>
    );
  } else {
    content = waitingMessageAndButton;
  }

  return (
    <PaperContainer>
      {content}
    </PaperContainer>
  );
}

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.finished_at !== null,
  auth: state.auth,
  isLastTurn: state.story.last_turn,
  userCanWriteNow: state.room.user_can_write_now,
  usernames: state.story.users.map((user) => user.username),
  currentTurnUsername: state.room.current_turn_username,
  userFinished: state.room.user_left_room,
});

EditorContent.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  roomIsFinished: PropTypes.bool,
  auth: authPropType,
  isLastTurn: PropTypes.bool,
  userCanWriteNow: PropTypes.bool,
  usernames: PropTypes.arrayOf(PropTypes.string),
  currentTurnUsername: PropTypes.string,
  userFinished: PropTypes.bool,
};

EditorContent.defaultProps = {
  roomIsFinished: null,
  auth: null,
  isLastTurn: null,
  userCanWriteNow: null,
  usernames: null,
  currentTurnUsername: null,
  userFinished: null,
};

export default connect(mapStateToProps, { getRoomStatusConnect: getRoomStatus })(EditorContent);
