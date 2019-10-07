import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

export default function HowToPlay() {
  return (
    <div className="dark-bg">
      <Container className="pt-3 pb-3">
        <Col md={8} className="m-auto">
          <div className="p-3 illustrated-text-card">
            <h1 className="text-center">How to Play</h1>
            <section>
              <h2>What is Fold-over Stories?</h2>
              <p>
                Fold-over Stories implements a storytelling game
                similar to the parlour game called &ldquo;conseqeuences&rdquo;
                or fold-over stories often used in language learning.
              </p>
              <p>
                Only last line is visible.
                <hr className="section-break" />
              </p>
            </section>

            <section>
              <h2>Why do I need to register and login?</h2>
              <p>
                Since stories are not public, i.e. each one is available only to its authors,
                the game needs you to register and sign in order to access all stories
                you&apos;ve participated in.
              </p>
              <p>
                Registration is simple &mdash; all you have to provide is username and password.
                <hr className="section-break" />
              </p>
            </section>
            <section>
              <h2>How many friends can I invite into a story?</h2>
              <p>
                You can invite as many friends as you like!
                If they join your story, they will be listed as authors and have access
                to the story, just like you.
                <hr className="section-break" />
              </p>
            </section>
            <section>
              <h2>Whose turn is it to write?</h2>
              <p>
                Queueing + emojis
                <hr className="section-break" />
              </p>
            </section>
            <section>
              <h2>How do I finish a story?</h2>
              <p>
                ...
              </p>
            </section>
          </div>
        </Col>
      </Container>
    </div>
  );
}
