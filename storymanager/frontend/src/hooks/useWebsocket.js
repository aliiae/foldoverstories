import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SOCKET_URL } from '../settings';
import { wsClosed, wsOpened } from '../store/actions/websockets';
import { getUsers, getVisibleText } from '../store/actions/story';
import { getRoomStatus } from '../store/actions/room';


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
    console.log(message.msg_type);
    switch (message.msg_type) {
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
        console.log(message);
    }
  };

  const onMessage = (msg) => {
    receiveMessage(msg);
  };
  const onOpen = () => {
    console.log('WS client opened');
  };
  const onClose = () => {
    console.log('WS client closed');
    if (wsRef.current) {
      wsRef.current.close();
    }
  };
  const onError = () => {
    console.log('WS client errored');
  };
  useEffect(() => {
    if (isOnline && !opened) {
      dispatchAction(wsOpened());
    } else if (!isOnline && opened) {
      dispatchAction(wsClosed());
    }
  }, [isOnline, dispatchAction, opened]);

  const initWebsocket = (accessToken) => {
    if (wsRef.current) wsRef.current.close();
    wsRef.current = new WebSocket(`${SOCKET_URL}ws/room/${roomTitle}`,
      ['access_token', accessToken]);
    wsRef.current.addEventListener('message', onMessage);
    wsRef.current.addEventListener('open', onOpen);
    wsRef.current.addEventListener('close', onClose);
    wsRef.current.addEventListener('error', onError);
  };
  const endWebsocket = () => {
    if (wsRef.current) {
      wsRef.current.removeEventListener('message', onMessage);
      wsRef.current.removeEventListener('open', onOpen);
      wsRef.current.removeEventListener('close', onClose);
      wsRef.current.removeEventListener('error', onError);
      wsRef.current.close();
    }
  };

  useEffect(() => {
    if (!wsRef.current) initWebsocket(token);
  }, [initWebsocket, endWebsocket]);

  return {
    ws: wsRef.current,
    opened,
    sendMessage,
    receiveMessage,
  };
};

export default useWebsocket;
