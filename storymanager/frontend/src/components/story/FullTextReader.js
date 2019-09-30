import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readRoomTexts } from '../../actions/room';

function FullTextReader(props) {
  const { readRoomTextsConnect, roomTitle } = props;

  useEffect(() => {
    readRoomTextsConnect(roomTitle);
  }, [props.roomTitle]);

  return (
    <div className="mt-3">
      <p className="full-text">
        {
        props.texts.map((text) => text.full_text)
        }
      </p>
    </div>
  );
}

FullTextReader.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  readRoomTextsConnect: PropTypes.func.isRequired,
  texts: PropTypes.arrayOf(PropTypes.shape({
    full_text: PropTypes.string,
    username: PropTypes.string,
  })),
};

FullTextReader.defaultProps = {
  texts: [],
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.is_finished,
  texts: state.room.texts,
});

export default connect(mapStateToProps,
  { readRoomTextsConnect: readRoomTexts })(FullTextReader);
