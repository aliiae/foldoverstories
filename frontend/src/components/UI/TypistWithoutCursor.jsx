import React from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';

export default function TypistWithoutCursor({ children }) {
  const cursorOptions = { show: false };
  return (
    <Typist cursor={cursorOptions}>
      {children}
    </Typist>
  );
}

TypistWithoutCursor.propTypes = { children: PropTypes.node.isRequired };
