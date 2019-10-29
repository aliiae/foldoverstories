import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import { formatTimeStampDateOnly } from '../../../dateFormatters';

const subtitleStyle = { display: 'block' };

function StoryHeadline({ usernames, dateISOString }) {
  const joinedUsernames = `${usernames.join(', ').replace(/, ([^,]*)$/, ' & $1')}`;

  return (
    <div className="story-headline">
      <Heading renderAs="h1" size={4}>
        Story by {joinedUsernames}
      </Heading>
      <Heading subtitle size={6}>
        {dateISOString && (
          <span style={subtitleStyle}>
            Finished on
            {' '}
            {formatTimeStampDateOnly(dateISOString)}
          </span>
        )}
      </Heading>
    </div>
  );
}

StoryHeadline.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateISOString: PropTypes.string,
};

StoryHeadline.defaultProps = {
  dateISOString: null,
};

export default React.memo(StoryHeadline);
