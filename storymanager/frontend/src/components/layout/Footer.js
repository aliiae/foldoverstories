import React from 'react';
import Container from 'react-bootstrap/Container';

import { Emoji } from '../landing/RoomStatus';

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="text-center">
        &copy; 2019
        {new Date().getFullYear() > 2019 && document.write(`-${new Date().getFullYear()}`)}
        ,
        {' '}
        <a href="mailto:#">alii&#230;</a>
        {' '}
        <Emoji emoji="📧" label="email icon emoji" title="Drop an email!" />
      </Container>
    </footer>
  );
};
