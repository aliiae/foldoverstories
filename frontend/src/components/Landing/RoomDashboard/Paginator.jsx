import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

export default function Paginator({ dispatchGetRooms, numPages }) {
  const [activePage, setActivePageNumber] = React.useState(1);
  const maxSize = 5;
  const delta = 2;

  const onClickPage = (e) => {
    e.preventDefault();
    let newPageNumber;
    if (e.currentTarget.getAttribute('tag') === 'next') {
      newPageNumber = activePage + 1;
    } else if (e.currentTarget.getAttribute('tag') === 'prev') {
      newPageNumber = activePage - 1;
    } else if (e.currentTarget.text) {
      newPageNumber = Number(e.target.text);
    } else {
      return;
    }
    setActivePageNumber(newPageNumber);
    dispatchGetRooms(newPageNumber);
  };

  const right = Math.min(numPages, Math.max(activePage + delta, maxSize));
  const left = Math.max(1, Math.min(activePage - delta, right - maxSize + 1));

  const paginationItems = [];
  if (activePage > 1) {
    paginationItems.push(<Pagination.Prev key="prev" tag="prev" onClick={onClickPage} />);
  } else {
    paginationItems.push(<Pagination.Prev key="prev" onClick={onClickPage} disabled />);
  }
  for (let number = left; number <= right; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={onClickPage}
      >
        {number}
      </Pagination.Item>,
    );
  }
  if (activePage < numPages) {
    paginationItems.push(<Pagination.Next key="next" tag="next" onClick={onClickPage} />);
  } else {
    paginationItems.push(<Pagination.Next key="next" onClick={onClickPage} disabled />);
  }
  return (
    <div className="pagination-center">
      <Pagination className="flex-wrap">
        {paginationItems}
      </Pagination>
    </div>
  );
}

Paginator.propTypes = {
  dispatchGetRooms: PropTypes.func.isRequired,
  numPages: PropTypes.number.isRequired,
};
