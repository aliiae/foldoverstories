import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function LeaveRoomButton({ onClick }) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={(
        <Tooltip>
          When you leave the story, you won&apos;t be able to contribute anymore,
          but still can read the result when the other authors finish as well
        </Tooltip>
      )}
    >
      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={onClick}
        className="shadow-button"
        data-test="story-leave-button"
      >
        Leave this story
      </Button>
    </OverlayTrigger>
  );
}

LeaveRoomButton.propTypes = { onClick: PropTypes.func.isRequired };
