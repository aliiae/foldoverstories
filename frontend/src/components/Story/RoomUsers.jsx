import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';
import Card from 'react-bulma-components/lib/components/card';
import Section from 'react-bulma-components/lib/components/section';
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
    <Section>
      <Card>
        <Card.Header>
          <Card.Header.Title renderAs="h2">Authors</Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <ul className="list-unstyled card-text">
            {users.map((u) => (
              <li key={u.username}>
                {!roomIsFinished && <Status item={u} />}
                {!roomIsFinished && ' '}
                {`${u.username} `}
                <span className="has-text-grey small">
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
        </Card.Content>
      </Card>
    </Section>
  );
}

RoomUsers.propTypes = propTypes;
RoomUsers.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  users: state.story.users,
  roomIsFinished: state.story.finishedAt !== null,
});

export default connect(mapStateToProps)(RoomUsers);
