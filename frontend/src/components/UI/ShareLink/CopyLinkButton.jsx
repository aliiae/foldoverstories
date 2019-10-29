import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { NOTIFICATION_DURATION, TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';

const CopyLinkButton = ({ url, children, ...props }) => {
  let hiddenInputRef = useRef();
  const [show, setShow] = useState(false);

  const onClickCopy = () => {
    if (navigator.share) {
      const title = `${document.querySelector('h1').textContent} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
      navigator.share({
        title,
        url,
      });
    } else {
      hiddenInputRef.style.display = 'block';
      hiddenInputRef.select();
      document.execCommand('copy');
      hiddenInputRef.style.display = 'none';
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, NOTIFICATION_DURATION);
    }
  };

  return (
    <>
      {!navigator.share
      && (
        <input
          className="hidden-input"
          tabIndex="-1"
          ref={(el) => {
            hiddenInputRef = el;
          }}
          value={url}
          readOnly
        />
      )}
      <button
        type="button"
        onClick={onClickCopy}
        className={`unstyled-button ${show ? 'has-tooltip-bottom' : ''}`}
        data-tooltip="Copied!"
        {...props}
      >
        {children}
      </button>
    </>
  );
};

CopyLinkButton.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
};
CopyLinkButton.defaultProps = { children: null };

export default CopyLinkButton;
