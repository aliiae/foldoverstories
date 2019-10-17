import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FinishedTextViewer from '../Finished/FinishedTextViewer';
import PaperContainer from './PaperContainer';
import LeftRoomMessage from './Messages/LeftRoomMessage';
import VisibleTextDisplay from './VisibleTextDisplay';
import TextAreaButton from './Buttons/TextAreaButton';
import WaitingForTurnMessage from './Messages/WaitingForTurnMessage';
import LeaveRoomButton from './Buttons/LeaveRoomButton';
import { getRoomStatus } from '../../../store/actions/room';
import { authPropType, usersPropType } from '../../commonPropTypes';

function EditorContent({ roomTitle, ...props }) {
  const {
    auth, users, currentTurnUsername, userFinished, userCanWriteNow, isLastTurn, roomIsFinished,
  } = props;
  const { isLoading: userIsLoading, isAuthenticated, user } = auth;
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

  let content;
  const isNewUser = userIsLoading === false && (isAuthenticated === false
    || (users.length > 0 && !users.map((u) => u.username)
      .includes(user.username)));
  if (userFinished) {
    content = <LeftRoomMessage />;
  } else if (userCanWriteNow || isNewUser) {
    content = (
      <>
        <VisibleTextDisplay roomTitle={roomTitle} isNewUser={isNewUser} />
        <TextAreaButton roomTitle={roomTitle} isNewUser={isNewUser} />
      </>
    );
  } else if (userCanWriteNow === false && currentTurnUsername) {
    content = (
      <>
        <WaitingForTurnMessage currentTurnUsername={currentTurnUsername} />
        <Row>
          <Col className="float-right text-right">
            <LeaveRoomButton roomTitle={roomTitle} />
          </Col>
        </Row>
      </>
    );
  }
  if (content) {
    return (
      <PaperContainer>
        {content}
      </PaperContainer>
    );
  }
  return null;
}

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.finished_at !== null,
  auth: state.auth,
  isLastTurn: state.story.last_turn,
  userCanWriteNow: state.room.user_can_write_now,
  users: state.story.users,
  currentTurnUsername: state.room.current_turn_username,
  userFinished: state.room.user_left_room,
});

EditorContent.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  roomIsFinished: PropTypes.bool,
  auth: authPropType,
  isLastTurn: PropTypes.bool,
  userCanWriteNow: PropTypes.bool,
  users: usersPropType,
  currentTurnUsername: PropTypes.string,
  userFinished: PropTypes.bool,
};

EditorContent.defaultProps = {
  roomIsFinished: null,
  auth: null,
  isLastTurn: null,
  userCanWriteNow: null,
  users: null,
  currentTurnUsername: null,
  userFinished: null,
};

export default connect(mapStateToProps, { getRoomStatusConnect: getRoomStatus })(EditorContent);
