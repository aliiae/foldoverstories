import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FullTextReader from './FullTextReader';
import VisibleTextDisplay from './VisibleTextDisplay';
import TextAreaButton from './TextAreaButton';
import RoomUsers from './RoomUsers';
import { getRoomStatus } from '../../actions/room';

function Editor(props) {
  const { getRoomStatusConnect } = props;
  const roomTitle = props.match.params.id;

  useEffect(() => {
    getRoomStatusConnect(roomTitle);
    document.title = `${roomTitle} | Paper Stories`;
  }, [props.match.params.id, props.roomIsFinished]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        {
          props.roomIsFinished ? (<FullTextReader roomTitle={roomTitle} />)
            : (
              <>
                <VisibleTextDisplay roomTitle={roomTitle} />
                <TextAreaButton roomTitle={roomTitle} />
              </>
            )
        }
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
};

Editor.defaultProps = {
  roomIsFinished: false,
}

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.is_finished,
});

export default connect(mapStateToProps,
  { getRoomStatusConnect: getRoomStatus })(Editor);
