import React from 'react';
import Container from 'react-bootstrap/Container';
import { Emoji } from '../../Story/Status';

export default function ServerError500() {
  return (
    <Container className="error-container">
      <p className="display-1 text-center">
        <Emoji emoji="🥴" /> 500
      </p>
      <p className="display-3 text-center">something went wrong</p>
    </Container>
  );
}
