import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { MAX_WS_RECONNECTING_ATTEMPTS, SOCKET_URL } from '../settings';
import { setWsStatus, wsClosed, wsOpened } from '../store/actions/websockets';
import { getRoomStatus } from '../store/actions/story';
import { addNotification } from '../store/actions/notifications';
import { SET_WS_STATUS } from '../store/actions/types';

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
    const dispatchStatus = () => {
      dispatchAction(setWsStatus(wsRef.current.readyState));
    };

    if (wsRef.current) wsRef.current.close();
    wsRef.current = new ReconnectingWebSocket(`${SOCKET_URL}ws/room/${roomTitle}`,
      ['access_token', accessToken],
      { maxRetries: MAX_WS_RECONNECTING_ATTEMPTS });
    wsRef.current.addEventListener('open', dispatchStatus);
    wsRef.current.addEventListener('close', dispatchStatus);
    wsRef.current.addEventListener('message', onMessage);
    wsRef.current.addEventListener('error', dispatchStatus);
    dispatchAction(setWsStatus(wsRef.current.readyState));
  }, [roomTitle, user, dispatchAction]);

  useEffect(() => {
    if (isOnline && !opened) {
      dispatchAction(wsOpened());
    } else {
      dispatchAction(wsClosed());
    }
  }, [dispatchAction, opened, isOnline, wsRef]);

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
