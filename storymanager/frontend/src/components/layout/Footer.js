import React from 'react';
import Container from 'react-bootstrap/Container';

import { Emoji } from '../landing/Status';

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="text-center">
        Copyright 2019
        {new Date().getFullYear() > 2019 && document.write(`-${new Date().getFullYear()}`)}
        {' '}
        &copy;
        {' '}
        alii&#230;
        {'. '}
        <a href="mailto:#">Email</a>
        .
      </Container>
    </footer>
  );
}
