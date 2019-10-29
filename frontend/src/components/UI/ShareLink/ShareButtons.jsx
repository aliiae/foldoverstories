import React from 'react';
import PropTypes from 'prop-types';
import CopyLinkButton from './CopyLinkButton';
import SvgLinkIcon from './SvgLinkIcon';


export default function ShareButtons({ url }) {
  return (
    <div className="share">
      <span>Share this story: </span>
      <CopyLinkButton url={url}>
        <SvgLinkIcon size={32} />
      </CopyLinkButton>
    </div>
  );
}

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired,
};
