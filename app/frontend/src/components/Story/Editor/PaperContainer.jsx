import React from 'react';
import PropTypes from 'prop-types';
import InviteLink from './InviteLink';

export default function PaperContainer({ children }) {
  const currentUrl = window.location.href;
  return (
    <div className="mt-3">
      <InviteLink url={currentUrl} />
      <div className="p-3 paper">
        {children}
      </div>
    </div>
  );
}

PaperContainer.propTypes = {
  children: PropTypes.node,
};
PaperContainer.defaultProps = {
  children: null,
};
