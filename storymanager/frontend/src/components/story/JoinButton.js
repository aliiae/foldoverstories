import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUserIntoRoom } from '../../actions/room';

class JoinButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { addUserIntoRoomConnect, roomTitle } = this.props;
    addUserIntoRoomConnect(roomTitle);
  }

  render() {
    const { isAuthenticated, roomTitle } = this.props;
    return (
      <>
        <Link
          className="btn btn-warning btn-sm mt-3"
          onClick={this.onClick}
          to={isAuthenticated ? `/story/${roomTitle}` : '/login'}
        >
          Join
        </Link>
      </>
    );
  }
}

JoinButton.propTypes = {
  addUserIntoRoomConnect: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
};

JoinButton.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => ({
  usernames: state.story.usernames,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addUserIntoRoomConnect: addUserIntoRoom })(JoinButton);
