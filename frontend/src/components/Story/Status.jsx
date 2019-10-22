import React from 'react';
import PropTypes from 'prop-types';
import { CAN_WRITE, STOPPED } from '../userStatus';

export function Emoji({ emoji, label, title }) {
  if (!label) { // emoji is purely decorative
    return (
      <span title={title}>
        <span aria-hidden="true">{emoji}</span>
      </span>
    );
  }
  return (
    <span title={title}>
      <span
        role="img"
        aria-label={label}
        title={title}
      >
        {emoji}
      </span>
    </span>
  );
}

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string,
  title: PropTypes.string,
};
Emoji.defaultProps = {
  label: null,
  title: '',
};


export default function Status({ item }) {
  const flagEmoji = <Emoji emoji="🏁" label="finished" title="Finished turns" />;
  const writingEmoji = <Emoji emoji="️️✍️" label="writing hand" title="Time to write!" />;
  const hourglassEmoji = <Emoji emoji="⏳" label="hourglass" title="Waiting for turn..." />;
  const bookEmoji = <Emoji emoji="📗" label="closed book" title="Story is finished!" />;
  if (item.finishedAt) {
    return bookEmoji;
  }
  if (item.userStatus === STOPPED) {
    return flagEmoji;
  }
  if (item.userStatus === CAN_WRITE) {
    return writingEmoji;
  }
  return hourglassEmoji;
}
