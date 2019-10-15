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

export default function Status({ item }) {
  const flagEmoji = <Emoji emoji="🏁" label="finished" title="Finished" />;
  const writingEmoji = <Emoji emoji="️️✍️" label="writing hand" title="Time to write!" />;
  const hourglassEmoji = <Emoji emoji="⏳" label="hourglass" title="Waiting for turn..." />;
  if (item.finished_at || item.user_left_room) {
    return flagEmoji;
  }
  if (item.user_can_write_now) {
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
  title: '',
};
