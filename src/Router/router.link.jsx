import { Route } from 'react-router-dom';
import { all_routes } from './all_routes';
import { lazy } from 'react';
import Stores from '../feature-module/admin/stores';
import AddProduct from '../feature-module/admin/product/addProduct';

const Signin = lazy(() => import('../feature-module/pages/login/signin'));
const Register = lazy(
  () => import('../feature-module/pages/register/register')
);
const ResetPassword = lazy(
  () => import('../feature-module/pages/resetpassword/resetpassword')
);
const ForgotPassword = lazy(
  () => import('../feature-module/pages/forgotpassword/forgotpassword')
);

const SuperAdminDashboard = lazy(
  () => import('../feature-module/admin/dashboard')
);

const routes = all_routes;

export const adminRoutes = [
  {
    id: 1,
    path: routes.superadmindashboard,
    name: 'admin-dashboard',
    element: <SuperAdminDashboard />,
    route: Route,
  },
  {
    id: 2,
    path: routes.admin_stores,
    name: 'admin-stores',
    element: <Stores />,
    route: Route,
  },
  {
    id: 3,
    path: routes.admin_store_product,
    name: 'admin-store-product',
    element: <AddProduct />,
    route: Route,
  },
];

export const pagesRoute = [
  {
    id: 1,
    path: routes.signin,
    name: 'signin',
    element: <Signin />,
    route: Route,
  },
  {
    id: 2,
    path: routes.adminSignin,
    name: 'admin-signin',
    element: <Signin superAdminSignin />,
    route: Route,
  },
  {
    id: 3,
    path: routes.register,
    name: 'register',
    element: <Register />,
    route: Route,
  },
  {
    id: 4,
    path: routes.resetpassword,
    name: 'resetpassword',
    element: <ResetPassword />,
    route: Route,
  },
  {
    id: 5,
    path: routes.forgotPassword,
    name: 'forgotpassword',
    element: <ForgotPassword />,
    route: Route,
  },
];
