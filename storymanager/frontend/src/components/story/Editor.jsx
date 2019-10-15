import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import FinishedTextViewer from './FinishedTextViewer';
import VisibleTextDisplay from './VisibleTextDisplay';
import TextAreaButton from './TextAreaButton';
import RoomUsers from './RoomUsers';
import { authPropType, matchPropType } from '../commonPropTypes';
import { getRoomStatus } from '../../store/actions/room';
import LoadingSpinner from '../shared/LoadingSpinner';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../settings';
import useInternetStatus from '../../hooks/useInternetStatus';
import useWebsocket from '../../hooks/useWebsocket';
import CopyLinkButton from '../shared/CopyLinkButton';
import SvgLinkIcon from '../shared/SvgLinkIcon';

function InviteLink(props) {
  const { url } = props;
  return (
    <p className="text-muted small">
      You can invite other authors by sending this link:
      {' '}
      <a
        href={url}
        className="color-underline"
        title="Link to this page"
      >
        {url}
      </a>
      {' '}
      <CopyLinkButton url={url}>
        <SvgLinkIcon size={32} />
      </CopyLinkButton>
    </p>
  );
}

InviteLink.propTypes = {
  url: PropTypes.string.isRequired,
};

function Editor(props) {
  const {
    getRoomStatusConnect, match, roomIsFinished, auth, isLastTurn, usernames,
  } = props;
  const { isLoading } = auth;
  const roomTitle = match.params.id;
  const { isOnline } = useInternetStatus();
  useWebsocket({
    isOnline, user: auth.user, token: auth.token, roomTitle, roomIsFinished, usernames,
  });
  useEffect(() => {
    getRoomStatusConnect(roomTitle);
    document.title = `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, [roomTitle, isLastTurn, roomIsFinished]);

  const currentUrl = window.location.href;

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Container className="editor" data-test="editor">
      <Row className="justify-content-center">
        <Col md={3} className="order-2">
          <RoomUsers roomTitle={roomTitle} roomIsFinished={roomIsFinished} />
        </Col>
        <Col md={7}>
          {roomIsFinished || isLastTurn ? (<FinishedTextViewer roomTitle={roomTitle} />)
            : (
              <div className="mt-3">
                <InviteLink url={currentUrl} />
                <div className="p-3 paper">
                  <VisibleTextDisplay roomTitle={roomTitle} />
                  <TextAreaButton roomTitle={roomTitle} />
                </div>
              </div>
            )}
        </Col>
      </Row>
    </Container>
  );
}

Editor.propTypes = {
  match: matchPropType.isRequired,
  getRoomStatusConnect: PropTypes.func.isRequired,
  roomIsFinished: PropTypes.bool,
  isLastTurn: PropTypes.bool,
  auth: authPropType,
  usernames: PropTypes.arrayOf(PropTypes.string),
};

Editor.defaultProps = {
  roomIsFinished: null,
  isLastTurn: null,
  auth: null,
  usernames: null,
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.is_finished,
  auth: state.auth,
  lastTurn: state.story.last_turn,
  usernames: state.story.users.map((user) => user.username),
});

export default connect(mapStateToProps, { getRoomStatusConnect: getRoomStatus })(Editor);
