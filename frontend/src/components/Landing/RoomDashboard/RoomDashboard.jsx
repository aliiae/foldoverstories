import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import { getRooms } from '../../../store/actions/room';
import Status from '../../Story/Status';
import { formatTimeStamp } from '../../dateFormatters';
import { ROOMS_PER_PAGE } from '../../../settings';
import Paginator from './Paginator';

function RoomDashboard(props) {
  const { dispatchGetRooms, rooms } = props;
  useEffect(() => dispatchGetRooms(), [dispatchGetRooms]);
  if (!rooms || !('results' in rooms) || rooms.results.length === 0) {
    return null;
  }
  const { count, results } = rooms;
  const numPages = Math.ceil(count / ROOMS_PER_PAGE);

  return (
    <div className="dark-bg">
      <Container className="pt-3 pb-2">
        <div className="responsive d-block d-md-table">
          <Table hover className="dashboard" data-test="dashboard">
            <thead>
              <tr>
                <th scope="col" width="45%">Story</th>
                <th scope="col" width="20%">Authors</th>
                <th scope="col" className="text-center" width="5%">Status</th>
                <th scope="col" width="30%">Updated</th>
              </tr>
            </thead>
            <tbody>
              {results.map((room) => (
                <tr
                  key={room.roomTitle}
                  className={room.userStatus !== 'STOPPED'
                  && room.userStatus === 'CAN_WRITE' ? 'table-success'
                    : !room.finishedAt ? 'table-warning' : ''}
                >
                  <td className="room-link-td">
                    <Link to={`/story/${room.roomTitle}`}>{room.roomTitle}</Link>
                  </td>
                  <td>
                    {room.users.map((user) => user.username)
                      .reduce((prev, curr) => [prev, ', ', curr])}
                  </td>
                  <td className="text-center"><Status item={room} /></td>
                  <td>{formatTimeStamp(room.modifiedAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {numPages > 1 && (
          <Paginator dispatchGetRooms={dispatchGetRooms} numPages={numPages} />
        )}
      </Container>
    </div>
  );
}

RoomDashboard.propTypes = {
  dispatchGetRooms: PropTypes.func.isRequired,
  rooms: PropTypes.shape({
    count: PropTypes.number,
    next: PropTypes.string,
    previous: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
  }),
};
RoomDashboard.defaultProps = {
  rooms: null,
};

const mapStateToProps = (state) => ({
  rooms: state.room.rooms,
});
const mapDispatchToProps = { dispatchGetRooms: getRooms };

export default connect(mapStateToProps, mapDispatchToProps)(RoomDashboard);
