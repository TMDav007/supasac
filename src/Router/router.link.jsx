import { Route } from 'react-router-dom';
import { all_routes } from './all_routes';
import { lazy } from 'react';

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

const StoreModal = lazy(
  () => import('../feature-module/admin/stores/modal/store')
);

const AddProduct = lazy(
  () => import('../feature-module/admin/product/addProduct')
);

const CategoryList = lazy(
  () => import('../feature-module/inventory/category/categorylist')
);
const CategoryModal = lazy(
  () => import('../feature-module/inventory/category/modal/category')
);

const Stores = lazy(() => import('../feature-module/admin/stores'));

const SubCategoryList = lazy(
  () => import('../feature-module/inventory/subcategory/subcategoryList')
);

const SubCategoryModal = lazy(
  () => import('../feature-module/inventory/subcategory/modal/subcategory')
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
  {
    id: 4,
    path: routes.admin_edit_store,
    name: 'admin-edit-store',
    element: <StoreModal />,
    route: Route,
  },
  {
    id: 5,
    path: routes.admin_create_store,
    name: 'admin-create-store',
    element: <StoreModal />,
    route: Route,
  },
  {
    id: 6,
    path: routes.admin_category,
    name: 'admin-category',
    element: <CategoryList />,
    route: Route,
  },
  {
    id: 7,
    path: routes.admin_create_category,
    name: 'admin-create-category',
    element: <CategoryModal />,
    route: Route,
  },
  {
    id: 8,
    path: routes.admin_edit_category,
    name: 'admin-edit-category',
    element: <CategoryModal />,
    route: Route,
  },
  {
    id: 9,
    path: routes.admin_subcategory,
    name: 'admin-subcategory',
    element: <SubCategoryList />,
    route: Route,
  },
  {
    id: 10,
    path: routes.admin_create_subcategory,
    name: 'admin-create-subcategory',
    element: <SubCategoryModal />,
    route: Route,
  },
  {
    id: 11,
    path: routes.admin_edit_subcategory,
    name: 'admin-edit-subcategory',
    element: <SubCategoryModal />,
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
