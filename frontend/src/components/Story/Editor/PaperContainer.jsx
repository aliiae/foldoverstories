import React from 'react';
import PropTypes from 'prop-types';
import InviteLink from './InviteLink';

export default function PaperContainer({ children }) {
  const currentUrl = window.location.href;
  return (
    <>
      <InviteLink url={currentUrl} />
      <div className="paper has-shadow">
        {children}
      </div>
    </>
  );
}

PaperContainer.propTypes = {
  children: PropTypes.node,
};
PaperContainer.defaultProps = {
  children: null,
};
