import React from 'react';
import Typist from 'react-typist';
import { Link } from 'react-router-dom';
import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';
import Container from 'react-bulma-components/lib/components/container';
import StartButton from '../Story/Editor/Buttons/StartButton';

function WelcomeHero() {
  const cursorOptions = { show: false };
  return (
    <Hero className="has-text-centered">
      <Hero.Body>
        <Container>
          <Heading renderAs="h1" size={1}>Welcome to Fold&#8209;over Stories</Heading>
          <Typist cursor={cursorOptions}>
            <Heading
              renderAs="p"
              subtitle
              size={5}
              className="is-family-monospace has-text-grey typist-welcome"
            >
              a creative, collaborative, storytelling game
            </Heading>
          </Typist>
          <hr className="section-break" />
          <Heading
            renderAs="p"
            subtitle
          >
            Check out
            {' '}
            <Link to="/how-to-play">how to play</Link>
            {' '}
            and start your fold-over story, by yourself or with friends!
          </Heading>
          <StartButton />
        </Container>
      </Hero.Body>
    </Hero>
  );
}

export default React.memo(WelcomeHero);
