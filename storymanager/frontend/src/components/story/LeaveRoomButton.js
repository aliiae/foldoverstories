import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export default function LeaveRoomButton({ onClick }) {
  return (
    <Button type="button" variant="danger" size="sm" onClick={onClick}>
      Leave this story
    </Button>
  );
}

LeaveRoomButton.propTypes = { onClick: PropTypes.func.isRequired };
