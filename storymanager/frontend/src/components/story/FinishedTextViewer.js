import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TelegramShareButton from 'react-share/lib/TelegramShareButton';
import TelegramIcon from 'react-share/lib/TelegramIcon';
import EmailShareButton from 'react-share/lib/EmailShareButton';
import EmailIcon from 'react-share/lib/EmailIcon';
import { readRoomTexts } from '../../actions/room';
import { formatTimeStampDateOnly } from '../common/dateFormatters';
import ShareButtons from './ShareButtons';

function FinishedTextViewer(props) {
  const {
    readRoomTextsConnect, roomTitle, texts, finishedAt, usernames,
  } = props;
  useEffect(() => {
    readRoomTextsConnect(roomTitle);
  }, [roomTitle]);
  return (
    <div className="mt-3">
      <p className="h5">
        Story by
        {` ${usernames.join(', ')}`}
        <p className="small text-muted">
          Finished on
          {' '}
          {formatTimeStampDateOnly(finishedAt)}
        </p>
      </p>
      <p className="full-text">
        {texts.map((text, i) => <span key={`${text.username}_${i}`}>{text.full_text}</span>)}
      </p>
      <ShareButtons url={window.location.href} />
    </div>
  );
}

FinishedTextViewer.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  readRoomTextsConnect: PropTypes.func.isRequired,
  finishedAt: PropTypes.string,
  usernames: PropTypes.arrayOf(PropTypes.string),
  texts: PropTypes.arrayOf(PropTypes.shape({
    full_text: PropTypes.string,
    username: PropTypes.string,
  })),
};

FinishedTextViewer.defaultProps = {
  texts: [],
  finishedAt: null,
  usernames: [],
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.is_finished,
  texts: state.room.texts,
  finishedAt: state.room.finished_at,
  usernames: state.story.users.map((user) => user.username),
});

export default connect(mapStateToProps,
  { readRoomTextsConnect: readRoomTexts })(FinishedTextViewer);
