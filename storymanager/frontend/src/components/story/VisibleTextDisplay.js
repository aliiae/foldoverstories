import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVisibleText } from '../../actions/story';

const propTypes = {
  visibleText: PropTypes.string,
  getVisibleTextConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  correctTurn: PropTypes.bool,
};

const defaultProps = {
  visibleText: '',
  correctTurn: true,
};

class VisibleTextDisplay extends React.Component {
  componentDidMount() {
    const { getVisibleTextConnect, roomTitle } = this.props;
    getVisibleTextConnect(roomTitle);
  }

  render() {
    const { visibleText, correctTurn } = this.props;
    if (!visibleText) {
      return correctTurn ? 'Start your story!' : '';
    }
    return (
      <div className="mt-3">
        <p className="visible-text lead">
          <span>
            &hellip;
            {visibleText}
          </span>
        </p>
      </div>
    );
  }
}

VisibleTextDisplay.propTypes = propTypes;
VisibleTextDisplay.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  visibleText: state.story.visible_text,
  correctTurn: state.story.correct_turn,
});

export default connect(mapStateToProps,
  { getVisibleTextConnect: getVisibleText })(VisibleTextDisplay);
