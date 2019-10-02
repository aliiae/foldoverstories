import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getRooms } from '../../actions/room';
import RoomStatus from './RoomStatus';

const propTypes = {
  getRoomsConnect: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  rooms: [],
};

const formatTimeStamp = (dateISOString) => {
  // dd/mm/yyyy, hh:mm
  const date = new Date(dateISOString);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

class RoomDashboard extends React.Component {
  componentDidMount() {
    const { getRoomsConnect } = this.props;
    getRoomsConnect();
  }

  render() {
    const { rooms } = this.props;
    if (rooms.length === 0) return '';

    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>Story</th>
            <th>Authors</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.room_title}>
              <td>{<Link to={`/story/${room.room_title}`}>{room.room_title}</Link>}</td>
              <td>
                {room.users.map((user) => user.username)
                  .reduce((prev, curr) => [prev, ', ', curr])}
              </td>
              <td><RoomStatus room={room} /></td>
              <td>{formatTimeStamp(room.modified_at)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

RoomDashboard.propTypes = propTypes;
RoomDashboard.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  rooms: state.room.rooms,
});

export default connect(mapStateToProps, { getRoomsConnect: getRooms })(RoomDashboard);
