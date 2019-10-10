import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVisibleText } from '../../store/actions/story';
import room from '../../store/reducers/room';

const propTypes = {
  visibleText: PropTypes.string,
  getVisibleTextConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  correctTurn: PropTypes.bool,
  userFinished: PropTypes.bool,
  wsStatus: PropTypes.string,
};

const defaultProps = {
  visibleText: '',
  correctTurn: true,
  userFinished: false,
  wsStatus: null,
};

function VisibleTextDisplay(props) {
  const { getVisibleTextConnect, roomTitle, wsStatus } = props;
  useEffect(() => {
    getVisibleTextConnect(roomTitle);
  }, [roomTitle, wsStatus]);
  const { visibleText, correctTurn, userFinished } = props;
  if (userFinished) {
    return '';
  }
  if (correctTurn && !visibleText) {
    return (
      <div className="visible-text pl-2">
        <p className="lead text-muted">Start your story! ↓</p>
      </div>
    );
  }
  if (visibleText) {
    return (
      <div className="visible-text pl-2">
        <p className="visible-text-lead lead">{visibleText}</p>
      </div>
    );
  }
  return null;
}

VisibleTextDisplay.propTypes = propTypes;
VisibleTextDisplay.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  visibleText: state.story.visible_text,
  correctTurn: state.story.correct_turn,
  userFinished: state.room.user_left_room,
  wsStatus: state.websockets.ws.status,
});

export default connect(mapStateToProps,
  { getVisibleTextConnect: getVisibleText })(VisibleTextDisplay);
