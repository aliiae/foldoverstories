import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import { addText } from '../../store/actions/story';
import { leaveRoom } from '../../store/actions/room';
import JoinButton from './JoinButton';
import LoadingSpinner from '../common/LoadingSpinner';
import { authDefaultPropType, authPropType } from '../common/commonPropTypes';
import LeftRoomMessage from './LeftRoomMessage';
import WaitingForTurnMessage from './WaitingForTurnMessage';
import LeaveRoomButton from './LeaveRoomButton';

const propTypes = {
  addTextConnect: PropTypes.func.isRequired,
  leaveRoomConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  correctTurn: PropTypes.bool.isRequired,
  userFinished: PropTypes.bool,
  auth: authPropType,
  usernames: PropTypes.arrayOf(PropTypes.string),
  currentTurnUsername: PropTypes.string,
  isLastTurn: PropTypes.bool,
};

const defaultProps = {
  usernames: [],
  userFinished: false,
  auth: authDefaultPropType,
  currentTurnUsername: null,
  isLastTurn: false,
};

function AlertMessage({ show, onHide, title, message }) {
  return (
    <Alert show={show} onClose={onHide} variant="warning" dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}

AlertMessage.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function TextAreaButton(props) {
  const [text, setText] = useState('');
  const {
    addTextConnect, roomTitle, auth, usernames, correctTurn, leaveRoomConnect, userFinished,
    currentTurnUsername, isLastTurn,
  } = props;
  const [hiddenIsEmpty, setHiddenIsEmpty] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertWasShown, setAlertWasShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const resetInputFields = () => {
    setText('');
    setAlertWasShown(false);
  };

  const messageHiddenIsEmpty = 'You seem to submit only one line of text. '
    + 'Unless you want to make your whole input visible to the next author, '
    + 'please check that you divided your text with Enter ⏎.';

  useEffect(() => {
    if (hiddenIsEmpty) {
      setShowAlert(true);
      setAlertWasShown(true);
    }
  }, [hiddenIsEmpty, correctTurn]);

  const onSubmit = (e) => {
    e.preventDefault();
    const lastNewLineIndex = text.lastIndexOf('\n');
    const hiddenText = lastNewLineIndex > -1 ? text.slice(0, lastNewLineIndex) : '';
    const visibleText = text.slice(lastNewLineIndex + 1);
    if (!hiddenText && !alertWasShown) {
      setHiddenIsEmpty(true);
      setAlertMessage(messageHiddenIsEmpty);
      setAlertTitle('Only one line?');
      setAlertWasShown(true);
    } else {
      setHiddenIsEmpty(false);
      setShowAlert(false);
      const textPost = {
        hidden_text: hiddenText,
        visible_text: visibleText,
      };
      addTextConnect(textPost, roomTitle);
      resetInputFields();
    }
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
  if (isLastTurn) {
    return (
      <>
        <p className="lead paper-top-message">This was the last turn in this story!</p>
        <p className="paper-bottom-message">
          The other authors have finished their parts, refresh this page to read the completed
          masterpiece.
        </p>
      </>
    );
  }
  if (userFinished) {
    return <LeftRoomMessage />;
  }

  const placeholder = 'Type your text here. Remember that only the last line will be visible!';
  const submitForm = (
    <>
      <Form onSubmit={onSubmit} className="editor-form">
        <Form.Group controlId="formEnterText">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder={placeholder}
            value={text}
            onChange={onChangeText}
            name="text"
            style={{ resize: 'none' }}
            required
            autoFocus
          />
        </Form.Group>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col>
            <Button type="submit" variant="success" size="sm" className="shadow-button">
              Submit
            </Button>
          </Col>
          <Col className="float-right text-right">
            <LeaveRoomButton onClick={onClickLeave} />
          </Col>
        </Row>
      </Form>
      <AlertMessage
        show={showAlert}
        onHide={handleCloseAlert}
        message={alertMessage}
        title={alertTitle}
      />
    </>
  );

  const waitingMessage = (
    <>
      <WaitingForTurnMessage currentTurnUsername={currentTurnUsername} />
      <Row>
        <Col className="float-right text-right">
          <LeaveRoomButton onClick={onClickLeave} />
        </Col>
      </Row>
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
  isLastTurn: state.story.last_turn,
  currentTurnUsername: state.story.current_turn_username,
});

export default connect(mapStateToProps,
  { addTextConnect: addText, leaveRoomConnect: leaveRoom })(
  TextAreaButton,
);
