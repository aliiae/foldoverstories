import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getRooms } from '../../actions/room';
import RoomStatus from './RoomStatus';
import { formatTimeStamp } from '../common/dateFormatters';

const propTypes = {
  getRoomsConnect: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  rooms: [],
};

function RoomDashboard(props) {
  const { getRoomsConnect, rooms } = props;
  useEffect(() => getRoomsConnect(), []);

  if (rooms.length === 0) return <></>;
  return (
    <Table hover>
      <thead>
        <tr>
          <th scope="col">Story</th>
          <th scope="col">Authors</th>
          <th scope="col" className="text-center">Status</th>
          <th scope="col">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr
            key={room.room_title}
            className={room.user_can_write_now ? 'table-success' : 'table-active'}
          >
            <td>{<Link to={`/story/${room.room_title}`}>{room.room_title}</Link>}</td>
            <td>
              {room.users.map((user) => user.username)
                .reduce((prev, curr) => [prev, ', ', curr])}
            </td>
            <td className="text-center"><RoomStatus room={room} /></td>
            <td>{formatTimeStamp(room.modified_at)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

RoomDashboard.propTypes = propTypes;
RoomDashboard.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  rooms: state.room.rooms,
});

export default connect(mapStateToProps, { getRoomsConnect: getRooms })(RoomDashboard);
