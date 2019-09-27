import React from 'react';
import PropTypes from 'prop-types';
import Paper from './TextDisplay';
import Button from './AddTextButton';

export default function Editor(props) {
  const { match } = props;
  return (
    <>
      <Paper roomTitle={match.params.id} />
      <Button roomTitle={match.params.id} />
    </>
  );
}

Editor.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
