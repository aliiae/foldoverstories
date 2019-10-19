import React from 'react';
import Button from 'react-bootstrap/Button';

function SubmitButton() {
  return (
    <Button
      type="submit"
      variant="success"
      size="sm"
      className="shadow-button"
      data-test="story-submit-button"
    >
      Submit
    </Button>
  );
}

export default React.memo(SubmitButton);
