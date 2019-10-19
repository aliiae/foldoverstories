import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRoom } from '../../../store/actions/room';

function StartNewStoryWrapper({ children, ...props }) {
  const {
    dispatchAddRoom, isAuthenticated,
  } = props;

  const history = useHistory();

  const onClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatchAddRoom()
        .then((roomTitle) => {
          if (roomTitle) {
            history.push(`/story/${roomTitle}`);
          }
        });
    } else {
      history.push('/login');
    }
  };
  return (
    <>
      {React.Children.map(children, (child) => (React.cloneElement(child, { onClick })))}
    </>
  );
}

StartNewStoryWrapper.propTypes = {
  dispatchAddRoom: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  roomTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};
StartNewStoryWrapper.defaultProps = {
  isAuthenticated: null,
  roomTitle: null,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  roomTitle: state.room.roomTitle,
});
const mapDispatchToProps = { dispatchAddRoom: addRoom };

export default connect(mapStateToProps, mapDispatchToProps)(StartNewStoryWrapper);
