import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { SOCKET_URL, TITLE_DELIMITER } from '../settings';
import { wsClosed, wsOpened } from '../store/actions/websockets';
import { getRoomStatus, getVisibleText } from '../store/actions/story';
import { addNotification } from '../store/actions/notifications';

const MAX_WS_RECONNECTING_ATTEMPTS = 5;
const useWebsocket = (props) => {
  const opened = useSelector((state) => state.websockets.ws.opened);
  const wsRef = useRef(null);
  const dispatchAction = useDispatch();

  const {
    isOnline, token, roomTitle, user, roomIsFinished, usernames,
  } = props;

  function dispatchNotification(message, text, title) {
    dispatchAction(addNotification(
      {
        text,
        title,
        username: 'username' in message ? message.username : null,
        sender: user ? user.username : '',
        time: new Date(),
      },
    ));
  }

  function dispatchAllActions() {
    dispatchAction(getRoomStatus(roomTitle));
  }

  const receiveMessage = (messageObject) => {
    const message = JSON.parse(messageObject.data);
    switch (message.type) {
      case 'room.text':
        dispatchAllActions();
        dispatchNotification(message, `${message.username} added text to the ${roomTitle} story`,
          `${roomTitle} ${TITLE_DELIMITER} new text`);
        break;
      case 'room.leave':
        dispatchAllActions();
        dispatchNotification(message,
          `${message.username} finished their part in the ${roomTitle} story`,
          `${roomTitle} ${TITLE_DELIMITER} user finished`);
        break;
      case 'room.join':
        dispatchAllActions();
        dispatchNotification(message,
          `${message.username} joined the ${roomTitle} story`,
          `${roomTitle} ${TITLE_DELIMITER} user joined`);
        break;
      case 'room.finish':
        dispatchAllActions();
        dispatchNotification(message, `${roomTitle} is finished and ready to be read!`,
          `${roomTitle} is finished`);
        wsRef.current.close();
        break;
      default:
        console.error(message);
    }
  };
  const onMessage = (msg) => {
    receiveMessage(msg);
  };

  const initWebsocket = useCallback((accessToken) => {
    if (wsRef.current) wsRef.current.close();
    wsRef.current = new ReconnectingWebSocket(`${SOCKET_URL}ws/room/${roomTitle}`,
      ['access_token', accessToken],
      { maxRetries: MAX_WS_RECONNECTING_ATTEMPTS });
    wsRef.current.addEventListener('message', onMessage);
  }, [onMessage, roomTitle]);

  useEffect(() => {
    if (isOnline && !opened) {
      dispatchAction(wsOpened());
    } else if (!isOnline && opened) {
      dispatchAction(wsClosed());
    }
  }, [dispatchAction, opened, isOnline]);

  useEffect(() => {
    if (wsRef.current || roomIsFinished) {
      return;
    }
    if (!user || !usernames || !usernames.includes(user.username)) {
      return;
    }
    initWebsocket(token);
  }, [initWebsocket, roomIsFinished, usernames, token, user]);

  return {
    ws: wsRef.current,
    opened,
    receiveMessage,
    initWebsocket,
  };
};

export default useWebsocket;
