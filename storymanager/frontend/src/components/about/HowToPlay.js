import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function HowToPlay() {
  return (
    <Container className="mt-3">
      <Col md={8} className="m-auto">
        <Card className="p-3 illustrated-text-card">
          <Card.Text>
            <h2>What is Fold-over Stories?</h2>
            <p>
              Fold-over Stories implements a storytelling game
              similar to the parlour game called &ldquo;conseqeuences&rdquo;
              or fold-over stories often used for language learning.
            </p>
            <p>
              Only last line is visible.
            </p>
            <hr className="section-break" />
            <h2>Why do I need to register and login?</h2>
            <p>
              Since stories are not public, i.e. each one is available only to its authors,
              the game needs you to register and sign in order to access all stories
              you&apos;ve participated in.
            </p>
            <p>
              Registration is simple &mdash; all you have to provide is username and password.
            </p>
            <hr className="section-break" />
            <h2>How many friends can I invite into a story?</h2>
            You can invite as many friends as you like!
            If they join your story, they will be listed as authors.
            <hr className="section-break" />
            <h2>Whose turn is it to write?</h2>
            <p>
              Queueing + emojis
            </p>
            <hr className="section-break" />
            <h2>How do I finish a story?</h2>
          </Card.Text>

        </Card>
      </Col>
    </Container>
  );
}
