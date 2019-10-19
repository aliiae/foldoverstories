import React from 'react';
import Button from 'react-bootstrap/Button';
import StartNewStoryWrapper from '../StartNewStoryWrapper';

export default function StartButton() {
  return (
    <StartNewStoryWrapper>
      <Button
        variant="primary"
        className="start-button shadow-button"
        size="lg"
        type="button"
      >
        Start a new story
      </Button>
    </StartNewStoryWrapper>
  );
}
