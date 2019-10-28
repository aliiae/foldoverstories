import React from 'react';
import PropTypes from 'prop-types';
import Columns from 'react-bulma-components/lib/components/columns';
import Card from 'react-bulma-components/lib/components/card';
import Section from 'react-bulma-components/lib/components/section';
import ErrorModal from './ErrorModal';

export default function CardContainer({ children }) {
  return (
    <Columns centered>
      <Columns.Column size={4}>
        <Section>
          <Card>
            <Card.Content>
              {children}
            </Card.Content>
          </Card>
        </Section>
      </Columns.Column>
      <ErrorModal />
    </Columns>
  );
}

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
