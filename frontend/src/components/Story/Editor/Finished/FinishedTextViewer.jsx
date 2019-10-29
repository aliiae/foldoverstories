import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readRoomTexts } from '../../../../store/actions/story';
import ShareButtons from '../../../UI/ShareLink/ShareButtons';
import { textsPropType, usersPropType } from '../../../commonPropTypes';
import TextTabs from './TextTabs';
import LoadingSpinner from '../../../UI/LoadingSpinner';

function FinishedTextViewer(props) {
  const {
    dispatchReadRoomTexts, roomTitle, texts, finishedAt, users,
  } = props;
  useEffect(() => {
    dispatchReadRoomTexts(roomTitle);
  }, [dispatchReadRoomTexts, roomTitle]);
  if (finishedAt === null) {
    return <LoadingSpinner />;
  }
  if (users) {
    const usernames = users.map((user) => user.username);
    return (
      <div data-test="finished-text-viewer">
        <TextTabs texts={texts} usernames={usernames} finishedAt={finishedAt} />
        <ShareButtons url={window.location.href} />
      </div>
    );
  }
}

FinishedTextViewer.propTypes = {
  roomTitle: PropTypes.string.isRequired,
  dispatchReadRoomTexts: PropTypes.func.isRequired,
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
  roomIsFinished: state.story.finishedAt !== null,
  texts: state.story.texts,
  finishedAt: state.story.finishedAt,
  users: state.story.users,
});
const mapDispatchToProps = { dispatchReadRoomTexts: readRoomTexts };

export default connect(mapStateToProps, mapDispatchToProps)(FinishedTextViewer);
