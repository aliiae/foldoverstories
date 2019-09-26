import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRooms } from '../../actions/room';

const propTypes = {
  getRoomsConnect: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  rooms: [],
};

const formatDate = (dateISOString) => {
  const date = new Date(dateISOString);
  return date.toLocaleDateString();
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
      <>
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
                <td>
                  {<Link to={`/story/${room.room_title}`}>{room.room_title}</Link>}
                </td>
                <td>{room.users.map((user) => <span key={user.id}>{user.username}</span>)}</td>
                {}
                <td>{formatDate(room.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

RoomDashboard.propTypes = propTypes;
RoomDashboard.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  rooms: state.room.rooms,
});

export default connect(mapStateToProps, { getRoomsConnect: getRooms })(RoomDashboard);
