import { Route, Routes } from 'react-router-dom';
import { pagesRoute } from './router.link';
import AuthPages from './authPages';
const AllRoutes = () => {
  return (
    <div>
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
        <Route element={<AuthPages />}>
          {pagesRoute.map((route, id) => (
            <Route path={route.path} element={route.element} key={id} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
