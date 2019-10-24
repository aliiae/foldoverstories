import React from 'react';
import Container from 'react-bootstrap/Container';

export default function PageNotFound404() {
  return (
    <Container className="error-container">
      <p className="display-1 text-center">404</p>
      <p className="display-2 text-center">not found</p>
    </Container>
  );
}
