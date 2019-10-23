import React from 'react';
import PropTypes from 'prop-types';
import { CAN_WRITE, STOPPED, WAITING } from '../userStatus';

export const mapStatusToEmoji = {
  [STOPPED]: '🏁',
  [CAN_WRITE]: '️️✍️',
  [WAITING]: '⏳',
  ROOM_FINISHED: '📗',
};

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

const flagEmoji = (
  <Emoji
    emoji={mapStatusToEmoji[STOPPED]}
    label="finished"
    title="Finished turns"
  />
);
const writingEmoji = (
  <Emoji
    emoji={mapStatusToEmoji[CAN_WRITE]}
    label="writing hand"
    title="Time to write!"
  />
);
const hourglassEmoji = (
  <Emoji
    emoji={mapStatusToEmoji[WAITING]}
    label="hourglass"
    title="Waiting for turn..."
  />
);
const bookEmoji = (
  <Emoji
    emoji={mapStatusToEmoji.ROOM_FINISHED}
    label="closed book"
    title="Story is finished!"
  />
);

export default function Status({ item }) {
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
