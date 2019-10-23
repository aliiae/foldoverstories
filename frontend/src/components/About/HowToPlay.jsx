import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ContentWrapper from './ContentWrapper';
import Content from './Content';

export default function HowToPlay() {
  return (
    <div className="dark-bg">
      <Container className="pt-3 pb-3">
        <Col md={8} className="m-auto">
          <ContentWrapper>
            <Content />
          </ContentWrapper>
        </Col>
      </Container>
    </div>
  );
}
