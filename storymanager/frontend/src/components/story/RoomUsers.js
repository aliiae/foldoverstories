import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../actions/story';

const propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string),
  roomTitle: PropTypes.string.isRequired,
  getUsersConnect: PropTypes.func.isRequired,
};

const defaultProps = {
  usernames: [],
};

class RoomUsers extends React.Component {
  componentDidMount() {
    const { getUsersConnect, roomTitle } = this.props;
    getUsersConnect(roomTitle);
  }

  render() {
    const { usernames } = this.props;
    return (
      <div className="card mt-3">
        <div className="card-header">
          Authors
        </div>
        <div className="card-body">
          <ul className="list-unstyled card-text">
            {usernames.map((username) => <li key={username}>{username}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

RoomUsers.propTypes = propTypes;
RoomUsers.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  usernames: state.story.usernames,
});

export default connect(mapStateToProps, { getUsersConnect: getUsers })(RoomUsers);
