import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { addText } from '../../actions/story';
import { leaveRoom } from '../../actions/room';
import JoinButton from './JoinButton';
import LoadingSpinner from '../common/LoadingSpinner';
import { authDefaultProp, authPropType } from '../common/commonPropTypes';
import LeftRoomMessage from './LeftRoomMessage';
import WaitingForTurnMessage from './WaitingForTurnMessage';
import LeaveRoomButton from './LeaveRoomButton';

// TODO: remove user from room when clicked the 'leave room' button

const propTypes = {
  addTextConnect: PropTypes.func.isRequired,
  leaveRoomConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  correctTurn: PropTypes.bool.isRequired,
  userFinished: PropTypes.bool,
  auth: authPropType,
  usernames: PropTypes.arrayOf(PropTypes.string),
  currentTurnUsername: PropTypes.string,
};

const defaultProps = {
  usernames: [],
  userFinished: false,
  auth: authDefaultProp,
  currentTurnUsername: null,
};

function TextAreaButton(props) {
  const [text, setText] = useState('');
  const {
    addTextConnect, roomTitle, auth, usernames, correctTurn, leaveRoomConnect, userFinished,
    currentTurnUsername,
  } = props;

  const resetInputFields = () => {
    setText('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const lastNewLineIndex = text.lastIndexOf('\n');
    const textPost = {
      hidden_text: text.slice(0, lastNewLineIndex),
      visible_text: text.slice(lastNewLineIndex + 1),
    };
    addTextConnect(textPost, roomTitle);
    resetInputFields();
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onClickLeave = () => {
    leaveRoomConnect(roomTitle);
  };

  if (auth === null) {
    return <LoadingSpinner />;
  }
  const { isLoading, isAuthenticated, user } = auth;
  if (isLoading || isAuthenticated === null) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated || !usernames.includes(user.username)) {
    return (<JoinButton roomTitle={roomTitle} />);
  }
  if (userFinished) {
    return <LeftRoomMessage />;
  }

  const placeholder = 'Type your text here. Remember that only the last line will be visible!';
  const submitForm = (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formEnterText">
        <Form.Control
          as="textarea"
          rows="2"
          placeholder={placeholder}
          value={text}
          onChange={onChangeText}
          name="text"
          style={{ resize: 'none' }}
        />
      </Form.Group>
      <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Col>
          <Button type="submit" variant="success" size="sm">
            Submit
          </Button>
        </Col>
        <Col className="float-right text-right">
          <LeaveRoomButton onClick={onClickLeave} />
        </Col>
      </Row>
    </Form>
  );

  const waitingMessage = (
    <>
      <WaitingForTurnMessage currentTurnUsername={currentTurnUsername} />
      <Col className="float-right text-right">
        <LeaveRoomButton onClick={onClickLeave} />
      </Col>
    </>
  );

  return (
    <>
      {correctTurn ? submitForm : waitingMessage}
    </>
  );
}

TextAreaButton.propTypes = propTypes;
TextAreaButton.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
  correctTurn: state.story.correct_turn,
  usernames: state.story.users.map((user) => user.username),
  userFinished: state.room.user_left_room,
  currentTurnUsername: state.story.current_turn_username,
});

export default connect(mapStateToProps,
  { addTextConnect: addText, leaveRoomConnect: leaveRoom })(
  TextAreaButton,
);
