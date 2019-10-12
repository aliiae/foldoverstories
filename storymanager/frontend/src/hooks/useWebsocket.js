import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { SOCKET_URL } from '../settings';
import { wsClosed, wsOpened } from '../store/actions/websockets';
import { getUsers, getVisibleText } from '../store/actions/story';
import { getRoomStatus } from '../store/actions/room';

const NUM_WS_RECONNECTING_ATTEMPTS = 5;
const useWebsocket = ({ isOnline, token, roomTitle }) => {
  const opened = useSelector((state) => state.websockets.ws.opened);
  const wsRef = useRef(null);
  const dispatchAction = useDispatch();

  const sendMessage = useCallback(
    (message) => {
      wsRef.current.send(message);
    }, [wsRef],
  );

  const receiveMessage = (messageObject) => {
    const message = JSON.parse(messageObject.data);
    console.log(message);
    switch (message.type) {
      case 'room.text':
        dispatchAction(getUsers(roomTitle));
        dispatchAction(getVisibleText(roomTitle));
        dispatchAction(getRoomStatus(roomTitle));
        dispatchAction(getUsers(roomTitle));
        break;
      case 'room.leave':
      case 'room.join':
      case 'room.finish':
        dispatchAction(getUsers(roomTitle));
        dispatchAction(getVisibleText(roomTitle));
        dispatchAction(getRoomStatus(roomTitle));
        break;
      default:
        // pass
        console.error(message);
    }
  };

  const onMessage = (msg) => {
    receiveMessage(msg);
  };

  useEffect(() => {
    if (isOnline && !opened) {
      dispatchAction(wsOpened());
    } else if (!isOnline && opened) {
      dispatchAction(wsClosed());
    }
    return () => {
      wsRef.current.close();
    };
  }, [isOnline]);

  const initWebsocket = (accessToken) => {
    if (wsRef.current) wsRef.current.close();
    wsRef.current = new ReconnectingWebSocket(`${SOCKET_URL}ws/room/${roomTitle}`,
      ['access_token', accessToken]);
    wsRef.current.maxReconnectAttempts = NUM_WS_RECONNECTING_ATTEMPTS;
    wsRef.current.addEventListener('message', onMessage);
  };

  useEffect(() => {
    if (!wsRef.current) initWebsocket(token);
  }, [initWebsocket]);

  return {
    ws: wsRef.current,
    opened,
    sendMessage,
    receiveMessage,
  };
};

export default useWebsocket;
