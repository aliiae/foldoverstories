import React from 'react';
import PropTypes from 'prop-types';

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

export default function RoomStatus({ room }) {
  const bookEmoji = <Emoji emoji="📕" label="open book" title="Story is finished" />;
  const writingEmoji = <Emoji emoji="️️✍️" label="writing hand" title="Your turn to write!" />;
  const hourglassEmoji = <Emoji emoji="⏳" label="hourglass" title="Waiting for other authors" />;

  if (room.is_finished) {
    return bookEmoji;
  }
  if (room.user_can_write_now) {
    return writingEmoji;
  }
  return hourglassEmoji;
}

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string,
  title: PropTypes.string,
};

Emoji.defaultProps = {
  label: null,
  title: null,
};
