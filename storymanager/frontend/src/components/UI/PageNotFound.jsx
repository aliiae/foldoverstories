import React from 'react';
import Container from 'react-bootstrap/Container';

export default function PageNotFound() {
  return (
    <Container className="not-found">
      <p className="display-1">404</p>
      <p className="display-2">not found</p>
    </Container>
  );
}
