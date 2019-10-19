import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner(props) {
  const minOptions = {
    role: 'status',
    animation: 'border',
  };
  const options = { ...minOptions, ...props };
  return (
    <div className="spinner-container">
      <Spinner {...options}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default React.memo(LoadingSpinner);
