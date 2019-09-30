import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';
import { getUsers } from '../../actions/story';

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    texts_count: PropTypes.number,
  })),
  roomTitle: PropTypes.string.isRequired,
  getUsersConnect: PropTypes.func.isRequired,
};

const defaultProps = {
  users: [],
};

class RoomUsers extends React.Component {
  componentDidMount() {
    const { getUsersConnect, roomTitle } = this.props;
    getUsersConnect(roomTitle);
  }

  render() {
    const { users } = this.props;
    return (
      <div className="card mt-3">
        <div className="card-header">
          Authors
        </div>
        <div className="card-body">
          <ul className="list-unstyled card-text">
            {users.map((u) => (
              <li key={u.username}>
                {`${u.username} `}
                (
                <Pluralize singular="text" count={u.texts_count} zero="no texts yet" />
                )
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

RoomUsers.propTypes = propTypes;
RoomUsers.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  users: state.story.users,
});

export default connect(mapStateToProps, { getUsersConnect: getUsers })(RoomUsers);
