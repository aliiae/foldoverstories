import React from 'react';
import PropTypes from 'prop-types';
import TelegramShareButton from 'react-share/lib/TelegramShareButton';
import TelegramIcon from 'react-share/lib/TelegramIcon';
import EmailShareButton from 'react-share/lib/EmailShareButton';
import EmailIcon from 'react-share/lib/EmailIcon';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import TwitterShareButton from 'react-share/lib/TwitterShareButton';
import TwitterIcon from 'react-share/lib/TwitterIcon';
import SvgLinkButton from '../layout/SvgLinkButton';


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
        <SvgLinkButton url={url} size={32} />
      </ButtonToolbar>
    </div>
  );
}

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired,
};
