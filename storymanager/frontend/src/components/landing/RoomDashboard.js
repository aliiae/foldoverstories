import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {getRooms} from "../../actions/room";
import PropTypes from "prop-types";

class RoomDashboard extends React.Component {
  static propTypes = {
    getRooms: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    const {rooms} = this.props;
    if (rooms.length === 0) return '';
    return (
      <Fragment>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Story</th>
            <th>Authors</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {rooms.map(room => {
            return (
              <tr key={room.id}>
                <td>{room.room_title}</td>
                <td>{room.users}</td>
                <td>{room.created_at}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  rooms: state.room.rooms
});

export default connect(mapStateToProps, {getRooms})(RoomDashboard);