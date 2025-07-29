import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserDetailsQuery } from '../core/redux/api/admin/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../core/redux/auth/authSlice';
import { USER_ROLE } from '../constants/authConstant';

const AuthPages = () => {
  const { data: user, isLoading } = useUserDetailsQuery();

  const { userInfo } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const isAdminOnAuthPage = location.pathname === '/admin-signin';

  console.log(user?.data, userInfo, 'user');

  useEffect(() => {
    if (userInfo) return;

    dispatch(setCredentials(user?.data));
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !userInfo && !isAdminOnAuthPage) {
    return <Navigate to="/admin-signin" state={{ from: location.pathname }} />;
  }

  if (userInfo && userInfo.role === USER_ROLE.ADMIN && isAdminOnAuthPage) {
    return <Navigate to={location.state?.from || '/admin'} />;
  }

  return <Outlet />;
};

export default AuthPages;
