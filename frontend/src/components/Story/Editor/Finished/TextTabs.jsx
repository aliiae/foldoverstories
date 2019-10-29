import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-bulma-components/lib/components/tabs';
import TextLines from './TextLines';
import StoryHeadline from './StoryHeadline';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import { Emoji } from '../../Status';
import { textsPropType } from '../../../commonPropTypes';

const emptyStoryMessage = (
  <span className="has-text-grey">
    <Emoji emoji="🐚" label="empty seashell emoji" />
    {' '}
    This story is empty.
  </span>
);

function FullText({ texts }) {
  const isEmpty = texts.length === 0;
  return (
    <div>
      <div className="finished-text-container paper">
        <p className="full-text">
          {isEmpty ? emptyStoryMessage : texts.map((text) => text.fullText).join(' ')}
        </p>
      </div>
    </div>
  );
}

FullText.propTypes = { texts: textsPropType };
FullText.defaultProps = { texts: [] };

function TabsButtons({ activeKey, tabs, onClick }) {
  const tabsHtml = [];
  Object.entries(tabs).forEach(([tag, tab]) => {
    tabsHtml.push((
      <Tabs.Tab
        active={activeKey === tag}
        onClick={onClick}
        tag={tag}
        key={tag}
      >
        {tab.title}
      </Tabs.Tab>
    ));
  });

  return (
    <Tabs type="toggle" align="right">
      {tabsHtml}
    </Tabs>
  );
}

TabsButtons.propTypes = {
  activeKey: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tabs: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default function TextTabs({ texts, usernames, finishedAt }) {
  const [activeKey, setActiveKey] = useState('full');

  if (texts === null) {
    return <LoadingSpinner />;
  }
  const isEmpty = texts.length === 0;
  const tabs = {
    full: {
      title: 'Full Text',
      text: <FullText texts={texts} />,
    },
  };
  if (!isEmpty) {
    tabs.lines = {
      title: 'By Lines',
      text: <TextLines texts={texts} />,
    };
  }

  const toggleTabs = (e) => {
    const tag = e.currentTarget.getAttribute('tag');
    if (tag in tabs) {
      setActiveKey(tag);
    }
  };

  return (
    <>
      <div className="tabs-panel">
        <StoryHeadline usernames={usernames} dateISOString={finishedAt} />
        <TabsButtons texts={texts} activeKey={activeKey} tabs={tabs} onClick={toggleTabs} />
      </div>
      {tabs[activeKey].text}
    </>
  );
}

TextTabs.propTypes = {
  texts: textsPropType,
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  finishedAt: PropTypes.string.isRequired,
};
TextTabs.defaultProps = { texts: null };
