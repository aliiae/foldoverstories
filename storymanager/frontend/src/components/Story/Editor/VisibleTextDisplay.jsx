import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVisibleText } from '../../../store/actions/story';
import LoadingSpinner from '../../UI/LoadingSpinner';


function VisibleTextDisplay({ isNewUser, roomTitle, ...props }) {
  const {
    getVisibleTextConnect, userCanWriteNow, visibleText, userFinished,
  } = props;
  const correctTurn = userCanWriteNow || isNewUser;
  useEffect(() => {
    if (correctTurn) {
      getVisibleTextConnect(roomTitle);
    }
  }, [getVisibleTextConnect, roomTitle]);

  if (userFinished || correctTurn === false) {
    return null;
  }
  if (correctTurn && visibleText === null) {
    return <LoadingSpinner />;
  }
  if (correctTurn && visibleText === '') {
    return (
      <div className="visible-text pl-2">
        <p className="lead text-muted" data-test="start-this-story">
          There is nothing yet. Start this story! ↓
        </p>
      </div>
    );
  }
  if (correctTurn && visibleText) {
    return (
      <div className="visible-text pl-2">
        <p className="visible-text-lead lead" data-test="visible-text">{visibleText}</p>
      </div>
    );
  }
}

VisibleTextDisplay.propTypes = {
  isNewUser: PropTypes.bool.isRequired,
  visibleText: PropTypes.string,
  getVisibleTextConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  userFinished: PropTypes.bool,
  userCanWriteNow: PropTypes.bool,
};
VisibleTextDisplay.defaultProps = {
  visibleText: null,
  userFinished: null,
  userCanWriteNow: null,
};

const mapStateToProps = (state) => ({
  visibleText: state.story.visibleText,
  userCanWriteNow: state.room.userCanWriteNow,
  userFinished: state.room.userLeftRoom,
  wsStatus: state.websockets.ws.status,
});

export default connect(mapStateToProps,
  { getVisibleTextConnect: getVisibleText })(VisibleTextDisplay);
