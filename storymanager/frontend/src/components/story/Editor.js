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
import { authPropType, matchPropType } from '../common/commonPropTypes';
import { getRoomStatus } from '../../store/actions/room';
import LoadingSpinner from '../common/LoadingSpinner';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../settings';
import useInternetStatus from '../../hooks/useInternetStatus';
import useWebsocket from '../../hooks/useWebsocket';
import SvgLinkButton from '../layout/SvgLinkButton';

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
      <SvgLinkButton url={url} size={32} />
    </p>
  );
}

InviteLink.propTypes = {
  url: PropTypes.string.isRequired,
};

function Editor(props) {
  const {
    getRoomStatusConnect, match, roomIsFinished, auth, isLastTurn,
  } = props;
  const { isAuthenticated } = auth;
  const roomTitle = match.params.id;
  const { isOnline } = useInternetStatus();
  useWebsocket({ isOnline, token: auth.token, roomTitle });
  useEffect(() => {
    getRoomStatusConnect(roomTitle);
    document.title = `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, [isLastTurn]);

  const currentUrl = window.location.href;

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="editor">
      <Row className="justify-content-center">
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
        <Col md={3}>
          <RoomUsers roomTitle={roomTitle} roomIsFinished={roomIsFinished} />
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
};

Editor.defaultProps = {
  roomIsFinished: false,
  isLastTurn: false,
  auth: null,
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.is_finished,
  auth: state.auth,
  lastTurn: state.story.last_turn,
});

export default connect(mapStateToProps, { getRoomStatusConnect: getRoomStatus })(Editor);
