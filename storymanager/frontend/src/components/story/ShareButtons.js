import React from 'react';
import TelegramShareButton from 'react-share/lib/TelegramShareButton';
import TelegramIcon from 'react-share/lib/TelegramIcon';
import EmailShareButton from 'react-share/lib/EmailShareButton';
import EmailIcon from 'react-share/lib/EmailIcon';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';

export default function ShareButtons({ url }) {
  return (
    <Row className="float-right align-items-center">
      <span className="mr-1">Share this story:</span>
      <ButtonToolbar>
        <TelegramShareButton
          url={url}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        {' '}
        <EmailShareButton
          url={window.location.href}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </ButtonToolbar>
    </Row>
  );
}

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired,
};
