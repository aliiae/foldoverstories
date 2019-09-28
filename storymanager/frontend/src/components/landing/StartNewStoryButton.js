import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRoom } from '../../actions/room';

const propTypes = {
  addRoomConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  roomTitle: PropTypes.string,
};

const defaultProps = {
  isAuthenticated: false,
  roomTitle: '',
};


class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { addRoomConnect, isAuthenticated } = this.props;
    if (isAuthenticated) {
      addRoomConnect({});
    }
  }

  render() {
    const { roomTitle, isAuthenticated } = this.props;
    return (
      <>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={this.onClick}
        >
          Start a new story
        </button>
        {roomTitle && isAuthenticated ? <Redirect to={`/story/${roomTitle}`} /> : ''}
      </>
    );
  }
}

StartButton.propTypes = propTypes;
StartButton.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  roomTitle: state.room.room_title,
});

export default withRouter(connect(mapStateToProps, { addRoomConnect: addRoom })(StartButton));
