import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addRoom} from '../../actions/room';
import HumanReadableIdMaker from "./HumanReadableIds";
import RoomDashboard from "./RoomDashboard";

export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomTitle: '',
    };
    this.humanReadableIdMaker = new HumanReadableIdMaker();
    this.onClick = this.onClick.bind(this);
  }

  static propTypes = {
    addRoom: PropTypes.func.isRequired
  };

  onClick(e) {
    e.preventDefault();
    // const room_title = this.humanReadableIdMaker.random().replace(/-[^-]+$/, '');
    const room_title = this.humanReadableIdMaker.random();
    this.props.addRoom({room_title});
  }

  render() {
    const title = 'Paper Stories';
    console.log(this.state);
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">Welcome to {title}!</h1>
          <p className="lead">Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nam tincidunt, nulla quis porttitor auctor,
            sapien.</p>
          <hr className="my-4"/>
          <p>Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nam tincidunt, nulla quis porttitor auctor,
            sapien.</p>
          <p className="lead text-center">
            <Link className="btn btn-primary btn-lg" to={`/story`}
                  onClick={this.onClick}>
              Start a new story
            </Link>
          </p>
        </div>
        <RoomDashboard/>
      </div>
    )
  }
}

export default connect(null, {addRoom})(Landing);