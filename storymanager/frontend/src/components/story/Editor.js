import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FinishedTextViewer from './FinishedTextViewer';
import VisibleTextDisplay from './VisibleTextDisplay';
import TextAreaButton from './TextAreaButton';
import RoomUsers from './RoomUsers';
import { getRoomStatus } from '../../actions/room';
import LoadingSpinner from '../common/LoadingSpinner';

function Editor(props) {
  const {
    getRoomStatusConnect, match, roomIsFinished, userIsLoading,
  } = props;
  const roomTitle = match.params.id;

  useEffect(() => {
    getRoomStatusConnect(roomTitle);
    document.title = `${roomTitle} | Paper Stories`;
  }, [match.params.id, roomIsFinished, userIsLoading]);

  if (userIsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        {roomIsFinished ? (<FinishedTextViewer roomTitle={roomTitle} />)
          : (
            <>
              <VisibleTextDisplay roomTitle={roomTitle} />
              <TextAreaButton roomTitle={roomTitle} />
            </>
          )}
      </div>
      <div className="col-md-3">
        <RoomUsers roomTitle={roomTitle} />
      </div>
    </div>
  );
}

Editor.propTypes = {
  match: PropTypes.shape({
    location: PropTypes.object,
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    params: PropTypes.object,
  }).isRequired,
  getRoomStatusConnect: PropTypes.func.isRequired,
  roomIsFinished: PropTypes.bool,
  userIsLoading: PropTypes.bool,
};

Editor.defaultProps = {
  roomIsFinished: false,
  userIsLoading: true,
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.is_finished,
  userIsLoading: state.auth.isLoading,
});

export default connect(mapStateToProps,
  { getRoomStatusConnect: getRoomStatus })(Editor);
