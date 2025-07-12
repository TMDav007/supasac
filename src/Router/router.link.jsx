import { Route } from 'react-router-dom';
import { all_routes } from './all_routes';
import Signin from '../feature-module/pages/login/signin';
import Register from '../feature-module/pages/register/register';
import Resetpassword from '../feature-module/pages/resetpassword/resetpassword';
import Forgotpassword from '../feature-module/pages/forgotpassword/forgotpassword';

const routes = all_routes;

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
    path: routes.register,
    name: 'register',
    element: <Register />,
    route: Route,
  },
  {
    id: 3,
    path: routes.resetpassword,
    name: 'resetpassword',
    element: <Resetpassword />,
    route: Route,
  },
  {
    id: 4,
    path: routes.forgotPassword,
    name: 'forgotpassword',
    element: <Forgotpassword />,
    route: Route,
  },
];
