import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { addText } from '../../../store/actions/story';
import LeaveRoomButton from './Buttons/LeaveRoomButton';
import TextArea from './TextArea';
import AlertMessage from '../../UI/AlertMessage';
import JoinButton from './Buttons/JoinButton';
import SubmitButton from './Buttons/SubmitButton';
import { CAN_WRITE } from '../../userStatus';

function TextForm(props) {
  let userTextRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertWasShown, setAlertWasShownOnce] = useState(false);
  const {
    dispatchAddText, roomTitle, userCanWriteNow, isNewUser,
  } = props;

  const resetInputFields = () => {
    userTextRef.value = '';
    setAlertWasShownOnce(false);
  };

  const splitTextIntoHiddenVisible = (text) => {
    // splits into text before the newline character (hidden) and a line after (visible)
    const lastNewLineIndex = text.lastIndexOf('\n');
    const hiddenText = lastNewLineIndex > -1 ? text.slice(0, lastNewLineIndex) : '';
    const visibleText = text.slice(lastNewLineIndex + 1);
    return {
      hiddenText,
      visibleText,
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { hiddenText, visibleText } = splitTextIntoHiddenVisible(userTextRef.value);
    if (!hiddenText && !alertWasShown) { // show an alert once if the user entered visible text only
      setShowAlert(true);
      setAlertWasShownOnce(true);
    } else {
      setShowAlert(false);
      const textPost = {
        hiddenText,
        visibleText,
      };
      dispatchAddText(textPost, roomTitle);
      resetInputFields();
    }
  };

  if (isNewUser) {
    return <JoinButton roomTitle={roomTitle} />;
  }
  const alertMessageHiddenIsEmpty = 'You seem to submit only one line of text. '
    + 'Unless you want to make your whole input visible to the next author, '
    + 'please check that you divided your text with Enter ⏎.';
  const submitForm = (
    <>
      <Form onSubmit={onSubmit} className="editor-form">
        <TextArea ref={(el) => {
          userTextRef = el;
        }}
        />
        <Row style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        >
          <Col>
            <SubmitButton />
          </Col>
          <Col className="float-right text-right">
            <LeaveRoomButton roomTitle={roomTitle} />
          </Col>
        </Row>
      </Form>
      {showAlert && (
        <AlertMessage
          message={alertMessageHiddenIsEmpty}
          title="Only one line?"
        />
      )}
    </>
  );

  return (
    <>
      {userCanWriteNow && submitForm}
    </>
  );
}

TextForm.propTypes = {
  dispatchAddText: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  userCanWriteNow: PropTypes.bool,
  isNewUser: PropTypes.bool.isRequired,
};
TextForm.defaultProps = {
  userCanWriteNow: null,
};

const mapStateToProps = (state) => ({
  userCanWriteNow: state.story.userStatus === CAN_WRITE,
});
const mapDispatchToProps = {
  dispatchAddText: addText,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextForm);
