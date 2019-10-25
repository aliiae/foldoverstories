import React from 'react';
import PropTypes from 'prop-types';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import TextLines from './TextLines';
import StoryHeadline from './StoryHeadline';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import { Emoji } from '../../Status';
import { textsPropType } from '../../../commonPropTypes';

export default function TextTabs({ texts, usernames, finishedAt }) {
  if (texts === null) {
    return <LoadingSpinner />;
  }
  const isEmpty = texts.length === 0;
  const emptyStoryMessage = (
    <span className="text-muted">
      <Emoji emoji="🐚" label="empty seashell emoji" />
      {' '}
      This story is empty.
    </span>
  );

  return (
    <Tab.Container defaultActiveKey="full">
      <Nav variant="pills" className="flex-row justify-content-end">
        <Nav.Item className="mr-auto">
          <StoryHeadline usernames={usernames} dateISOString={finishedAt} />
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="full" className="tab-pill" disabled={isEmpty}>Full Text</Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-2 mb-lg-0">
          <Nav.Link eventKey="lines" className="tab-pill" disabled={isEmpty}>
            By Lines
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div>
        <Tab.Content>
          <Tab.Pane eventKey="full">
            <div className="finished-text-container paper p-2">
              <p className="full-text">
                {isEmpty && emptyStoryMessage}
                {!isEmpty && texts.map((text) => text.fullText)
                  .join(' ')}
              </p>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="lines">
            <TextLines texts={texts} />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  );
}

TextTabs.propTypes = {
  texts: textsPropType,
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  finishedAt: PropTypes.string.isRequired,
};
TextTabs.defaultProps = { texts: null };
