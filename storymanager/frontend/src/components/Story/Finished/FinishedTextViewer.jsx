import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readRoomTexts } from '../../../store/actions/room';
import ShareButtons from '../../UI/ShareLink/ShareButtons';
import { textsPropType, usersPropType } from '../../commonPropTypes';
import TextTabs from './TextTabs';

function FinishedTextViewer(props) {
  const {
    readRoomTextsConnect, roomTitle, texts, finishedAt, users,
  } = props;
  useEffect(() => {
    readRoomTextsConnect(roomTitle);
  }, [readRoomTextsConnect, roomTitle]);
  if (users) {
    const usernames = users.map((user) => user.username);
    return (
      <div className="mt-3" data-test="finished-text-viewer">
        <TextTabs texts={texts} usernames={usernames} finishedAt={finishedAt} />
        <ShareButtons url={window.location.href} />
      </div>
    );
  }
}

FinishedTextViewer.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  readRoomTextsConnect: PropTypes.func.isRequired,
  finishedAt: PropTypes.string,
  users: usersPropType,
  texts: textsPropType,
};

FinishedTextViewer.defaultProps = {
  texts: null,
  finishedAt: null,
  users: null,
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.finishedAt !== null,
  texts: state.room.texts,
  finishedAt: state.room.finishedAt,
  users: state.room.users,
});

export default connect(mapStateToProps,
  { readRoomTextsConnect: readRoomTexts })(FinishedTextViewer);
