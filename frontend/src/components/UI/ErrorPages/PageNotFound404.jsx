import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import AnimateLoad from '../AnimateLoad';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';

function PageNotFound404() {
  useEffect(() => {
    document.title = `Not Found ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, []);
  return (
    <Container className="error-container">
      <p className="display-1 text-center">404</p>
      <p className="display-2 text-center">not found</p>
    </Container>
  );
}

export default AnimateLoad(PageNotFound404);
