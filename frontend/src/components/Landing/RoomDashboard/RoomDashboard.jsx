import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bulma-components/lib/components/table';

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
    <>
      <div className="table-container">
        <Table className="dashboard" data-test="dashboard" striped={false}>
          <thead>
            <tr>
              <th scope="col" width="30%">Story</th>
              <th scope="col" className="has-text-centered" width="10%">Status</th>
              <th scope="col" width="25%">Authors</th>
              <th scope="col" width="30%">Updated</th>
            </tr>
          </thead>
          <tbody>
            {results.map((room) => (
              <tr key={room.roomTitle}>
                <td className="room-link-td">
                  <Link to={`/story/${room.roomTitle}`}>{room.roomTitle}</Link>
                </td>
                <td className="has-text-centered">
                  <Status item={room} />
                </td>
                <td>
                  {room.users.map((user) => user.username)
                    .reduce((prev, curr) => [prev, ', ', curr])}
                </td>
                <td>{formatTimeStamp(room.modifiedAt)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {numPages > 1 && (
        <Paginator dispatchGetRooms={dispatchGetRooms} numPages={numPages} />
      )}
    </>
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
