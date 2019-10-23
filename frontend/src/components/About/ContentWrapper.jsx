import React from 'react';
import PropTypes from 'prop-types';

export default function ContentWrapper({ children }) {
  return (
    <article className="p-3 illustrated-text-card">
      <h1 className="text-center mb-3 display-4">How to Play</h1>
      <section>
        {children}
      </section>
    </article>
  );
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
