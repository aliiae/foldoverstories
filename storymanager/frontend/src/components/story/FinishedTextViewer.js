import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readRoomTexts } from '../../actions/room';

function FinishedTextViewer(props) {
  const { readRoomTextsConnect, roomTitle, texts } = props;

  useEffect(() => {
    readRoomTextsConnect(roomTitle);
  }, [roomTitle]);

  return (
    <div className="mt-3">
      <p className="full-text">
        {texts.map((text) => <span>{text.full_text}</span>)}
      </p>
    </div>
  );
}

FinishedTextViewer.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  readRoomTextsConnect: PropTypes.func.isRequired,
  texts: PropTypes.arrayOf(PropTypes.shape({
    full_text: PropTypes.string,
    username: PropTypes.string,
  })),
};

FinishedTextViewer.defaultProps = {
  texts: [],
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.is_finished,
  texts: state.room.texts,
});

export default connect(mapStateToProps,
  { readRoomTextsConnect: readRoomTexts })(FinishedTextViewer);
