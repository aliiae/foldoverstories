import React from 'react';
import PropTypes from 'prop-types';

export default function ContentWrapper({ children }) {
  return (
    <article className="illustrated-text-card">
      <h1 className="text-center mb-5 display-3">How to Play</h1>
      {children}
    </article>
  );
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
