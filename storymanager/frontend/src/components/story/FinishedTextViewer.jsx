import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { readRoomTexts } from '../../store/actions/room';
import { formatTimeStampDateOnly } from '../dateFormatters';
import ShareButtons from '../shared/ShareButtons';
import { textsPropType } from '../commonPropTypes';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Emoji } from '../landing/Status';

function TextTabs({ texts, usernames, finishedAt }) {
  const isEmpty = texts.length === 0;
  const emptyStoryMessage = (
    <span className="text-muted">
      <Emoji emoji="🐚" label="empty seashell emoji" />
      {' '}
      This story is empty.
    </span>
  );

  return (
    <Tab.Container defaultActiveKey="full">
      <Nav variant="pills" className="flex-row justify-content-end">
        <Nav.Item className="mr-auto">
          <StoryHeadline usernames={usernames} dateISOString={finishedAt} />
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="full" className="tab-pill" disabled={isEmpty}>Full Text</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="lines" className="tab-pill" disabled={isEmpty}>By Lines</Nav.Link>
        </Nav.Item>
      </Nav>
      <div>
        <Tab.Content>
          <Tab.Pane eventKey="full">
            <div className="finished-text-container paper p-2">
              <p className="full-text">
                {isEmpty && emptyStoryMessage}
                {!isEmpty && texts.map((text) => text.full_text).join(' ')}
              </p>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="lines">
            <TextLines texts={texts} />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  );
}

function TextLines({ texts }) {
  return (
    <div className="finished-text-container paper p-2">
      <Table className="table-sm text-viewer-table">
        <tbody>
        {texts.map((text) => (
          <tr key={text.username + text.id}>
            <td
              className="text-muted"
              style={{ width: '4em', border: 'none' }}
            >
              {`${text.username}:`}
            </td>
            <td style={{ border: 'none' }}>{text.full_text}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
}

function StoryHeadline({ usernames, dateISOString }) {
  function getJoinedUsernames() { // format as "user1, user2 & user3"
    return ` ${usernames.join(', ').replace(/, ([^,]*)$/, ' & $1')}`;
  }

  return (
    <h1 className="h5 story-headline">
      Story by
      {getJoinedUsernames()}
      <span className="small text-muted" style={{ display: 'block' }}>
        Finished on
        {' '}
        {formatTimeStampDateOnly(dateISOString)}
      </span>
    </h1>
  );
}

StoryHeadline.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateISOString: PropTypes.string.isRequired,
};

function FinishedTextViewer(props) {
  const {
    readRoomTextsConnect, roomTitle, texts, finishedAt, usernames,
  } = props;
  useEffect(() => {
    readRoomTextsConnect(roomTitle);
  }, []);
  if (texts === null) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-3" data-test="finished-text-viewer">
      <TextTabs texts={texts} usernames={usernames} finishedAt={finishedAt} />
      <ShareButtons url={window.location.href} />
    </div>
  );
}

FinishedTextViewer.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  readRoomTextsConnect: PropTypes.func.isRequired,
  finishedAt: PropTypes.string,
  usernames: PropTypes.arrayOf(PropTypes.string),
  texts: textsPropType,
};

FinishedTextViewer.defaultProps = {
  texts: [],
  finishedAt: null,
  usernames: [],
};

TextTabs.propTypes = {
  texts: textsPropType,
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  finishedAt: PropTypes.string.isRequired,
};
TextLines.propTypes = { texts: textsPropType };
TextTabs.defaultProps = { texts: [] };
TextLines.defaultProps = { texts: [] };

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.finished_at !== null,
  texts: state.room.texts,
  finishedAt: state.room.finished_at,
  usernames: state.story.users.map((user) => user.username),
});

export default connect(mapStateToProps,
  { readRoomTextsConnect: readRoomTexts })(FinishedTextViewer);
