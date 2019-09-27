import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVisibleText } from '../../actions/story';

const propTypes = {
  visibleText: PropTypes.string,
  getVisibleTextConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
};

const defaultProps = {
  visibleText: '',
};

class TextDisplay extends React.Component {
  componentDidMount() {
    const { getVisibleTextConnect, roomTitle } = this.props;
    getVisibleTextConnect(roomTitle);
  }

  render() {
    console.log(this.props);
    const { visibleText } = this.props;
    return (
      <>
        {visibleText ? (
          <p className="visible-text">
            &hellip;
            {`${visibleText}`}
          </p>
        ) : (<p className="lead">Start your story!</p>)}
      </>
    );
  }
}

TextDisplay.propTypes = propTypes;
TextDisplay.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  visibleText: state.story.visible_text,
});

export default connect(mapStateToProps, { getVisibleTextConnect: getVisibleText })(TextDisplay);
