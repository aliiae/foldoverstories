import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const SvgLinkIcon = ({ size, ...props }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} {...props} className="social-icon">
    <circle cx="32" cy="32" r="31" fill="#EB6864" />
    <svg preserveAspectRatio="xMidYMid meet" viewBox="-16 -16 64 64">
      <g>
        <path
          d="M 29.515625 14.5 L 23.507812 20.503906 C 20.191406 23.824219 14.8125 23.824219 11.496094 20.503906 C 10.972656 19.984375 10.566406 19.398438 10.207031 18.792969 L 13 16 C 13.132812 15.867188 13.292969 15.789062 13.453125 15.699219 C 13.644531 16.359375 13.980469 16.984375 14.5 17.503906 C 16.15625 19.160156 18.851562 19.15625 20.503906 17.503906 L 26.511719 11.496094 C 28.167969 9.839844 28.167969 7.144531 26.511719 5.492188 C 24.855469 3.835938 22.160156 3.835938 20.503906 5.492188 L 18.371094 7.628906 C 16.636719 6.953125 14.769531 6.773438 12.953125 7.039062 L 17.503906 2.488281 C 20.820312 -0.828125 26.199219 -0.828125 29.515625 2.488281 C 32.832031 5.804688 32.832031 11.183594 29.515625 14.5 Z M 13.632812 24.375 L 11.496094 26.511719 C 9.839844 28.167969 7.144531 28.167969 5.492188 26.511719 C 3.835938 24.855469 3.835938 22.160156 5.492188 20.503906 L 11.496094 14.5 C 13.152344 12.84375 15.847656 12.84375 17.503906 14.5 C 18.019531 15.015625 18.355469 15.640625 18.550781 16.300781 C 18.710938 16.207031 18.871094 16.132812 19.003906 16 L 21.792969 13.210938 C 21.4375 12.601562 21.027344 12.019531 20.503906 11.496094 C 17.1875 8.179688 11.808594 8.179688 8.492188 11.496094 L 2.488281 17.503906 C -0.828125 20.820312 -0.828125 26.199219 2.488281 29.515625 C 5.804688 32.832031 11.183594 32.832031 14.5 29.515625 L 19.050781 24.964844 C 17.234375 25.230469 15.367188 25.046875 13.632812 24.375 Z M 13.632812 24.375 "
          fill="white"
        />
      </g>
    </svg>
  </svg>
);

SvgLinkIcon.propTypes = { size: PropTypes.number.isRequired };

const SvgLinkButton = ({ url, size, ...props }) => {
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
          <Tooltip>Copied!</Tooltip>
        )}
      >
        <button
          type="button"
          onClick={onClickCopy}
          className="unstyled-button"
          {...props}
        >
          <SvgLinkIcon size={size} />
        </button>
      </OverlayTrigger>
    </>
  );
};
SvgLinkButton.propTypes = { url: PropTypes.string.isRequired, size: PropTypes.number.isRequired };
export default SvgLinkButton;
