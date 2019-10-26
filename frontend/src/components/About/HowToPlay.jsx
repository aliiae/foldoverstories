import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ContentWrapper from './ContentWrapper';
import Content from './Content';
import AnimateLoad from '../UI/AnimateLoad';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../settings';

function HowToPlay() {
  useEffect(() => {
    document.title = `How to Play ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, []);
  return (
    <div>
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

export default AnimateLoad(HowToPlay);
