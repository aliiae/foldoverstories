import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import Pagination from 'react-bulma-components/lib/components/pagination'; // import needed styles


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
      newPageNumber = Number(e.currentTarget.text);
    } else {
      return;
    }
    setActivePageNumber(newPageNumber);
    dispatchGetRooms(newPageNumber);
  };

  const right = Math.min(numPages, Math.max(activePage + delta, maxSize));
  const left = Math.max(1, Math.min(activePage - delta, right - maxSize + 1));

  const paginationItems = [];
  paginationItems.push((
    <li key="prev">
      <a
        role="navigation"
        type="button"
        className="pagination-previous"
        tag="prev"
        aria-label="Go to previous page"
        disabled={activePage <= 1}
        onClick={onClickPage}
      >
        «
        <span className="is-sr-only">Previous</span>
      </a>
    </li>
  ));

  for (let number = left; number <= right; number++) {
    paginationItems.push((
      <li key={number}>
        <a
          role="navigation"
          type="button"
          className={`pagination-link ${number === activePage && 'is-current'}`}
          aria-label={`Page ${number}`}
          onClick={onClickPage}
        >
          {number}
        </a>
      </li>
    ));
  }
  paginationItems.push((
    <li key="next">
      <a
        role="navigation"
        type="button"
        className="pagination-next"
        tag="next"
        disabled={activePage >= numPages}
        aria-label="Go to next page"
        onClick={onClickPage}
      >
        »
        <span className="is-sr-only">Next</span>
      </a>
    </li>
  ));
  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <ul className="pagination-list">
        {paginationItems}
      </ul>
    </nav>
  );
}

Paginator.propTypes = {
  dispatchGetRooms: PropTypes.func.isRequired,
  numPages: PropTypes.number.isRequired,
};
