import React, { useEffect } from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import ContentWrapper from './ContentWrapper';
import Content from './Content';
import AnimateLoad from '../wrappers/animateLoad';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../settings';

function HowToPlay() {
  useEffect(() => {
    document.title = `How to Play ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, []);
  return (
    <Columns centered>
      <Columns.Column size={8}>
        <ContentWrapper>
          <Content />
        </ContentWrapper>
      </Columns.Column>
    </Columns>
  );
}

export default AnimateLoad(HowToPlay);
