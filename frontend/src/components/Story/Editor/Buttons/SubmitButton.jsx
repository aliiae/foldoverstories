import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bulma-components/lib/components/button';

function SubmitButton({ onSubmit }) {
  return (
    <Button
      type="submit"
      color="success"
      data-test="story-submit-button"
      onClick={onSubmit}
    >
      Submit
    </Button>
  );
}

SubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(SubmitButton);
