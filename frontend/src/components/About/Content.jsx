import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import sections from './sections';

export default function Content() {
  return (
    <Accordion defaultActiveKey={0}>
      {sections.map((section, i) => (
        <Card key={section.key} bg="light">
          <Accordion.Toggle as={Card.Header} eventKey={i}>
            <h2 className="h5 card-about-title">{section.title}</h2>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i}>
            <Card.Body>
              {section.img && <Card.Img variant="bottom" src={section.img} />}
              {section.paragraphs}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
}
