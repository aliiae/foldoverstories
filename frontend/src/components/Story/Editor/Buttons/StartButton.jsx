import React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import StartNewStoryWrapper from '../StartNewStoryWrapper';

export default function StartButton() {
  return (
    <StartNewStoryWrapper>
      <Button
        color="primary"
        size="large"
        rounded
      >
        Start a new story
      </Button>
    </StartNewStoryWrapper>
  );
}
