import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { addRoom } from '../../actions/room';

const propTypes = {
  addRoomConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  roomTitle: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const defaultProps = {
  isAuthenticated: false,
  roomTitle: '',
};


class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { addRoomConnect, isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      addRoomConnect({});
    } else {
      history.push('/login');
    }
  }

  render() {
    const { roomTitle, isAuthenticated } = this.props;
    return (
      <>
        <Button variant="primary" size="lg" type="button" onClick={this.onClick}>
          Start a new story
        </Button>
        {roomTitle && isAuthenticated ? <Redirect to={`/story/${roomTitle}`} /> : ''}
      </>
    );
  }
}

StartButton.propTypes = propTypes;
StartButton.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  roomTitle: state.room.room_title,
});

export default withRouter(connect(mapStateToProps, { addRoomConnect: addRoom })(StartButton));
