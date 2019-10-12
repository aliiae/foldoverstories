import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { addRoom, clearRoomTitle } from '../../store/actions/room';

function StartButton(props) {
  const {
    addRoomConnect, clearRoomTitleConnect, isAuthenticated, roomTitle,
  } = props;
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated && roomTitle) {
      history.push(`/story/${roomTitle}`);
      clearRoomTitleConnect();
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
        className="start-button shadow-button"
        variant="primary"
        size="lg"
        type="button"
        onClick={onClick}
      >
        Start a new story
      </Button>
    </>
  );
}

StartButton.propTypes = {
  addRoomConnect: PropTypes.func.isRequired,
  clearRoomTitleConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  roomTitle: PropTypes.string,
};
StartButton.defaultProps = {
  isAuthenticated: false,
  roomTitle: '',
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  roomTitle: state.room.room_title,
});

export default withRouter(connect(mapStateToProps,
  { addRoomConnect: addRoom, clearRoomTitleConnect: clearRoomTitle })(StartButton));
