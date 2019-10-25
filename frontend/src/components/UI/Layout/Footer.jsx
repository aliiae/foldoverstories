import React from 'react';
import Container from 'react-bootstrap/Container';

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="text-center">
        Copyright 2019
        {new Date().getFullYear() > 2019 && document.write(`-${new Date().getFullYear()}`)}
        {' '}
        &copy;
        {' '}
        Fold-over Stories.
        {' '}
        <a href="mailto:#">Contact</a>
        .
      </Container>
    </footer>
  );
}
