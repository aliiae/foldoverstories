import React, { useEffect } from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import AnimateLoad from '../../wrappers/animateLoad';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';

function PageNotFound404() {
  useEffect(() => {
    document.title = `404 Not Found ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, []);
  return (
    <Container className="error-container content is-vcentered full-page">
      <div className="m-auto has-text-centered">
        <Heading renderAs="h1" size={1}>404</Heading>
        <Heading subtitle renderAs="p" size={1}>not found</Heading>
      </div>
    </Container>
  );
}

export default AnimateLoad(PageNotFound404);
