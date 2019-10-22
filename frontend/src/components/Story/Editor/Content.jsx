import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextForm from './TextForm';
import FinishedTextViewer from './Finished/FinishedTextViewer';
import PaperContainer from './PaperContainer';
import LeftRoomMessage from './Messages/LeftRoomMessage';
import VisibleTextDisplay from './VisibleTextDisplay';
import WaitingForTurnMessage from './Messages/WaitingForTurnMessage';
import LeaveRoomButton from './Buttons/LeaveRoomButton';
import { authPropType, usersPropType, userStatusPropType } from '../../commonPropTypes';
import { CAN_WRITE, STOPPED } from '../../userStatus';

function Content({ roomTitle, ...props }) {
  const {
    auth, users, currentTurnUsername, userStatus, isLastTurn, roomIsFinished,
  } = props;
  const { isLoading: userIsLoading, isAuthenticated, user } = auth;
  if (users && (roomIsFinished || isLastTurn)) {
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
  const isNewUser = (userIsLoading === false
    && (isAuthenticated === false
      || (users !== null && !users.map((u) => u.username).includes(user.username))));
  if (userStatus === STOPPED) {
    content = <LeftRoomMessage />;
  } else if (userStatus === CAN_WRITE || isNewUser) {
    content = (
      <>
        <VisibleTextDisplay roomTitle={roomTitle} isNewUser={isNewUser} />
        <TextForm roomTitle={roomTitle} isNewUser={isNewUser} />
      </>
    );
  } else if (userStatus !== CAN_WRITE && currentTurnUsername) {
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
  roomIsFinished: state.story.finishedAt !== null,
  auth: state.auth,
  isLastTurn: state.story.isLastTurn,
  userStatus: state.story.userStatus,
  users: state.story.users,
  currentTurnUsername: state.story.currentTurnUsername,
});

Content.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  roomIsFinished: PropTypes.bool,
  auth: authPropType,
  isLastTurn: PropTypes.bool,
  userStatus: userStatusPropType,
  users: usersPropType,
  currentTurnUsername: PropTypes.string,
};

Content.defaultProps = {
  roomIsFinished: null,
  auth: null,
  isLastTurn: null,
  userStatus: null,
  users: null,
  currentTurnUsername: null,
};

export default connect(mapStateToProps)(Content);
