import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { addText } from '../../actions/story';
import JoinButton from './JoinButton';
import { authDefaultProp, authPropType } from '../common/commonPropTypes';
import LoadingSpinner from '../common/LoadingSpinner';

// TODO: remove user from room when clicked the 'leave room' button

const propTypes = {
  addTextConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  correctTurn: PropTypes.bool.isRequired,
  auth: authPropType,
  usernames: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  usernames: [],
  auth: authDefaultProp,
};

function TextAreaButton(props) {
  const [text, setText] = useState('');
  const [isLastText, setIsLastText] = useState(false);
  const {
    addTextConnect, roomTitle, auth, usernames, correctTurn,
  } = props;

  const resetInputFields = () => {
    setText('');
    setIsLastText(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const lastNewLineIndex = text.lastIndexOf('\n');
    const textPost = {
      hidden_text: text.slice(0, lastNewLineIndex),
      visible_text: text.slice(lastNewLineIndex + 1),
      is_last: isLastText,
    };
    addTextConnect(textPost, roomTitle);
    resetInputFields();
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onChangeCheckbox = (e) => {
    setIsLastText(e.target.checked);
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

  const waitingForTurn = <p>Waiting for the next author&hellip;</p>;
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
      <Row style={{ display: 'flex', 'justify-content': 'space-between' }}>
        <Col>
          <Button type="submit" variant="success" size="sm" className="mt-3">
            Submit
          </Button>
          <Form.Check
            inline
            label="This is my last input in this story"
            type="checkbox"
            onChange={onChangeCheckbox}
            checked={isLastText}
            name="isLastText"
          />
        </Col>
        <Col className="text-right">
          <Button type="button" variant="danger" size="sm" className="mt-3">
            Leave this story
          </Button>
        </Col>
      </Row>
    </Form>
  );

  return (
    <>
      {correctTurn ? submitForm : waitingForTurn}
    </>
  );
}

TextAreaButton.propTypes = propTypes;
TextAreaButton.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  auth: state.auth,
  correctTurn: state.story.correct_turn,
  usernames: state.story.users.map((user) => user.username),
});

export default connect(mapStateToProps, { addTextConnect: addText })(TextAreaButton);
