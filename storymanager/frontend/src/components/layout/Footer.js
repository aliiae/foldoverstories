import React from 'react';
import Container from 'react-bootstrap/Container';

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="text-center">
        &copy; 2019
        {new Date().getFullYear() > 2019 && document.write(`-${new Date().getFullYear()}`)}
        ,
        {' '}
        <a href="mailto:#">alii&#230;</a>
        .
      </Container>
    </footer>
  );
};
