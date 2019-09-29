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

class TextDisplay extends React.Component {
  componentDidMount() {
    const { getVisibleTextConnect, roomTitle } = this.props;
    getVisibleTextConnect(roomTitle);
  }

  render() {
    const { visibleText, correctTurn } = this.props;
    return (
      <div className="mt-3">
        <p className="visible-text lead">
          {visibleText ? <span>&hellip;{visibleText}</span>
            : correctTurn ? 'Start your story!' : 'Waiting for the next author...'}
        </p>
      </div>
    );
  }
}

TextDisplay.propTypes = propTypes;
TextDisplay.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  visibleText: state.story.visible_text,
  correctTurn: state.story.correct_turn,
});

export default connect(mapStateToProps, { getVisibleTextConnect: getVisibleText })(TextDisplay);
