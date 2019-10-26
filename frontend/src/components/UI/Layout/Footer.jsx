import React from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <footer className="footer">
      <Container className="text-center">
        <small>
          Copyright 2019
          {new Date().getFullYear() > 2019 && document.write(`-${new Date().getFullYear()}`)}
          {' '}
          &copy;
          {' '}
          Fold-over Stories.
          {' '}
          <a href="mailto:#">Contact</a>
          .
        </small>
      </Container>
    </footer>
  );
}

export default React.memo(Footer);
