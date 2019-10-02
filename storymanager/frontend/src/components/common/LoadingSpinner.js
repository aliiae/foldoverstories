import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner() {
  return (
    <div className="mt-3">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}
