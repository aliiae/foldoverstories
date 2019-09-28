import React from 'react';
import PropTypes from 'prop-types';
import TextDisplay from './TextDisplay';
import TextAreaButton from './TextAreaButton';

export default function Editor(props) {
  const { match } = props;
  return (
    <div className="row row justify-content-center">
      <div className="col-md-10">
        <TextDisplay roomTitle={match.params.id} />
        <TextAreaButton roomTitle={match.params.id} />
      </div>
    </div>
  );
}

Editor.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
