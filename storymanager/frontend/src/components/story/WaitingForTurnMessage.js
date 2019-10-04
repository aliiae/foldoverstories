import React from 'react';
import PropTypes from 'prop-types';

export default function WaitingForTurnMessage({ currentTurnUsername }) {
  return (
    <>
      <p className="lead">
        Now it&apos;s the next author
        <strong>
        {` ${currentTurnUsername}` || ''}
        </strong>
        &apos;s turn to contribute to the story.
      </p>
      <p>
        While you&apos;re waiting for them, check your other stories or start a new one!
      </p>
    </>
  );
}

WaitingForTurnMessage.propTypes = {
  currentTurnUsername: PropTypes.string,
};
WaitingForTurnMessage.defaultProps = {
  currentTurnUsername: null,
};
