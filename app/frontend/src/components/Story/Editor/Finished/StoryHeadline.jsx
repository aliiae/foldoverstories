import React from 'react';
import PropTypes from 'prop-types';
import { formatTimeStampDateOnly } from '../../../dateFormatters';

export default function StoryHeadline({ usernames, dateISOString }) {
  function getJoinedUsernames() { // format as "user1, user2 & user3"
    return ` ${usernames.join(', ').replace(/, ([^,]*)$/, ' & $1')}`;
  }

  return (
    <h1 className="h5 story-headline">
      Story by
      {getJoinedUsernames()}
      <span className="small text-muted" style={{ display: 'block' }}>
        Finished on
        {' '}
        {formatTimeStampDateOnly(dateISOString)}
      </span>
    </h1>
  );
}

StoryHeadline.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateISOString: PropTypes.string.isRequired,
};
