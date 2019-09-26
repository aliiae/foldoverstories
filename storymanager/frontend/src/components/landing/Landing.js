import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRoom } from '../../actions/room';
import HumanReadableIdMaker from './HumanReadableIds';
import RoomDashboard from './RoomDashboard';

const propTypes = {
  addRoomConnect: PropTypes.func.isRequired,
};

export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.humanReadableIdMaker = new HumanReadableIdMaker();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { addRoomConnect } = this.props;
    // const roomTitle = this.humanReadableIdMaker.random().replace(/-[^-]+$/, '');
    const roomTitle = this.humanReadableIdMaker.random();
    addRoomConnect({ room_title: roomTitle });
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

export default connect(null, { addRoomConnect: addRoom })(Landing);
