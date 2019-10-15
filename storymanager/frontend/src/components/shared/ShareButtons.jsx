import React from 'react';
import PropTypes from 'prop-types';
import {
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import CopyLinkButton from './CopyLinkButton';
import SvgLinkIcon from './SvgLinkIcon';


export default function ShareButtons({ url }) {
  return (
    <div className="float-right align-items-center mt-3">
      <span className="mr-1">Share this story:</span>
      <ButtonToolbar className="d-inline-flex" data-test="share-buttons">
        <TelegramShareButton url={url}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        {' '}
        <TwitterShareButton url={url} title="Have a look at this story">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        {' '}
        <EmailShareButton url={url}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        {' '}
        <CopyLinkButton url={url}>
          <SvgLinkIcon size={32} />
        </CopyLinkButton>
      </ButtonToolbar>
    </div>
  );
}

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired,
};
