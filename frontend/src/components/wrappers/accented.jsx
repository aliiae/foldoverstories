import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function accented(WrappedComponent, checkLocation = true, checkAuth = false) {
  return function AccentedComponent(props) {
    const [isAccented, setIsAccented] = useState(true);
    const auth = useSelector((state) => state.auth);
    const location = useLocation();
    useEffect(() => {
      if ((checkLocation && location.pathname === '/')
        && (!checkAuth || (checkAuth && (!auth || !auth.isAuthenticated)))) {
        setIsAccented(true);
      } else {
        setIsAccented(false);
      }
    }, [location, auth]);
    return (
      <WrappedComponent {...props} isAccented={isAccented} />
    );
  };
}
