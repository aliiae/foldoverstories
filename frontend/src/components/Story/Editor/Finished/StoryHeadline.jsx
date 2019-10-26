import React from 'react';
import PropTypes from 'prop-types';
import { formatTimeStampDateOnly } from '../../../dateFormatters';

const subtitleStyle = { display: 'block' };
export default function StoryHeadline({ usernames, dateISOString }) {
  function getJoinedUsernames() { // format as "user1, user2 & user3"
    return ` ${usernames.join(', ').replace(/, ([^,]*)$/, ' & $1')}`;
  }

  return (
    <h1 className="h5 story-headline">
      <span className="story-title">
      Story by
        {getJoinedUsernames()}
      </span>
      {dateISOString && (
        <span className="small text-muted" style={subtitleStyle}>
          Finished on
          {' '}
          {formatTimeStampDateOnly(dateISOString)}
        </span>
      )}
    </h1>
  );
}

StoryHeadline.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateISOString: PropTypes.string,
};

StoryHeadline.defaultProps = {
  dateISOString: null,
};
