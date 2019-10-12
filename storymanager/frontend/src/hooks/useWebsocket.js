import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { SOCKET_URL } from '../settings';
import { wsClosed, wsOpened } from '../store/actions/websockets';
import { getUsers, getVisibleText } from '../store/actions/story';
import { getRoomStatus } from '../store/actions/room';
import { addNotification } from '../store/actions/notifications';

const NUM_WS_RECONNECTING_ATTEMPTS = 5;
const useWebsocket = (props) => {
  const opened = useSelector((state) => state.websockets.ws.opened);
  const wsRef = useRef(null);
  const dispatchAction = useDispatch();

  const sendMessage = useCallback(
    (message) => {
      wsRef.current.send(message);
    }, [wsRef],
  );
  const {
    isOnline, token, roomTitle, user, roomIsFinished,
  } = props;

  function dispatchNotification(message, text) {
    dispatchAction(addNotification(
      {
        text,
        username: 'username' in message ? message.username : null,
        sender: user ? user.username : '',
        time: new Date(),
      },
    ));
  }

  const receiveMessage = (messageObject) => {
    const message = JSON.parse(messageObject.data);
    console.log(message);
    switch (message.type) {
      case 'room.text':
        dispatchAction(getUsers(roomTitle));
        dispatchAction(getVisibleText(roomTitle));
        dispatchAction(getRoomStatus(roomTitle));
        dispatchAction(getUsers(roomTitle));
        dispatchNotification(message, `${message.username} added text to the ${roomTitle} story`);
        break;
      case 'room.leave':
        dispatchAction(getUsers(roomTitle));
        dispatchAction(getVisibleText(roomTitle));
        dispatchAction(getRoomStatus(roomTitle));
        dispatchNotification(message, `${message.username} left the ${roomTitle} story`);
        break;
      case 'room.join':
        dispatchAction(getUsers(roomTitle));
        dispatchAction(getVisibleText(roomTitle));
        dispatchAction(getRoomStatus(roomTitle));
        dispatchNotification(message, `${message.username} joined the ${roomTitle} story`);
        break;
      case 'room.finish':
        dispatchAction(getUsers(roomTitle));
        dispatchAction(getVisibleText(roomTitle));
        dispatchAction(getRoomStatus(roomTitle));
        dispatchNotification(message, `${roomTitle} is finished and ready to be read!`);
        wsRef.current.close();
        break;
      default:
        console.error(message);
    }
  };
  const onMessage = (msg) => {
    receiveMessage(msg);
  };

  const initWebsocket = (accessToken) => {
    if (wsRef.current) wsRef.current.close();
    wsRef.current = new ReconnectingWebSocket(`${SOCKET_URL}ws/room/${roomTitle}`,
      ['access_token', accessToken]);
    wsRef.current.maxReconnectAttempts = NUM_WS_RECONNECTING_ATTEMPTS;
    wsRef.current.addEventListener('message', onMessage);
  };

  useEffect(() => {
    if (isOnline && !opened) {
      dispatchAction(wsOpened());
    } else if (!isOnline && opened) {
      dispatchAction(wsClosed());
    }
  }, [isOnline]);

  useEffect(() => {
    // make sure that roomIsFinished to loaded (not null)
    if (!wsRef.current && (user && (roomIsFinished !== null && !roomIsFinished))) {
      console.log('connecting ws');
      initWebsocket(token);
    }
  }, [initWebsocket, user]);

  return {
    ws: wsRef.current,
    opened,
    sendMessage,
    receiveMessage,
  };
};

export default useWebsocket;
