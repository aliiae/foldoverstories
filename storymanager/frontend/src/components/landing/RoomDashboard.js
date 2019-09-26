import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRooms } from '../../actions/room';

const propTypes = {
  getRoomsConnect: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf.isRequired,
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
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Story</th>
            <th>Authors</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.roomTitle}</td>
              <td>{room.users}</td>
              <td>{room.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

RoomDashboard.propTypes = propTypes;

const mapStateToProps = (state) => ({
  getRoomsConnect: state.room.rooms,
});

export default connect(mapStateToProps, { getRoomsConnect: getRooms })(RoomDashboard);
