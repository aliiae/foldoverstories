import React from 'react';
import Tile from 'react-bulma-components/lib/components/tile';
import Heading from 'react-bulma-components/lib/components/heading';
// eslint-disable-next-line no-unused-vars
import Box from 'react-bulma-components/lib/components/box'; // import box styles
import sections from './sections';

export default function Content() {
  const tiles = sections.map((section) => (
    <Tile renderAs="section" kind="child" color="info" key={section.key} className="box">
      <Heading renderAs="h2" size={5} className="card-about-title">{section.title}</Heading>
      {section.paragraphs}
    </Tile>
  ));
  return (
    <>
      <Tile kind="ancestor" renderAs="article">
        <Tile kind="parent">
          {tiles[0]}
        </Tile>
      </Tile>
      <Tile kind="ancestor">
        <Tile kind="parent" vertical>
          {tiles[1]}
          {tiles[3]}
        </Tile>
        <Tile kind="parent" vertical>
          {tiles[2]}
          {tiles[4]}
        </Tile>
      </Tile>
    </>
  );
}
