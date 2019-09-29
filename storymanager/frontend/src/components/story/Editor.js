import React from 'react';
import PropTypes from 'prop-types';
import TextDisplay from './TextDisplay';
import TextAreaButton from './TextAreaButton';
import RoomUsers from './RoomUsers';

export default function Editor({ match }) {
  const roomTitle = match.params.id;
  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <TextDisplay roomTitle={roomTitle} />
        <TextAreaButton roomTitle={roomTitle} />
      </div>
      <div className="col-md-3">
        <RoomUsers roomTitle={roomTitle} />
      </div>
    </div>
  );
}

Editor.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
