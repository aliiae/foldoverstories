import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';
import Card from 'react-bootstrap/Card';

import { getUsers } from '../../actions/story';
import Status from '../landing/Status';

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    texts_count: PropTypes.number,
  })),
  roomTitle: PropTypes.string.isRequired,
  getUsersConnect: PropTypes.func.isRequired,
  showStatus: PropTypes.bool.isRequired,
};

const defaultProps = {
  users: [],
};

function RoomUsers(props) {
  const { getUsersConnect, roomTitle, showStatus } = props;
  useEffect(() => {
    getUsersConnect(roomTitle);
  }, []);
  const { users } = props;
  return (
    <Card className="mt-3">
      <Card.Header>Authors</Card.Header>
      <Card.Body>
        <ul className="list-unstyled card-text">
          {users.map((u) => (
            <li key={u.username}>
              {showStatus && <Status item={u} />}
              {`${u.username} `}
              <span className="text-muted small">
                (<Pluralize
                singular="contribution"
                count={u.texts_count}
                zero="no contributions"
                />
                {' '}
                to the story)
              </span>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}

RoomUsers.propTypes = propTypes;
RoomUsers.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  users: state.story.users,
});

export default connect(mapStateToProps, { getUsersConnect: getUsers })(RoomUsers);
