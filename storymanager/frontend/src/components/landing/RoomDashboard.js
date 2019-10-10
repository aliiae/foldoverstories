import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';

import { getRooms } from '../../store/actions/room';
import Status from './Status';
import { formatTimeStamp } from '../common/dateFormatters';
import { ROOMS_PER_PAGE } from '../../settings';

function RoomDashboard(props) {
  const { getRoomsConnect, rooms } = props;
  React.useEffect(() => getRoomsConnect(), []);
  const [activePageNumber, setActivePageNumber] = React.useState('1');

  const onClickPage = (e) => {
    const newPageNumber = e.target.text;
    setActivePageNumber(newPageNumber);
    getRoomsConnect(newPageNumber);
  };
  if (!rooms || !rooms.results || rooms.results.length === 0) return null;

  const { count, results } = rooms;
  const numPages = Math.ceil(count / ROOMS_PER_PAGE);
  const paginationItems = [];
  for (let number = 1; number <= numPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={String(number) === activePageNumber}
        onClick={onClickPage}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div className="dark-bg">
      <Container className="pt-3 pb-2">
        <Table hover responsive className="dashboard">
          <thead>
            <tr>
              <th scope="col" width="30%">Story</th>
              <th scope="col" width="30%">Authors</th>
              <th scope="col" className="text-center" width="10%">Status</th>
              <th scope="col" width="30%">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {results.map((room) => (
              <tr
                key={room.room_title}
                className={room.user_can_write_now ? 'table-success' : !room.is_finished ? 'table-warning' : ''}
              >
                <td className="room-link-td">
                  {<Link to={`/story/${room.room_title}`}>{room.room_title}</Link>}
                </td>
                <td>
                  {room.users.map((user) => user.username)
                    .reduce((prev, curr) => [prev, ', ', curr])}
                </td>
                <td className="text-center"><Status item={room} /></td>
                <td>{formatTimeStamp(room.modified_at)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {numPages > 1 && (
          <div className="pagination-center">
            <Pagination className="flex-wrap">
              {paginationItems}
            </Pagination>
          </div>
        )}
      </Container>
    </div>
  );
}

const propTypes = {
  getRoomsConnect: PropTypes.func.isRequired,
  rooms: PropTypes.shape({
    count: PropTypes.number,
    next: PropTypes.string,
    previous: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
  }),
};

const defaultProps = {
  rooms: null,
};

RoomDashboard.propTypes = propTypes;
RoomDashboard.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  rooms: state.room.rooms,
});

export default connect(mapStateToProps, { getRoomsConnect: getRooms })(RoomDashboard);
