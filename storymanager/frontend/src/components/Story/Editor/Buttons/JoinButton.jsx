import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUserIntoRoom } from '../../../../store/actions/story';

function JoinButton(props) {
  const {
    dispatchAddUserIntoRoom, roomTitle, isAuthenticated,
  } = props;
  const onClick = () => {
    dispatchAddUserIntoRoom(roomTitle);
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
  dispatchAddUserIntoRoom: PropTypes.func.isRequired,
  roomTitle: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
};
JoinButton.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = { dispatchAddUserIntoRoom: addUserIntoRoom };

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(JoinButton));
