import Form from 'react-bootstrap/Form';
import React from 'react';

const TextArea = React.forwardRef((props, ref) => {
  const placeholder = 'Type your text here. Remember that only the last line will be visible!';
  return (
    <Form.Group controlId="formEnterText">
      <Form.Control
        as="textarea"
        rows="3"
        placeholder={placeholder}
        ref={ref}
        name="text"
        style={{ resize: 'none' }}
        required
        autoFocus
        data-test="story-textarea"
      />
    </Form.Group>
  );
});

export default TextArea;
