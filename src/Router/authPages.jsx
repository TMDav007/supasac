import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { USER_ROLE } from '../constants/authConstant';

const AuthPages = () => {
  const { user } = useSelector((state) => state?.auth);

  // const dispatch = useDispatch();
  const location = useLocation();

  const isAdminOnAuthPage = location.pathname === '/admin-signin';

  // useEffect(() => {
  //   if (userData) return;

  //   //dispatch(setCredentials(user?.data));
  // }, [userData, dispatch]);

  if (!user && !isAdminOnAuthPage) {
    return (
      <Navigate
        to="/admin-signin"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (user?.role === USER_ROLE.ADMIN && isAdminOnAuthPage) {
    console.log('');
    return <Navigate to={location.state?.from || '/admin/dashboard'} replace />;
  }

  return <Outlet />;
};

export default AuthPages;
