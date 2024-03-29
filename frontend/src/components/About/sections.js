import React, { useState } from 'react';
import Typist from 'react-typist';
import Status from '../Story/Status';
import { CAN_WRITE, WAITING, STOPPED } from '../userStatus';
import { LeaveButton } from '../Story/Editor/Buttons/LeaveRoomButton';
import SvgLinkIcon from '../UI/ShareLink/SvgLinkIcon';

let key = 0;

function Example() {
  const [visible, setVisible] = useState(false);
  const onDone = () => {
    setVisible(true);
  };
  const cursorOptions = { show: false };
  return (
    <>
      <Typist cursor={cursorOptions} onTypingDone={onDone}>
        <span>and from this the bed had been removed and thrown ⏎</span>
        <br />
        <u>into the middle of...</u>
      </Typist>
      <span className={`has-text-grey ${!visible && 'is-hidden'}`}> (this line will be visible)</span>
    </>
  );
}

const sections = [
  {
    title: 'What is Fold-over Stories?',
    key: key++,
    paragraphs: [
      <p key={key++}>
        <strong>Fold-over Stories</strong> is a creative game where players
        {' '}
        <mark>write stories one line at a time</mark>
        , with only one previous line being visible to
        the next author. Each turn, a player composes a continuation of the text based on the last
        visible line, resulting in a collaborative story.
      </p>,
      <p key={key++}>
        You can delimit what&apos;s visible and what&apos;s hidden by pressing
        the <mark>Enter</mark> key, or making a new line on mobile, while writing your
        text, <i>e.g.</i>:
      </p>,
      <div className="paper" key={key++}>
        <Example />
      </div>,
    ],
  },
  {
    title: 'Why do I need to register and login?',
    key: key++,
    paragraphs: [
      <p key={key++}>
        Created stories are <mark>not public</mark>, and each one is available only to
        its authors. The game needs you to register and sign in order to access all stories
        you&apos;ve participated in.
      </p>,
      <p key={key++}>
        <mark>Registration is simple</mark>
        {' '}
        &mdash; all you have to provide is username and password.
      </p>,
      <p key={key++}>
        Note that finished stories are available to anyone who has a link, even without
        registration.
      </p>,
    ],
  },
  {
    title: 'How do I invite friends into a story?',
    key: key++,
    paragraphs: [
      <p key={key++}>
        To invite other authors into a story, send them the
        story&apos;s <mark>link</mark> <SvgLinkIcon size={32} />,
        and your friends will be able to join the story.
      </p>,
      <p key={key++}>
        Moreover, you can invite <mark>as many friends</mark> as you like!
        If they join your story, they will be listed as authors and have access
        to the story, just like you.
      </p>,
    ],
  },
  {
    title: 'Whose turn is it to write?',
    key: key++,
    paragraphs: [
      <p key={key++}>The game applies a simple queuing strategy:</p>,
      <ol key={key++}>
        <li>Anyone can start if the story is empty.</li>
        <li>The next author is the one who joined chronologically after the previous author.</li>
      </ol>,
      <p key={key++}>You can determine whose turn it is to write by these indicators:</p>,
      <ul key={key++}>
        <li><Status item={{ userStatus: CAN_WRITE }} /> means that it is player&apos;s time to
          write.
        </li>
        <li><Status item={{ userStatus: WAITING }} /> means that the player is waiting for their
          turn.
        </li>
        <li><Status item={{ userStatus: STOPPED }} /> means that the player stopped contributing
          to the story.
        </li>
        <li><Status item={{ finishedAt: 'date' }} /> means that the story is completed.</li>
      </ul>,
    ],
  },
  {
    title: 'How do I finish a story?',
    key: key++,
    paragraphs: [
      <p key={key++}>
        If you think that story is ready to be finished or you just got tired of it,
        simply click
        the <LeaveButton aria-label="leave this story" role="img" size="small" /> button.
      </p>,
      <p key={key++}>
        When every author leaves the story, or the last remaining author submits their text,
        the story becomes finished and can be shared and read!
      </p>,
      <p key={key++}>
        To share a finished story with anyone, you can simply copy and send its corresponding link.
      </p>,
    ],
  },
];

export default sections;
