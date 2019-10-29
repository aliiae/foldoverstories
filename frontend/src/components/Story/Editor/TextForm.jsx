import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bulma-components/lib/components/button';

import { addText, getRoomStatus } from '../../../store/actions/story';
import LeaveRoomButton from './Buttons/LeaveRoomButton';
import TextArea from './TextArea';
import AlertMessage from '../../UI/AlertMessage';
import JoinButton from './Buttons/JoinButton';
import SubmitButton from './Buttons/SubmitButton';
import { CAN_WRITE } from '../../userStatus';
import { websocketStatusPropType } from '../../commonPropTypes';

function TextForm(props) {
  let userTextRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertWasShown, setAlertWasShownOnce] = useState(false);
  const {
    dispatchAddText, dispatchGetRoomStatus, roomTitle, userCanWriteNow, isNewUser, websocketStatus,
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
      if (websocketStatus !== 1) {
        dispatchGetRoomStatus(roomTitle);
      }
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
      <TextArea ref={(el) => {
        userTextRef = el;
      }}
      />
      <Button.Group hasAddons={false}>
        <SubmitButton onSubmit={onSubmit} />
        <LeaveRoomButton roomTitle={roomTitle} />
      </Button.Group>
      {showAlert && <AlertMessage message={alertMessageHiddenIsEmpty} />}
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
  dispatchGetRoomStatus: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  userCanWriteNow: PropTypes.bool,
  isNewUser: PropTypes.bool.isRequired,
  websocketStatus: websocketStatusPropType,
};
TextForm.defaultProps = {
  userCanWriteNow: null,
  websocketStatus: null,
};

const mapStateToProps = (state) => ({
  userCanWriteNow: state.story.userStatus === CAN_WRITE,
  websocketStatus: state.websockets.ws.status,
});
const mapDispatchToProps = {
  dispatchAddText: addText,
  dispatchGetRoomStatus: getRoomStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextForm);
