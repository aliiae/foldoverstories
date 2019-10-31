import React from 'react';
import PropTypes from 'prop-types';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';

export default function TwoColsContainer({ children }) {
  return (
    <Section>
      <Columns className="editor" centered>
        <Columns.Column size={6}>
          {children[0]}
        </Columns.Column>
        <Columns.Column size={3}>
          {children[1]}
        </Columns.Column>
      </Columns>
    </Section>
  );
}

TwoColsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
