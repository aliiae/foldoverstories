import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';

import { getRooms } from '../../store/actions/room';
import Status from '../Story/Status';
import { formatTimeStamp } from '../dateFormatters';
import { ROOMS_PER_PAGE } from '../../settings';
import { authPropType } from '../commonPropTypes';

function RoomDashboard(props) {
  const { getRoomsConnect, rooms } = props;
  useEffect(() => getRoomsConnect(), [getRoomsConnect]);
  const [activePageNumber, setActivePageNumber] = React.useState('1');

  const onClickPage = (e) => {
    const newPageNumber = e.target.text;
    setActivePageNumber(newPageNumber);
    getRoomsConnect(newPageNumber);
  };
  if (!rooms || !('results' in rooms) || rooms.results.length === 0) return null;
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
        <Table hover responsive className="dashboard" data-test="dashboard">
          <thead>
            <tr>
              <th scope="col" width="40%">Story</th>
              <th scope="col" width="20%">Authors</th>
              <th scope="col" className="text-center" width="10%">Status</th>
              <th scope="col" width="30%">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {results.map((room) => (
              <tr
                key={room.roomTitle}
                className={!room.userLeftRoom && room.userCanWriteNow ? 'table-success'
                  : !room.finishedAt ? 'table-warning' : ''}
              >
                <td className="room-link-td">
                  {<Link to={`/story/${room.roomTitle}`}>{room.roomTitle}</Link>}
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
