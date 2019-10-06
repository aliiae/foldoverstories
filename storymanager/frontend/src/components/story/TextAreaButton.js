import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import { addText } from '../../actions/story';
import { leaveRoom } from '../../actions/room';
import JoinButton from './JoinButton';
import LoadingSpinner from '../common/LoadingSpinner';
import { authDefaultProp, authPropType } from '../common/commonPropTypes';
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
};

const defaultProps = {
  usernames: [],
  userFinished: false,
  auth: authDefaultProp,
  currentTurnUsername: null,
};

function MessageModal({ show, onHide, title, message, onClick }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClick} className="mr-auto">
          Do not show warnings for this story
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

MessageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function TextAreaButton(props) {
  const [text, setText] = useState('');
  const {
    addTextConnect, roomTitle, auth, usernames, correctTurn, leaveRoomConnect, userFinished,
    currentTurnUsername,
  } = props;
  const [hiddenIsEmpty, setHiddenIsEmpty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalShownCount, setModalShownCount] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [doNotShowModals, setDoNotShowModals] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleDoNotShowModals = () => {
    setDoNotShowModals(true);
  };
  const resetInputFields = () => {
    setText('');
  };

  const messageHiddenIsEmpty = 'You seem to submit only one line of text. '
    + 'In case you don\'t want to make your whole input visible to the next author, '
    + 'please check that you divided your text with Enter ⏎.';

  useEffect(() => {
    console.log('effect');
    if (hiddenIsEmpty) {
      setShowModal(true);
    }
  }, [hiddenIsEmpty]);

  const onSubmit = (e) => {
    e.preventDefault();
    const lastNewLineIndex = text.lastIndexOf('\n');
    const hiddenText = lastNewLineIndex > -1 ? text.slice(0, lastNewLineIndex) : '';
    const visibleText = text.slice(lastNewLineIndex + 1);
    console.log(modalShownCount, hiddenIsEmpty);
    if (hiddenText === '' && modalShownCount === 0) {
      console.log('yay');
      setHiddenIsEmpty(true);
      setModalMessage(messageHiddenIsEmpty);
      setModalTitle('Only one line?');
      setModalShownCount(modalShownCount + 1);
    } else {
      setHiddenIsEmpty(false);
      const textPost = {
        hidden_text: hiddenText,
        visible_text: visibleText,
      };
      addTextConnect(textPost, roomTitle);
      resetInputFields();
      setModalShownCount(0);
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
      <MessageModal
        show={!doNotShowModals && showModal}
        onHide={handleModalClose}
        message={modalMessage}
        title={modalTitle}
        onClick={handleDoNotShowModals}
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
  currentTurnUsername: state.story.current_turn_username,
});

export default connect(mapStateToProps,
  { addTextConnect: addText, leaveRoomConnect: leaveRoom })(
  TextAreaButton,
);
