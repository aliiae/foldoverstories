import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import sections from './sections';

export default function Content() {
  return (
    <Accordion defaultActiveKey="0">
      {sections.map((section, i) => (
        <Card key={section.key}>
          <Accordion.Toggle as={Card.Header} eventKey={i}>
            {section.title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i}>
            <Card.Body>
              {section.paragraphs}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}
