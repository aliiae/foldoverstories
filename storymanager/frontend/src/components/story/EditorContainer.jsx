import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RoomUsers from './RoomUsers';

export default function EditorContainer({ roomTitle, children }) {
  return (
    <Container className="editor" data-test="editor">
      <Row className="justify-content-center">
        <Col md={3} className="order-2">
          <RoomUsers roomTitle={roomTitle} />
        </Col>
        <Col md={7}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

EditorContainer.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
