import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';
import { addUserIntoRoom } from '../../../../store/actions/story';

function JoinButton(props) {
  const history = useHistory();
  const {
    dispatchAddUserIntoRoom, roomTitle, isAuthenticated,
  } = props;
  const onClick = () => {
    if (isAuthenticated) {
      dispatchAddUserIntoRoom(roomTitle);
      history.push(`/story/${roomTitle}`);
    } else {
      history.push('/login');
    }
  };

  return (
    <Button.Group hasAddons={false}>
      <Button color="warning" onClick={onClick} type="button" className="editor-button">
        Join
      </Button>
    </Button.Group>
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
