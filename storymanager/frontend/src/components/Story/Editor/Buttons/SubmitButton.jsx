import React from 'react';
import Button from 'react-bootstrap/Button';

export default function SubmitButton() {
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
