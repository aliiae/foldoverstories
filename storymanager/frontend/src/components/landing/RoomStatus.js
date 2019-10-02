import React from 'react';

function Emoji(emoji, label, title) {
  return (
    <span
      role="img"
      aria-label={label}
      title={title}
    >
      {emoji}
    </span>
  );
}

export default function RoomStatus({ room }) {
  const bookEmoji = Emoji('📕', 'open book', 'Story is finished, read it!');
  const writingEmoji = Emoji('✍️', 'writing hand', 'Your turn!');
  const hourglassEmoji = Emoji('⏳', 'hourglass', 'Waiting for other authors...');

  if (room.is_finished) {
    return bookEmoji;
  }
  if (room.user_can_write_now) {
    return writingEmoji;
  }
  return hourglassEmoji;
}
