import React from 'react';
import PropTypes from 'prop-types';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';

export default function TwoColsContainer({ children }) {
  return (
    <Columns className="editor" centered>
      <Columns.Column size={7}>
        <Section renderAs="div">
          {children[0]}
        </Section>
      </Columns.Column>
      <Columns.Column size={3}>
        {children[1]}
      </Columns.Column>
    </Columns>
  );
}

TwoColsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
