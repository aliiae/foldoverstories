import React from 'react';
import PropTypes from 'prop-types';
import Content from 'react-bulma-components/lib/components/content';
import Section from 'react-bulma-components/lib/components/section';
import Heading from 'react-bulma-components/lib/components/heading';

export default function ContentWrapper({ children }) {
  return (
    <Section renderAs="article">
      <Heading className="has-text-centered">How to Play</Heading>
      <Content>
        {children}
      </Content>
    </Section>
  );
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
