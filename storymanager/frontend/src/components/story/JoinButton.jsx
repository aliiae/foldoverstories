import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUserIntoRoom } from '../../store/actions/room';

function JoinButton(props) {
  const {
    addUserIntoRoomConnect, roomTitle, isAuthenticated,
  } = props;
  const onClick = () => {
    addUserIntoRoomConnect(roomTitle);
  };

  return (
    <>
      <Link
        className="btn btn-warning btn-sm mt-3 shadow-button"
        onClick={onClick}
        to={isAuthenticated ? `/story/${roomTitle}` : '/login'}
      >
        Join
      </Link>
    </>
  );
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
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addUserIntoRoomConnect: addUserIntoRoom })(JoinButton);
