import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { addRoom } from '../../store/actions/room';
import { Emoji } from './Status';

function StartButton(props) {
  const {
    addRoomConnect, isAuthenticated, history, roomTitle,
  } = props;
  const onClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      addRoomConnect({});
    } else {
      history.push('/login');
    }
  };
  return (
    <>
      <Button
        className="start-button shadow-button"
        variant="primary"
        size="lg"
        type="button"
        onClick={onClick}
      >
        Start a new story
      </Button>
      {roomTitle && isAuthenticated ? <Redirect to={`/story/${roomTitle}`} /> : ''}
    </>
  );
}

StartButton.propTypes = {
  addRoomConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  roomTitle: PropTypes.string,
  history: PropTypes.object.isRequired,
};
StartButton.defaultProps = {
  isAuthenticated: false,
  roomTitle: '',
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  roomTitle: state.room.room_title,
});

export default withRouter(connect(mapStateToProps, { addRoomConnect: addRoom })(StartButton));
