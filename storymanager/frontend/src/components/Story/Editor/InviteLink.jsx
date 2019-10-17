import PropTypes from 'prop-types';
import React from 'react';
import CopyLinkButton from '../../UI/ShareLink/CopyLinkButton';
import SvgLinkIcon from '../../UI/ShareLink/SvgLinkIcon';

export default function InviteLink(props) {
  const { url } = props;
  return (
    <p className="text-muted small">
      You can invite other authors by sending this link:
      {' '}
      <a
        href={url}
        className="color-underline"
        title="Link to this page"
      >
        {url}
      </a>
      {' '}
      <CopyLinkButton url={url}>
        <SvgLinkIcon size={32} />
      </CopyLinkButton>
    </p>
  );
}

InviteLink.propTypes = {
  url: PropTypes.string.isRequired,
};
