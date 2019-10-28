import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import { formatTimeStampDateOnly } from '../../../dateFormatters';

const subtitleStyle = { display: 'block' };

export default function StoryHeadline({ usernames, dateISOString }) {
  const joinedUsernames = `${usernames.join(', ').replace(/, ([^,]*)$/, ' & $1')}`;

  return (
    <>
      <span className="story-headline">
        <Heading renderAs="h2" size={4}>
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
      </span>
    </>
  );
}

StoryHeadline.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateISOString: PropTypes.string,
};

StoryHeadline.defaultProps = {
  dateISOString: null,
};
