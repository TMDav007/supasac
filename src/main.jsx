import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
// import '../src/style/css/feather.css';
import '../src/style/css/line-awesome.min.css';
// import '../src/style/icons/tabler-icons/webfont/tabler-icons.css';
import '../src/style/scss/main.scss';
//import "../src/customStyle.scss";
import '../src/style/icons/fontawesome/css/fontawesome.min.css';
import '../src/style/icons/fontawesome/css/all.min.css';
// import '../src/style/fonts/feather/css/iconfont.css';

import { base_path } from './environment.jsx';
import store from './core/redux/store.jsx';
import AllRoutes from './Router/router.jsx';

/* eslint no-undef: "error"*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={base_path}>
        <AllRoutes />
        <ToastContainer hideProgressBar={true} />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
