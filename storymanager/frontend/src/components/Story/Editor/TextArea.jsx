import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import React from 'react';

export default function TextArea({ value, onChange }) {
  const placeholder = 'Type your text here. Remember that only the last line will be visible!';
  return (
    <Form.Group controlId="formEnterText">
      <Form.Control
        as="textarea"
        rows="3"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name="text"
        style={{ resize: 'none' }}
        required
        autoFocus
        data-test="story-textarea"
      />
    </Form.Group>
  );
}

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
