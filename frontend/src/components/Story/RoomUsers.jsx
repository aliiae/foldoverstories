import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';
import Card from 'react-bootstrap/Card';
import Status from './Status';

const propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    textsCount: PropTypes.number,
  })),
  roomIsFinished: PropTypes.bool,
};

const defaultProps = {
  users: [],
  roomIsFinished: null,
};

function RoomUsers(props) {
  const { roomIsFinished, users } = props;
  if (!users || users.length === 0) {
    return null;
  }
  return (
    <Card className="mt-5">
      <Card.Header>Authors</Card.Header>
      <Card.Body>
        <ul className="list-unstyled card-text">
          {users.map((u) => (
            <li key={u.username}>
              {!roomIsFinished && <Status item={u} />}
              {`${u.username} `}
              <span className="text-muted small">
                (
                <Pluralize
                  singular="contribution"
                  count={u.textsCount}
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
  roomIsFinished: state.story.finishedAt !== null,
});

export default connect(mapStateToProps)(RoomUsers);
