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
import { getRoomStatus } from '../../actions/room';
import LoadingSpinner from '../common/LoadingSpinner';
import { TITLE_DELIMITER, WEBSITE_TITLE } from '../../settings';

function Editor(props) {
  const {
    getRoomStatusConnect, match, roomIsFinished, userIsLoading,
  } = props;
  const roomTitle = match.params.id;

  useEffect(() => {
    getRoomStatusConnect(roomTitle);
    document.title = `${roomTitle} ${TITLE_DELIMITER} ${WEBSITE_TITLE}`;
  }, []);

  if (userIsLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Container className="editor">
      <Row className="justify-content-center">
        <Col md={7}>
          {roomIsFinished ? (<FinishedTextViewer roomTitle={roomTitle} />)
            : (
              <div className="mt-3">
                <p className="text-muted small">
                  You can invite other authors by sending this link:
                  {' '}
                  <a
                    href={window.location.href}
                    className="color-underline"
                    title="Link to this page"
                  >
                    {window.location.href}
                  </a>
                </p>
                <div className="p-3 paper">
                  <VisibleTextDisplay roomTitle={roomTitle} />
                  <TextAreaButton roomTitle={roomTitle} />
                </div>
              </div>
            )}
        </Col>
        <Col md={3}>
          <RoomUsers roomTitle={roomTitle} />
        </Col>
      </Row>
    </Container>
  );
}

Editor.propTypes = {
  match: PropTypes.shape({
    location: PropTypes.object,
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    params: PropTypes.object,
  }).isRequired,
  getRoomStatusConnect: PropTypes.func.isRequired,
  roomIsFinished: PropTypes.bool,
  userIsLoading: PropTypes.bool,
};

Editor.defaultProps = {
  roomIsFinished: false,
  userIsLoading: true,
};

const mapStateToProps = (state) => ({
  roomIsFinished: state.room.is_finished,
  userIsLoading: state.auth.isLoading,
});

export default connect(mapStateToProps,
  { getRoomStatusConnect: getRoomStatus })(Editor);
