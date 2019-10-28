import React from 'react';
import Loader from 'react-bulma-components/lib/components/loader';

function LoadingSpinner(props) {
  const minOptions = {
    role: 'status',
    animation: 'border',
  };
  const options = { ...minOptions, ...props };
  return (
    <div className="spinner-container">
      <Loader {...options}>
        <span className="is-sr-only">Loading...</span>
      </Loader>
    </div>
  );
}

export default React.memo(LoadingSpinner);
