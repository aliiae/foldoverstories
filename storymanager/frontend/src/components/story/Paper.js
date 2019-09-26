import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVisibleText } from '../../actions/story';

const propTypes = {
  visibleText: PropTypes.string.isRequired,
  getVisibleTextConnect: PropTypes.func.isRequired,
};

export class Paper extends React.Component {
  componentDidMount() {
    const { getVisibleTextConnect } = this.props;
    getVisibleTextConnect();
  }

  render() {
    const { visibleText } = this.props;
    return (
      <>
        {visibleText ? (
          <p>
            ...
            {visibleText}
          </p>
        ) : (<p className="lead">Start your story!</p>)}
      </>
    );
  }
}

Paper.propTypes = propTypes;

const mapStateToProps = (state) => ({
  visibleText: state.story.visibleText,
});

export default connect(mapStateToProps, { getVisibleTextConnect: getVisibleText })(Paper);
