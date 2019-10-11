import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
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

function CopyButton({ onClick }) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={(
        <Tooltip>Copy link to clipboard</Tooltip>
      )}
    >
      <Button
        className="inline-button"
        size="sm"
        variant="primary"
        onClick={onClick}
      >
        Copy
      </Button>
    </OverlayTrigger>
  );
}

CopyButton.propTypes = { onClick: PropTypes.func.isRequired };

const InviteLink = React.forwardRef((props, ref) => {
  const {
    showCopied, onClick, url,
  } = props;
  return (
    <p className="text-muted small">
      You can invite other authors by sending this link:
      {' '}
      <a
        href={window.location.href}
        className="color-underline"
        title="Link to this page"
        onClick={onClick}
      >
        {url}
      </a>
      {' '}
      <SvgLinkButton url={url} size={32} />
    </p>
  );
});

InviteLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  showCopied: PropTypes.bool.isRequired,
};

function Editor(props) {
  const {
    getRoomStatusConnect, match, roomIsFinished, auth, isLastTurn,
  } = props;
  const { userIsLoading } = auth;
  const roomTitle = match.params.id;
  const [showCopied, setShowCopied] = useState(false);
  const { isOnline } = useInternetStatus();
  useWebsocket({ isOnline, token: auth.token, roomTitle });
  useEffect(() => {
    getRoomStatusConnect(roomTitle);
    document.title = `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, [isLastTurn]);

  let dummyRef = useRef(null);
  const url = window.location.href;

  if (userIsLoading) {
    return <LoadingSpinner />;
  }

  const onClickCopy = () => {
    dummyRef.style.display = 'block';
    dummyRef.select();
    document.execCommand('copy');
    dummyRef.style.display = 'none';
    setShowCopied(true);
  };

  return (
    <Container className="editor">
      <Row className="justify-content-center">
        <Col md={7}>
          {roomIsFinished || isLastTurn ? (<FinishedTextViewer roomTitle={roomTitle} />)
            : (
              <div className="mt-3">
                <InviteLink
                  showCopied={showCopied}
                  onClick={onClickCopy}
                  url={url}
                  ref={(el) => {
                    dummyRef = el;
                  }}
                />
                <div className="p-3 paper">
                  <VisibleTextDisplay roomTitle={roomTitle} />
                  <TextAreaButton roomTitle={roomTitle} />
                </div>
              </div>
            )}
        </Col>
        <Col md={3}>
          <RoomUsers roomTitle={roomTitle} showUserStatus={!roomIsFinished} />
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

export default connect(mapStateToProps,
  { getRoomStatusConnect: getRoomStatus })(Editor);
