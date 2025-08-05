import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { adminRoutes, pagesRoute } from './router.link';
import AuthPages from './authPages';
import AdminPages from './adminPages';
import HeaderLayouts from './headerLayout';

const AllRoutes = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          {/* <Route element={<HeaderLayouts />}>
          {publicRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>
        <Route element={<PosLayout />}>
          {posRoutes.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route> */}

          <Route element={<HeaderLayouts />}>
            {adminRoutes.map((route, id) => (
              <Route path={route.path} element={route.element} key={id} />
            ))}
          </Route>

          <Route element={<AuthPages />}>
            {pagesRoute.map((route, id) => (
              <Route path={route.path} element={route.element} key={id} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default AllRoutes;
