import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { addRoom, clearRoomTitle } from '../../store/actions/room';

function StartButton(props) {
  const {
    addRoomConnect, isAuthenticated, roomTitle, classNames,
  } = props;
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated && roomTitle) {
      history.push(`/story/${roomTitle}`);
    }
  }, [roomTitle, isAuthenticated]);
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
        className={classNames}
        variant="primary"
        size="lg"
        type="button"
        onClick={onClick}
        data-test="start-new-story-button"
      >
        Start a new story
      </Button>
    </>
  );
}

StartButton.propTypes = {
  addRoomConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  roomTitle: PropTypes.string,
  classNames: PropTypes.string,
};
StartButton.defaultProps = {
  isAuthenticated: false,
  roomTitle: '',
  classNames: 'start-button shadow-button',
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  roomTitle: state.room.room_title,
});

export default withRouter(connect(mapStateToProps,
  { addRoomConnect: addRoom, clearRoomTitleConnect: clearRoomTitle })(StartButton));
