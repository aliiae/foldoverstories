import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { CAN_WRITE, STOPPED } from '../../userStatus';
import { userStatusPropType } from '../../commonPropTypes';

function VisibleTextDisplay({ isNewUser, roomTitle, ...props }) {
  const { visibleText, userStatus } = props;

  const correctTurn = userStatus === CAN_WRITE || isNewUser;
  if (userStatus === STOPPED || correctTurn === false) {
    return null;
  }
  if (correctTurn && visibleText === null) {
    return <LoadingSpinner />;
  }
  if (correctTurn && visibleText === '') {
    return (
      <div className="visible-text pl-2">
        <p className="lead has-text-grey" data-test="start-this-story">
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
  roomTitle: PropTypes.string.isRequired,
  userStatus: userStatusPropType,
};
VisibleTextDisplay.defaultProps = {
  visibleText: null,
  userStatus: null,
};

const mapStateToProps = (state) => ({
  visibleText: state.story.visibleText,
  userStatus: state.story.userStatus,
});

export default connect(mapStateToProps)(VisibleTextDisplay);
