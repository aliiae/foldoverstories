import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userOnline, userOffline } from '../store/actions/websockets';

const useInternetStatus = () => {
  const dispatchAction = useDispatch();
  const isOnline = useSelector((state) => state.websockets.isOnline);

  useEffect(() => {
    const handleOnline = () => {
      dispatchAction(userOnline());
    };
    const handleOffline = () => {
      dispatchAction(userOffline());
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return function cleanup() {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatchAction]);
  return { isOnline };
};

export default useInternetStatus;
