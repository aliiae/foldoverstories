import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVisibleText } from '../../actions/story';

const propTypes = {
  visibleText: PropTypes.string,
  getVisibleTextConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  correctTurn: PropTypes.bool,
  userFinished: PropTypes.bool,
};

const defaultProps = {
  visibleText: '',
  correctTurn: true,
  userFinished: false,
};

class VisibleTextDisplay extends React.Component {
  componentDidMount() {
    const { getVisibleTextConnect, roomTitle } = this.props;
    getVisibleTextConnect(roomTitle);
  }

  render() {
    const { visibleText, correctTurn, userFinished } = this.props;
    if (userFinished) {
      return '';
    }
    if (correctTurn && !visibleText) {
      return <span className="lead text-muted">Start your story!</span>;
    }
    return (
      <p className="visible-text lead">
        <span className="visible-text">
          {visibleText ? (
            <span>
              &hellip;
              {visibleText}
            </span>
          )
            : ''}
        </span>
      </p>
    );
  }
}

VisibleTextDisplay.propTypes = propTypes;
VisibleTextDisplay.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  visibleText: state.story.visible_text,
  correctTurn: state.story.correct_turn,
  userFinished: state.room.user_left_room,
});

export default connect(mapStateToProps,
  { getVisibleTextConnect: getVisibleText })(VisibleTextDisplay);
