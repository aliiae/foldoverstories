import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { readRoomTexts } from '../../actions/room';
import { formatTimeStampDateOnly } from '../common/dateFormatters';
import ShareButtons from './ShareButtons';
import { textsPropType } from '../common/commonPropTypes';
import Nav from 'react-bootstrap/Nav';

function TextTabs({ texts, usernames, finishedAt }) {
  return (
    <Tab.Container defaultActiveKey="full">
      <div>
        <Nav variant="pills" className="flex-row justify-content-end">
          <Nav.Item className="mr-auto">
            <StoryHeadline usernames={usernames} dateISOString={finishedAt} />
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="full">Full Text</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="lines">By Lines</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div>
        <Tab.Content>
          <Tab.Pane eventKey="full">
            <p className="full-text">
              {texts.map((text, i) => <span key={`${text.username}_${i}`}>{text.full_text}</span>)}
            </p>
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
    <Table className="table-sm">
      <tbody>
      {texts.map((text, i) => (
        <tr key={text.username + i}>
          <td className="text-muted" style={{ width: '5em', border: 'none' }}>{`${text.username}:`}</td>
          <td style={{ border: 'none' }}>{text.full_text}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

function StoryHeadline({ usernames, dateISOString }) {
  return (
    <p className="h5">
      Story by
      {` ${usernames.join(', ').replace(/, ([^,]*)$/, ' & $1')}`}
      <p className="small text-muted">
        Finished on
        {' '}
        {formatTimeStampDateOnly(dateISOString)}
      </p>
    </p>
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
  return (
    <div className="mt-3">
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
  roomIsFinished: state.room.is_finished,
  texts: state.room.texts,
  finishedAt: state.room.finished_at,
  usernames: state.story.users.map((user) => user.username),
});

export default connect(mapStateToProps,
  { readRoomTextsConnect: readRoomTexts })(FinishedTextViewer);
