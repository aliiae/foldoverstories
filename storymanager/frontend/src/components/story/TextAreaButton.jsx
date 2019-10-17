import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import { addText } from '../../store/actions/story';
import LeaveRoomButton from './LeaveRoomButton';
import TextArea from '../shared/TextArea';
import AlertMessage from '../shared/AlertMessage';
import JoinButton from './JoinButton';
import { authPropType } from '../commonPropTypes';

function TextAreaButton(props) {
  const [userText, setUserText] = useState('');
  const [hiddenIsEmpty, setHiddenIsEmpty] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertWasShown, setAlertWasShownOnce] = useState(false);

  const {
    addTextConnect, roomTitle, userCanWriteNow, isNewUser
  } = props;

  useEffect(() => {
    if (hiddenIsEmpty) {
      setShowAlert(true);
      setAlertWasShownOnce(true);
    }
  }, [hiddenIsEmpty, userCanWriteNow]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const resetInputFields = () => {
    setUserText('');
    setAlertWasShownOnce(false);
  };


  const onSubmit = (e) => {
    e.preventDefault();

    function splitTextIntoHiddenVisible(text) {
      // split into text before the newline character (hidden) and a line after (visible)
      const lastNewLineIndex = text.lastIndexOf('\n');
      const hiddenText = lastNewLineIndex > -1 ? text.slice(0, lastNewLineIndex) : '';
      const visibleText = text.slice(lastNewLineIndex + 1);
      return {
        hiddenText,
        visibleText,
      };
    }

    const { hiddenText, visibleText } = splitTextIntoHiddenVisible(userText);
    if (!hiddenText && !alertWasShown) { // show an alert once if the user entered visible text only
      setHiddenIsEmpty(true);
      setAlertWasShownOnce(true);
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
    setUserText(e.target.value);
  };
  if (isNewUser) {
    return (<JoinButton roomTitle={roomTitle} />);
  }
  const alertMessageHiddenIsEmpty = 'You seem to submit only one line of text. '
    + 'Unless you want to make your whole input visible to the next author, '
    + 'please check that you divided your text with Enter ⏎.';
  const submitForm = (
    <>
      <Form onSubmit={onSubmit} className="editor-form">
        <Form.Group controlId="formEnterText">
          <TextArea value={userText} onChange={onChangeText} />
        </Form.Group>
        <Row style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        >
          <Col>
            <Button
              type="submit"
              variant="success"
              size="sm"
              className="shadow-button"
              data-test="story-submit-button"
            >
              Submit
            </Button>
          </Col>
          <Col className="float-right text-right">
            <LeaveRoomButton roomTitle={roomTitle} />
          </Col>
        </Row>
      </Form>
      <AlertMessage
        show={showAlert}
        onHide={handleCloseAlert}
        message={alertMessageHiddenIsEmpty}
        title="Only one line?"
      />
    </>
  );

  return (
    <>
      {userCanWriteNow && submitForm}
    </>
  );
}

TextAreaButton.propTypes = {
  addTextConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  userCanWriteNow: PropTypes.bool,
  isNewUser: PropTypes.bool.isRequired,
};
TextAreaButton.defaultProps = {
  userCanWriteNow: null,
};

const mapStateToProps = (state) => ({
  userCanWriteNow: state.room.user_can_write_now,
});

const mapDispatchToProps = {
  addTextConnect: addText,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextAreaButton);
