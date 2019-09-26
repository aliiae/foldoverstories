import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRoom } from '../../actions/room';
import RoomDashboard from './RoomDashboard';

const propTypes = {
  addRoomConnect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const defaultProps = {
  isAuthenticated: false,
};

export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { addRoomConnect, isAuthenticated } = this.props;
    if (isAuthenticated) {
      addRoomConnect({});
    }
  }

  render() {
    const title = 'Paper Stories';
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">
            {`Welcome to ${title} !`}
          </h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nam tincidunt, nulla quis porttitor auctor,
            sapien.
          </p>
          <hr className="my-4" />
          <p>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nam tincidunt, nulla quis porttitor auctor,
            sapien.
          </p>
          <p className="lead text-center">
            <Link
              className="btn btn-primary btn-lg"
              to="/story"
              onClick={this.onClick}
            >
              Start a new story
            </Link>
          </p>
        </div>
        <RoomDashboard />
      </div>
    );
  }
}

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addRoomConnect: addRoom })(Landing);
