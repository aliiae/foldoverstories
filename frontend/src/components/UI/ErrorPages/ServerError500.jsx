import React, { useEffect } from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import { Emoji } from '../../Story/Status';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../../settings';

export default function ServerError500() {
  useEffect(() => {
    document.title = `500 Server Error ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, []);
  return (
    <Container className="error-container content is-vcentered full-page">
      <div className="m-auto has-text-centered">
        <Heading renderAs="h1" size={1}><Emoji emoji="🥴" /> 500</Heading>
        <Heading subtitle renderAs="p" size={1}>server error</Heading>
      </div>
    </Container>
  );
}
