import React from 'react';

function Emoji(emoji, label, title) {
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
  const bookEmoji = Emoji('📕', 'open book', 'Story is finished');
  const writingEmoji = Emoji('✍️', 'writing hand', 'Your turn to write!');
  const hourglassEmoji = Emoji('⏳', 'hourglass', 'Waiting for other authors');

  if (room.is_finished) {
    return bookEmoji;
  }
  if (room.user_can_write_now) {
    return writingEmoji;
  }
  return hourglassEmoji;
}
