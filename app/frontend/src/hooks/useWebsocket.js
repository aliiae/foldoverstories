import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { MAX_WS_RECONNECTING_ATTEMPTS, SOCKET_URL } from '../settings';
import { wsClosed, wsOpened } from '../store/actions/websockets';
import { getRoomStatus } from '../store/actions/story';
import { addNotification } from '../store/actions/notifications';

const useWebsocket = (props) => {
  const opened = useSelector((state) => state.websockets.ws.opened);
  const wsRef = useRef(null);
  const dispatchAction = useDispatch();

  const {
    isOnline, token, roomTitle, user, roomIsFinished, usernames,
  } = props;

  const initWebsocket = useCallback((accessToken) => {
    const dispatchNotification = (message) => {
      dispatchAction(addNotification(
        {
          message,
          roomTitle,
          username: 'username' in message ? message.username : '',
          sender: user ? user.username : '',
          time: new Date(),
        },
      ));
    };

    const wsCommands = ['room.text', 'room.leave', 'room.join', 'room.finish'];
    const receiveMessage = (messageObject) => {
      const message = JSON.parse(messageObject.data);
      if (wsCommands.includes(message.type)) {
        dispatchAction(getRoomStatus(roomTitle));
        dispatchNotification(message);
      }
    };

    const onMessage = (msg) => {
      receiveMessage(msg);
    };

    if (wsRef.current) wsRef.current.close();
    wsRef.current = new ReconnectingWebSocket(`${SOCKET_URL}ws/room/${roomTitle}`,
      ['access_token', accessToken],
      { maxRetries: MAX_WS_RECONNECTING_ATTEMPTS });
    wsRef.current.addEventListener('message', onMessage);
  }, [roomTitle, user, dispatchAction]);

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
    initWebsocket,
  };
};

export default useWebsocket;
