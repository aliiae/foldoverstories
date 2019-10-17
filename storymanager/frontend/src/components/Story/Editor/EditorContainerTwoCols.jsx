import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EditorContainerTwoCols({ children }) {
  return (
    <Container className="editor" data-test="editor">
      <Row className="justify-content-center">
        <Col md={3} className="order-2">
          {children[0]}
        </Col>
        <Col md={7}>
          {children[1]}
        </Col>
      </Row>
    </Container>
  );
}

EditorContainerTwoCols.propTypes = {
  children: PropTypes.node.isRequired,
};
