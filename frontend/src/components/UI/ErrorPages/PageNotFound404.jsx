import React from 'react';
import Container from 'react-bootstrap/Container';
import AnimateLoad from '../AnimateLoad';

function PageNotFound404() {
  return (
    <Container className="error-container">
      <p className="display-1 text-center">404</p>
      <p className="display-2 text-center">not found</p>
    </Container>
  );
}

export default AnimateLoad(PageNotFound404);
