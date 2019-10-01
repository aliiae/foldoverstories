import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';
import Card from 'react-bootstrap/Card';

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
      <Card className="mt-3">
        <Card.Header>Authors</Card.Header>
        <Card.Body>
          <ul className="list-unstyled card-text">
            {users.map((u) => (
              <li key={u.username}>
                {`${u.username} `}
                <span className="text-muted">
                  (
                  <Pluralize singular="text" count={u.texts_count} zero="no texts yet" />
                  )
                </span>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    );
  }
}

RoomUsers.propTypes = propTypes;
RoomUsers.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  users: state.story.users,
});

export default connect(mapStateToProps, { getUsersConnect: getUsers })(RoomUsers);
