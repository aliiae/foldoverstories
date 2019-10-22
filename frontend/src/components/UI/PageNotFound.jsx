import React from 'react';
import Container from 'react-bootstrap/Container';

export default function PageNotFound() {
  return (
    <Container className="not-found">
      <p className="display-1 text-center">404</p>
      <p className="display-2 text-center">not found</p>
    </Container>
  );
}
