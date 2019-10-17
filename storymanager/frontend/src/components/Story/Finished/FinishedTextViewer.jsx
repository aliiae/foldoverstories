import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readRoomTexts } from '../../../store/actions/room';
import ShareButtons from '../../UI/ShareLink/ShareButtons';
import { textsPropType } from '../../commonPropTypes';
import TextTabs from './TextTabs';

function FinishedTextViewer(props) {
  const {
    readRoomTextsConnect, roomTitle, texts, finishedAt, usernames,
  } = props;
  useEffect(() => {
    readRoomTextsConnect(roomTitle);
  }, [readRoomTextsConnect, roomTitle]);

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
  texts: null,
  finishedAt: null,
  usernames: null,
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.finished_at !== null,
  texts: state.room.texts,
  finishedAt: state.room.finished_at,
  usernames: state.story.users.map((user) => user.username),
});

export default connect(mapStateToProps,
  { readRoomTextsConnect: readRoomTexts })(FinishedTextViewer);
