import React from 'react';
import Typist from 'react-typist';
import { Link } from 'react-router-dom';
import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';
import StartButton from '../Story/Editor/Buttons/StartButton';

function WelcomeHero() {
  const cursorOptions = { show: false };
  return (
    <Hero className="has-text-centered">
      <Hero.Body>
        <Heading renderAs="h1" size={1}>Welcome to Fold&#8209;over Stories</Heading>
        <Typist cursor={cursorOptions}>
          <Heading
            renderAs="p"
            subtitle
            size={5}
            className="is-family-monospace"
          >
            a creative, collaborative, storytelling game
          </Heading>
        </Typist>
        <hr className="section-break" />
        <p>
          Check out
          {' '}
          <Link to="/how-to-play">how to play</Link>
          {' '}
          and start your fold-over story, by yourself or with friends!
        </p>
        <p>
          <StartButton />
        </p>
      </Hero.Body>
    </Hero>
  );
}

export default React.memo(WelcomeHero);
