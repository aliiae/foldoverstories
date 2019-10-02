import React from 'react';

function Emoji({ emoji, label, title }) {
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
