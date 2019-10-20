import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const CopyLinkButton = ({ url, children, ...props }) => {
  let hiddenInputRef = useRef(null);
  const [show, setShow] = useState(false);

  const onClickCopy = () => {
    hiddenInputRef.style.display = 'block';
    hiddenInputRef.select();
    document.execCommand('copy');
    hiddenInputRef.style.display = 'none';
    setShow(!show);
  };
  return (
    <>
      <input
        className="hidden-input"
        tabIndex="-1"
        ref={(el) => {
          hiddenInputRef = el;
        }}
        value={url}
        readOnly
      />
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose
        overlay={(
          <Tooltip id="copied-link-tooltip">Copied!</Tooltip>
        )}
      >
        <button
          type="button"
          onClick={onClickCopy}
          className="unstyled-button"
          {...props}
        >
          {children}
        </button>
      </OverlayTrigger>
    </>
  );
};
CopyLinkButton.propTypes = { url: PropTypes.string.isRequired, children: PropTypes.node };
CopyLinkButton.defaultProps = { children: null };
export default CopyLinkButton;
